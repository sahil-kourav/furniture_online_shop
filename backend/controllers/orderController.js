import orderModel from "../models/order.js"; // Sequelize order model
import userModel from "../models/user.js"; // Sequelize user model
import razorpay from "razorpay";
import crypto from "crypto";

// Global variables
const currency = "INR";

// Gateway initialize
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Placing orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: 'Pending',
      date: Date.now(),
    };

    // Creating order using Sequelize
    const newOrder = await orderModel.create(orderData);

    // Updating user's cart data
    await userModel.update({ cartData: {} }, { where: { id: userId } });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: 'Pending',
      date: Date.now(),
    };

    // Creating order using Sequelize
    const newOrder = await orderModel.create(orderData);

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder.id.toString(),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verifying Razorpay Payment
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      // Update payment status in order model
      await orderModel.update({ payment: "Paid" }, { where: { id: razorpay_order_id } });
      
      // Clear user cart data after successful payment
      await userModel.update({ cartData: {} }, { where: { id: userId } });
      
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// Fetch all Orders for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.findAll();
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Fetch User's Orders for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.findAll({ where: { userId } });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Order Status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
console.log('Order ID:', orderId);
console.log('Status:', status);

    await orderModel.update({ status }, { where: { id: orderId } });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, payment } = req.body;

    // Updating payment status based on the payment method
    const updated = await orderModel.update(
      {
        payment, // This will either be 'Paid' or 'Pending'
      },
      {
        where: { id: orderId },
      }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Payment status updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export { verifyRazorpay, placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus, updatePaymentStatus };
