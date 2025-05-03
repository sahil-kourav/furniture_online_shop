import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const res = await axios.post(`${backendUrl}/api/order/list`, {}, {
        headers: { token }
      });
      if (res.data.success) {
        setOrders(res.data.orders.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updatePaymentStatus = async (orderId) => {
    try {
      const res = await axios.put(`${backendUrl}/api/order/update-payment-status`, {
        orderId,
        payment: "Paid"
      }, { headers: { token } });

      if (res.data.success) {
        toast.success("Payment marked as Paid");
        fetchAllOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const res = await axios.post(`${backendUrl}/api/order/status`, {
        orderId,
        status: e.target.value
      }, { headers: { token } });

      if (res.data.success) fetchAllOrders();
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="px-4 md:px-10 py-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Order History</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-base">No orders placed yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-gray-200 transition hover:shadow-md"
            >
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-[60px_1fr] gap-4">
                
                {/* Icon */}
                <div className="flex justify-center items-start">
                  <img
                    src={assets.parcel_icon}
                    alt="Parcel"
                    className="w-12 h-12 object-contain"
                  />
                </div>

                {/* Order Content */}
                <div className="space-y-5">
                  
                  {/* Ordered Items */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Items Ordered</h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                      {order.items.map((item, i) => (
                        <li key={i}>
                          <strong>{item.name}</strong> — Quantity: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Shipping Info */}
                  <div className="border-t pt-4">
                    <h4 className="text-lg font-semibold text-gray-700 mb-1">Shipping Address</h4>
                    <div className="text-gray-600 text-sm space-y-0.5">
                      <p><strong>{order.address.firstName} {order.address.lastName}</strong></p>
                      <p>{order.address.street}</p>
                      <p>{order.address.city}, {order.address.state} {order.address.zipcode}</p>
                      <p>{order.address.country}</p>
                      <p>{order.address.phone}</p>
                      <p>{order.address.email}</p>
                      <p className="mt-2 text-gray-700 font-medium">Order Date</p>
                      <p>{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Payment + Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 border-t pt-4">
                    {/* Amount */}
                    <div>
                      <p className="text-gray-700 font-medium">Order Amount</p>
                      <p className="text-lg font-semibold text-green-600">{currency}{order.amount}</p>
                    </div>

                    {/* Payment Info */}
                    <div>
                      <p className="text-gray-700 font-medium">Payment Method</p>
                      <p className="text-sm">
                        {order.paymentMethod} —{" "}
                        <span className={order.payment === "Paid" ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                          {order.payment}
                        </span>
                      </p>

                      {order.paymentMethod === "COD" && order.payment !== "Paid" && (
                        <button
                          onClick={() => updatePaymentStatus(order.id)}
                          className="mt-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm transition"
                        >
                          Mark as Paid
                        </button>
                      )}
                    </div>

                    {/* Status Dropdown */}
                    <div>
                      <label className="text-gray-700 font-medium text-sm block mb-1">Order Status</label>
                      <select
                        value={order.status}
                        onChange={(e) => statusHandler(e, order.id)}
                        className="w-full p-2 rounded-md border-gray-300 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
