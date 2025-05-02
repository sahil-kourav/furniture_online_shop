import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    if (!token) {
      toast.error("Login required to verify payment.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/order/verifyRazorpay`,
        { success, orderId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Payment Verified Successfully!");
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error("Payment verification failed. Redirecting to cart.");
        navigate("/cart");
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong during verification.");
      navigate("/cart");
    }
  };

  useEffect(() => {
    if (success && orderId) {
      verifyPayment();
    }
  }, [token, success, orderId]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg font-semibold text-gray-700">Verifying your payment...</p>
    </div>
  );
};

export default Verify;
