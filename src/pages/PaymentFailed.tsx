import React, { useEffect, useState } from 'react';
import Failed from "../assets/Cart/failed.png"
import { useLocation, useNavigate } from 'react-router-dom';
const PaymentFailure = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="bg-course-banner h-48">
                <div className="h-full bg-purple-900 opacity-80 text-center flex items-center">
                    <div className="text-white mx-auto mt-auto mb-6 font-bold text-3xl">Payment Result</div>
                </div>
            </div>
            <div className="bg-gray-100 h-full">
                <div className="bg-white p-6  md:mx-auto">
                    <img src={Failed} width={64} className='mx-auto my-6'>
                    </img>
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Failed!</h3>
                        <p className="text-gray-600 my-2">Unfortunately, we have an issue with your payment.</p>
                        <p> Try again later!  </p>
                        <div className="py-10 text-center">
                            <button onClick={() => navigate("/cart")} className="px-12 bg-purple-900 hover:bg-purple-800 text-white font-semibold py-3">
                                TRY AGAIN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default PaymentFailure;