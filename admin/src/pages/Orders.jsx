// import React from 'react'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import { backendUrl, currency } from '../App'
// import { toast } from 'react-toastify'
// import { assets } from '../assets/assets'

// const Orders = ({ token }) => {

//   const [orders, setOrders] = useState([])

//   const fetchAllOrders = async () => {

//     if (!token) {
//       return null;
//     }

//     try {

//       const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
//       if (response.data.success) {
//         setOrders(response.data.orders.reverse())
//       } else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }

//   }

//   const statusHandler = async ( event, orderId ) => {
//     try {
//       const response = await axios.post(backendUrl + '/api/order/status' , {orderId, status:event.target.value}, { headers: {token}})
//       if (response.data.success) {
//         await fetchAllOrders()
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(response.data.message)
//     }
//   }

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token])

//   return (
//     <div>
//       <h3>Order Page</h3>
//       <div>
//         {
//           orders.map((order, index) => (
//             <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
//               <img className='w-12' src={assets.parcel_icon} alt="" />
//               <div>
//                 <div>
//                   {order.items.map((item, index) => {
//                     if (index === order.items.length - 1) {
//                       return <p className='py-0.5' key={index}> Product: {item.name} x Quantity: {item.quantity} <span> {item.size} </span> </p>
//                     }
//                     else {
//                       return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size} </span> ,</p>
//                     }
//                   })}
//                 </div>
//                 <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
//                 <div className='text-sm sm:text-[15px]'>
//                   <p>{order.address.street + ","}</p>
//                   <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
//                   <p>{order.address.phone + ", "  + order.address.email}</p>
//                 </div>
//               </div>
//               <div>
//                 <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
//                 <p className='mt-3'>Payment Method : {order.paymentMethod}</p>
//                 <p>Payment : { order.payment ? 'Done' : 'Pending' }</p>
//                 <p>Order Date : {new Date(order.date).toLocaleDateString()}</p>
//               </div>
//               <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
//               <select onChange={(event)=>statusHandler(event,order.id)} value={order.status} className='p-2 font-semibold'>
//                 <option value="Order Placed">Order Placed</option>
//                 <option value="Packing">Packing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Out for delivery">Out for delivery</option>
//                 <option value="Delivered">Delivered</option>
//                 <option value="Rejected">Rejected</option>
//               </select>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Orders

// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { backendUrl, currency } from '../App'
// import { toast } from 'react-toastify'
// import { assets } from '../assets/assets'

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([])

//   const fetchAllOrders = async () => {
//     if (!token) return;

//     try {
//       const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
//       if (response.data.success) {
//         setOrders(response.data.orders.reverse())
//       } else {
//         toast.error(response.data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   const statusHandler = async (event, orderId) => {
//     try {
//       const response = await axios.post(
//         backendUrl + '/api/order/status',
//         { orderId, status: event.target.value },
//         { headers: { token } }
//       )
//       if (response.data.success) {
//         await fetchAllOrders()
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   const updatePaymentStatus = async (orderId) => {
//     try {
//       const response = await axios.put(
//         backendUrl + '/api/order/update-payment-status',
//         { orderId, payment: "Paid" },
//         { headers: { token } }
//       )
//       if (response.data.success) {
//         toast.success("Payment status updated")
//         fetchAllOrders()
//       } else {
//         toast.error(response.data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token])

//   return (
//     <div>
//       <h3>Order Page</h3>
//       <div>
//         {
//           orders.map((order, index) => (
//             <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
//               <img className='w-12' src={assets.parcel_icon} alt="" />
//               <div>
//                 <div>
//                   {order.items.map((item, index) => (
//                     <p className='py-0.5' key={index}>
//                       {item.name} x {item.quantity} <span>{item.size}</span>{index !== order.items.length - 1 && ','}
//                     </p>
//                   ))}
//                 </div>
//                 <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
//                 <div className='text-sm sm:text-[15px]'>
//                   <p>{order.address.street + ","}</p>
//                   <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
//                   <p>{order.address.phone + ", " + order.address.email}</p>
//                 </div>
//               </div>
//               <div>
//                 <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
//                 <p className='mt-2'>Payment Method: {order.paymentMethod}</p>

//                 {/* Show payment status or "Mark as Paid" button depending on payment method */}
//                 {order.paymentMethod === "Razorpay" ? (
//                   <div>
//                     <p>Payment: {order.payment ? 'Paid' : 'Pending'}</p>
//                     <p>Payment Status: {order.payment || 'N/A'}</p>
//                   </div>
//                 ) : null}

//                 {order.paymentMethod === "COD" && order.payment !== "Paid" && (
//                   <button
//                     className='mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'
//                     onClick={() => updatePaymentStatus(order.id)}
//                   >
//                     Mark as Paid
//                   </button>
//                 )}

//                 <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
//               </div>
//               <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
//               <select
//                 onChange={(event) => statusHandler(event, order.id)}
//                 value={order.status}
//                 className='p-2 font-semibold'
//               >
//                 <option value="Order Placed">Order Placed</option>
//                 <option value="Packing">Packing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Out for delivery">Out for delivery</option>
//                 <option value="Delivered">Delivered</option>
//                 <option value="Rejected">Rejected</option>
//               </select>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Orders

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
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
        console.log("Fetched Orders:", response.data.orders); // Log the fetched orders
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updatePaymentStatus = async (orderId) => {
    try {
      const response = await axios.put(
        backendUrl + "/api/order/update-payment-status",
        { orderId, payment: "Paid" },
        { headers: { token } }
      );
      console.log("Update Payment Response:", response.data); // Log this response for debugging

      if (response.data.success) {
        toast.success("Payment status updated");
        await fetchAllOrders(); // Refresh orders after updating payment status
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => (
                  <p className="py-0.5 text-sm sm:text-[16px]" key={index}>
                    {item.name} <br/>
                    <span>Quantity: {item.quantity}</span>
                    {index !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="text-sm sm:text-[15px]">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
                <p>{order.address.phone + ", " + order.address.email}</p>
              </div>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>
              <p className="mt-2">Payment Method: {order.paymentMethod}</p>

              {/* Show payment status or "Mark as Paid" button depending on payment method */}
              {order.paymentMethod === "Razorpay" ? (
                <div>
                  <p>
                    Payment: {order.payment === "Paid" ? "Paid" : "Pending"}
                  </p>
                  <p>Payment Status: {order.payment || 'N/A'}</p>
                </div>
              ) : null}

              {order.paymentMethod === "COD" && order.payment !== "Paid" && (
                <button
                  className="mt-2 mb-2 bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
                  onClick={() => updatePaymentStatus(order.id)}
                >
                  Mark as Paid
                </button>
              )}

              {order.paymentMethod === "COD" && order.payment === "Paid" && (
                <p>Payment Status: Paid</p>
              )}

              <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order.id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
