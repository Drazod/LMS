// BuyNowButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";                 // ← your axios instance
import { useAuthHeader } from "react-auth-kit";

type Props = { courseId: number };

const BuyNowButton: React.FC<Props> = ({ courseId }) => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();       // gives "Bearer <token>" or empty
  console.log("BuyNowButton rendered with courseId:", courseId);
  const handleBuyNow = async () => {
    const studentId = Number(localStorage.getItem("userId"));
    if (!studentId) {
      navigate("/auth/login");
      return;
    }
    try {
      await api.post(
        "/cart/addCourse",
        null,                             // no body, params go in "params"
        {
          params: { studentId, courseId },
          headers: authHeader() ? { Authorization: authHeader() } : undefined,
          withCredentials: false,            // set true only if your backend uses cookies
        }
      );

      navigate("/cart");
    } catch (err: any) {
      console.error("Add to cart failed:", err?.response ?? err);
      alert(
        err?.response?.data?.message ||
          "Could not add course to cart. Please try again."
      );
    }
  };

  return (
    <button
      type="button"
      className="text-black bg-yellow-700 hover:bg-yellow-900 focus:outline-none focus:ring-4 focus:ring-yellow-800 font-medium rounded-full text-sm px-5 py-2.5"
      onClick={handleBuyNow}
    >
      BUY NOW
    </button>
  );
};

export default BuyNowButton;
