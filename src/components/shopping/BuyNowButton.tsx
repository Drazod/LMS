import React from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

type Props = { courseId: number };

const BuyNowButton: React.FC<Props> = ({ courseId }) => {
  const navigate = useNavigate();
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
        { studentId, courseId }
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
    <Button onClick={handleBuyNow} className="hover:cursor-pointer">BUY NOW</Button>
  );
};

export default BuyNowButton;
