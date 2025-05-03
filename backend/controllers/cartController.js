import userModel from "../models/user.js"; // Sequelize user model

// Add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    // Fetch user data using Sequelize
    const userData = await userModel.findOne({ where: { id: userId } });

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData exists

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // Update cartData for the user using Sequelize
    await userModel.update({ cartData }, { where: { id: userId } });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    // Fetch user data using Sequelize
    const userData = await userModel.findOne({ where: { id: userId } });

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData exists

    // Update the item quantity in the cart
    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] = quantity;
    } else {
      return res.json({ success: false, message: "Item not found in cart" });
    }

    // Update cartData for the user using Sequelize
    await userModel.update({ cartData }, { where: { id: userId } });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Fetch user data using Sequelize
    const userData = await userModel.findOne({ where: { id: userId } });

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData exists

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
