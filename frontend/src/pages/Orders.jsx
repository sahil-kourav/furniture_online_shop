import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      if (!token) return;

      setLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (data.success) {
        const allItems = data.orders.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
            amount: order.amount,
          }))
        );

        setOrders(allItems.reverse());
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {loading && (
        <p className="text-center my-4 text-gray-500">Loading orders...</p>
      )}

      {!loading && orders.length === 0 && (
        <p className="text-center my-4 text-gray-500">No orders found.</p>
      )}

      <div>
        {orders.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                className="w-16 h-22 sm:w-18 object-cover"
                src={item.image?.[0] || "/placeholder.png"}
                alt={item.name}
              />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <p className="sm:text-base font-medium">
                  Quantity: {item.quantity}
                </p>
                <p className="mt-2 text-sm font-semibold">
                  Final Amount: {currency}
                  {item.amount}
                </p>
                <p className="mt-1 text-sm font-semibold">
                  Date: <span>{new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-1 text-sm font-semibold">
                  Payment: <span>{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="min-w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                onClick={fetchOrders}
                className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100"
              >
                Update Orders
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
