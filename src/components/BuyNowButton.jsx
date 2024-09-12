import axios, { AxiosError } from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const base_url = "https://curcus-3-0.onrender.com/";

const BuyNowButton = ({ course }) => {
    const navigate = useNavigate();

    const handleBuyNow = async () => {
        const studentId = parseInt(localStorage.getItem('userId'), 10);
        if (!studentId) {
            navigate('/auth/login');
            return;
        }
        const courseId = parseInt(course, 10);
        const postData = {
            studentId: parseInt(studentId, 10),
            courseId: courseId,
        };

        try {
            const response = await axios.post(
                `${base_url}api/cart/addCourse?studentId=${studentId}&courseId=${courseId}`
            ); 
            navigate('/cart/');
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Error response data:", error.response?.data);
                console.error("Error response status:", error.response?.status);
                console.error("Error response headers:", error.response?.headers);
                console.error("Full error response:", error.response);
            } else if (error instanceof Error) {
                console.error("Error message:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    return (
        <button
            type="button"
            className="text-black bg-yellow-700 hover:bg-yellow-900 focus:outline-none focus:ring-4 focus:ring-yellow-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
            onClick={handleBuyNow}
        >
            BUY NOW THIS COURSE
        </button>
    );
};

export default BuyNowButton;
