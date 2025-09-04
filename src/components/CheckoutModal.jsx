import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../slices/modalSlice";
import {
    Card,
    Input,
    Checkbox,
    Typography, Button
} from "@material-tailwind/react";
import { stateOfModal } from '../slices/modalSlice';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { CreditCardIcon, LockClosedIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import VNPay from "../assets/Cart/VNPAY.png"
import CreditCard from '../assets/Cart/CreditCard.png';

const CheckoutModal = React.memo((props) => {
    const dispatch = useDispatch();
    const modalState = true;
    const [paymentOptions, setPaymentOptions] = useState(1)
    const handleCloseModal = () =>
        dispatch(closeModal());

    const handleProceed = async () =>{
        await props.handlePayment();
    }
    return (
        <div>
            {modalState ? (
                <div className="fixed z-50 w-full h-full inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="flex-col bg-white w-5/6 h-full rounded-lg shadow-lg">
                        <Button
                            className="flex mr-auto mt-10 text-gray-500 hover:text-gray-700"
                            onClick={handleCloseModal}
                            variant='text'
                        >
                            <ArrowLeftIcon className="w-4 h-4 " />
                            <div className='text-sm ml-3'>Back to Cart</div>
                        </Button>
                        <div className='flex flex-row mt-5 w-11/12 mx-auto'>
                            <div className='w-2/3 h-auto rounded-3xl border-2 border-gray-400'>
                                <div className='w-11/12 mt-5 mx-auto'>
                                    <div className='flex mr-auto'>
                                        <div className='text-xl items-center font-bold'> SELECT PAYMENT METHOD</div>
                                    </div>
                                    <hr className="w-1/12 border-gray-400 mr-auto mt-3 border-2" />
                                </div>
                                <div className='flex flex-row w-3/4 mx-auto h-1/12 mt-5'>
                                    <Button className='mr-10 text-sm bg-light-blue-400 w-1/2 border-2 border-light-blue-400 rounded-lg flex items-center justify-center'
                                        onClick={() => setPaymentOptions(1)}>
                                        <CreditCardIcon className='h-5 w-5 mr-3' />
                                        Credit Card
                                    </Button>
                                    <Button className='ml-10 w-1/2 bg-white text-3xl border-2 border-gray-400 rounded-lg flex items-center justify-center'
                                        onClick={() => setPaymentOptions(2)}>
                                        <img className='h-full w-5/6 mr-3' src={VNPay}></img>
                                    </Button>
                                </div>
                                <div className={paymentOptions === 1 ? 'flex flex-row w-11/12 mt-5 mx-auto border-2 border-gray-400 p-3 mb-5' : "hidden"}>
                                    <Card color="transparent" shadow={false} className='flex w-1/2 mr-10'>
                                        <form className="flex flex-col">
                                            <div>
                                                <div
                                                    className="font-semibold text-sm"
                                                >
                                                    NAME ON CARD
                                                </div>
                                                <Input
                                                    disabled
                                                    type="text"
                                                    size='md'
                                                    placeholder="KIM NHAT THANH"
                                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 max-h-[2rem]"
                                                    labelProps={{
                                                        className: "before:content-none after:content-none",
                                                    }}
                                                />
                                            </div>

                                            <div className="">
                                                <div
                                                    className="font-semibold text-sm"
                                                >
                                                    CARD NUMBER
                                                </div>

                                                <Input
                                                    disabled
                                                    maxLength={19}
                                                    icon={
                                                        <CreditCardIcon className="fixed h-6 w-6 mb-2 ml-1 text-blue-gray-700" />
                                                    }
                                                    placeholder="0000 0000 0000 0000"
                                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 max-h-[2rem]"
                                                    labelProps={{
                                                        className: "before:content-none after:content-none",
                                                    }}
                                                />
                                                <div className="grid grid-cols-2 items-center">
                                                    <div>
                                                        <div
                                                            className="font-semibold text-sm"
                                                        >
                                                            EXPIRY DATE
                                                        </div>
                                                        <Input
                                                            disabled
                                                            maxLength={5}
                                                            placeholder="mm/yyyy"
                                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 max-h-[2rem] max-w-[7.5rem]"
                                                            labelProps={{
                                                                className: "before:content-none after:content-none",
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div
                                                            className="font-semibold text-sm ml-1"
                                                        >
                                                            CVC / CVV
                                                        </div>
                                                        <Input
                                                            disabled
                                                            maxLength={4}
                                                            placeholder="000"
                                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 max-h-[2rem] max-w-[7.5rem] ml-1"
                                                            labelProps={{
                                                                className: "before:content-none after:content-none",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <input disabled type="checkbox" value="" className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded-3xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                    <label className="ms-2 text-sm font-sm text-gray-900 dark:text-gray-300">Save Card Details</label>
                                                </div>
                                            </div>
                                        </form>
                                    </Card>
                                    <div className='flex w-1/2 mt-8'>
                                        <img src={CreditCard} className="h-[150px] mx-auto" />
                                    </div>
                                </div>
                                <div className={paymentOptions === 2 ? 'items-center flex flex-row h-1/2 w-11/12 mx-auto' : "hidden"}>
                                    <Button className='items-center justify-center w-1/3 h-1/3 mx-auto text-sm flex' onClick={handleProceed}>
                                        Proceed
                                        <ArrowTopRightOnSquareIcon className='h-4 w-4 flex ml-2' />
                                    </Button>
                                </div>
                            </div>
                            <div className='w-1/3 flex flex-col ml-10'>
                                <form className="w-full p-5 mx-auto border-2 border-gray-400 rounded-3xl justify-center">
                                    <div className='flex mr-auto'>
                                        <div className='text-xl items-center font-bold'> ORDER SUMMARY</div>
                                    </div>
                                    <hr className="w-1/6 border-gray-400 mr-auto mt-3 border-2" />
                                    <div className="flex items-center justify-between py-5">
                                        <div className="font-bold text-base">Original Price:</div>
                                        <div className="font-bold text-base">{props.price.toLocaleString('en-US', { style: 'currency', currency: 'VND' })} </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="font-normal text-base">Discounts:</div>
                                        <div className="font-normal text-base">{props.discount.value.toLocaleString('en-US', { style: 'currency', currency: 'VND' })} </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-5 border-t-2 border-gray-400 pt-5">
                                        <div className="font-bold text-base">Total:</div>
                                        <div className="font-bold text-base">{(props.price - props.discount.value).toLocaleString('en-US', { style: 'currency', currency: 'VND' })} </div>
                                    </div>
                                    <Typography
                                        variant="h6"
                                        color="gray"
                                        className="mt-2 flex items-center justify-center gap-2 font-bold opacity-60"
                                    >
                                        <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Secured checkout
                                    </Typography>
                                </form>
                                <Button
                                    className={paymentOptions == 1 ? "flex ml-auto mt-5 text-white bg-light-blue-400 hover:text-gray-100" : "hidden"}
                                    onClick={handleCloseModal}
                                >
                                    <div className='text-sm'>Complete Checkout</div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
})

export default CheckoutModal;