import React, { useCallback, useEffect, useState } from "react";
import CartItem from "../components/CartItem"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
    Breadcrumbs, Input, Button, Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { HomeIcon, ChevronRightIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { openModal } from "../slices/modalSlice"
import CheckoutModal from "../components/CheckoutModal";
import {
    getListCoursesInCart, getListVouchers, deleteCourse, deleteAllCourse,
    deleteListCourse, checkoutOrder, processingPurchase, getCartInfo, createCart
} from "@/apis/Student";
import { useSelector } from 'react-redux';

const StudentCart = () => {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cartInfo, setCartInfo] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [listCartItem, setListCartItem] = useState([]);
    const [voucherList, setVoucherList] = useState([]);
    const [voucherCode, setVoucherCode] = useState("");
    const [discount, setDiscount] = useState({ id: null, value: 0 });
    const [showCoupon, setShowCoupon] = useState(false);
    const [selectedItems, setSelectedItems] = useState([])
    const [renderKey, setRenderKey] = useState(0);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    const handleDeleteAllCourse = async () => {
        await deleteAllCourse(userId);
        setListCartItem([]);
        handleOpen();
        setRenderKey(prevKey => prevKey + 1);
    }

    const handlePayment = async () => {
        const data = {
            prices: {
                totalPrice: totalPrice,
                discountPrice: discount.value,
                finalPrice: totalPrice - discount.value
            },
            idUser: userId,
            checkoutReq: {
                idCart: cartInfo,
                idCourses: selectedItems,
                idDiscount: discount.id
            }
        }

        const response = await processingPurchase(data);
        window.location.href = response.data.payload.paymentUrl
        console.log(response);
    }

    const handleDeleteListCourse = async () => {
        await deleteListCourse(userId, selectedItems);
        setListCartItem(listCartItem.filter((item) => !selectedItems.includes(item.courseId)));
        setSelectedItems([]);
        handleOpen();
        setRenderKey(prevKey => prevKey + 1);
    }
    const handleVoucherCodeInput = ({ target }) => {
        setVoucherCode(target.value);
    }
    const handleApplyVoucherCode = () => {
        if (totalPrice == 0) {
            toast.error('Please select course first!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            return;
        }
        const voucherTarget = voucherList.find((voucher) => voucher.discount.code === voucherCode)
        if (voucherTarget) {
            const data = { id: voucherTarget.discount.discountId, value: voucherTarget.discount.value }
            setDiscount({ id: data.id, value: data.value });
            setShowCoupon(true);
        } else {
            toast.error('Voucher Code does not exist!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    }
    const handleCancelVoucherCode = () => {
        setVoucherCode("");
        setDiscount({ id: null, value: 0 });
        setShowCoupon(false);
    }
    const handleOpenModal = async () => {
        const checkoutReq = {
            idCart: cartInfo,
            idCourses: selectedItems,
            idDiscount: discount.id
        }
        await checkoutOrder(checkoutReq);
        dispatch(openModal());
    }
    const handleAfterDeleteCourse = async (courseId, index) => {
        await deleteCourse(userId, courseId);
        const newList = [...listCartItem];
        newList.splice(index, 1)
        setListCartItem(newList);
    }

    const checkboxHandler = ({ target }) => {
        let isSelected = target.checked;
        let value = parseInt(target.value);

        if (isSelected) {
            setSelectedItems(prevSelected => {
                const newSelected = [...prevSelected, value];
                calculateTotalPrice(newSelected);
                return newSelected;
            });
        } else {
            setSelectedItems(prevSelected => {
                const newSelected = prevSelected.filter(id => id !== value);
                calculateTotalPrice(newSelected);
                return newSelected;
            });
        }
    }

    const checkAllHandler = () => {
        if (listCartItem.length === selectedItems.length) {
            setSelectedItems([]);
            calculateTotalPrice([]);
        } else {
            const postIds = listCartItem.map(item => item.courseId);
            setSelectedItems(postIds);
            calculateTotalPrice(postIds);
        }
    }

    const calculateTotalPrice = (selectedItemsArray) => {
        let total = 0;
        if (selectedItemsArray && listCartItem) {
            listCartItem.forEach((item) => {
                if (selectedItemsArray.includes(item.courseId)) {
                    total += item.price;
                }
            });
        }
        setTotalPrice(total);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = await getListCoursesInCart(userId)
                if (items) {
                    setListCartItem(items.data?.payload);
                }
                const data = await getCartInfo(userId);
                setCartInfo(data.data.payload)
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
            const vouchers = await getListVouchers(userId)
            if (vouchers) {
                setVoucherList(vouchers.data?.payload);
            }
        };
        fetchData();
    }, []);

    return (
        <div key={renderKey}>
            <div className="bg-course-banner h-48">
                <div className="h-full bg-purple-900 opacity-80 text-center flex items-center">
                    <div className="text-white mx-auto mt-auto mb-6 font-bold text-3xl">Shopping Cart</div>
                </div>
            </div>
            <div className="flex flex-col h-full w-full">
                <div className="flex border-b-2 items-center border-gray-100 mb-6 mx-auto w-11/12">
                    <div className="w-5/6 flex flex-row ">
                        <Breadcrumbs separator={<ChevronRightIcon className="h-4 w-4 text-black" strokeWidth={2.5}></ChevronRightIcon>}
                            className="bg-white pb-1">
                            <a
                                href="/"
                                className="flex flex-row rounded-full text-base pr-1 py-1 font-normal text-gray-900 hover:text-blue-300"
                            >
                                <HomeIcon className="mr-1 h-5 w-5" strokeWidth={2.5} />
                                Home
                            </a>
                            <a
                                href="#"
                                className="flex flex-row rounded-full text-base px-1 py-1 font-normal text-gray-900"
                            >
                                <ShoppingCartIcon className="mr-1 h-5 w-5" strokeWidth={2.5} />
                                Cart
                            </a>
                        </Breadcrumbs>
                    </div>
                </div>
                {listCartItem.length == 0 ? (
                    <div className="flex flex-row w-11/12 mb-10 mx-auto">
                        <div className="flex flex-col w-3/4">
                            <div className="flex flex-row items-center w-11/12 mb-1">
                                <div className="flex items-center">
                                    <input type="checkbox" onChange={checkAllHandler} checked={listCartItem.length === selectedItems.length} className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300"></input>
                                    <label className="ms-2 text-normal font-bold text-gray-900 dark:text-gray-300">SELECT ALL COURSES</label>
                                </div>
                                <button className={selectedItems.length != 0 ? "ml-auto" : "hidden"} onClick={handleOpen}>
                                    Remove {selectedItems.length > 1 ? "(" + selectedItems.length + " items)" : "(" + selectedItems.length + " item)"}
                                </button>
                                <Dialog open={open} handler={handleOpen} size="xs">
                                    <DialogHeader>Remove Confirmation</DialogHeader>
                                    <DialogBody>
                                        Are you sure you want to remove the {selectedItems.length} courses from your cart ? This process cannot be undone.
                                    </DialogBody>
                                    <DialogFooter>
                                        <Button
                                            variant="text"
                                            color="red"
                                            onClick={handleOpen}
                                            className="mr-1"
                                        >
                                            <span>Cancel</span>
                                        </Button>
                                        <Button className="bg-indigo-600" onClick={listCartItem.length == selectedItems.length ? handleDeleteAllCourse : handleDeleteListCourse}>
                                            <span>Confirm</span>
                                        </Button>
                                    </DialogFooter>
                                </Dialog>
                            </div>
                            {listCartItem.map((item, index) => (
                                <li key={index} className="flex w-full">
                                    <CartItem index={index} id={item.courseId}
                                        logo={item.courseThumbnail} name={item.title}
                                        tag={item.categoryName} instructor={item.instructorName}
                                        price={item.price} handleAfterDeleteCourse={handleAfterDeleteCourse}
                                        checkboxHandler={checkboxHandler}
                                        selectedItems={selectedItems} />
                                </li>
                            ))
                            }
                        </div>
                        <div className="w-1/4 flex flex-col">
                            <div className="w-full mx-auto">
                                <div className="mx-auto">
                                    <div className={showCoupon ? "flex pl-3 text-sm py-2 mb-1 border-dashed border-2 border-gray-400 ml-auto" : "hidden"}>
                                        <div className="font-bold">{voucherCode}</div>&nbsp; is apllied
                                        <button className="ml-auto" onClick={handleCancelVoucherCode}>
                                            <XMarkIcon className="items-center h-4 w-4 mr-2" />
                                        </button>
                                    </div>
                                    <div className="relative ml-auto">
                                        <Input
                                            length={8}
                                            label="Voucher Code"
                                            value={voucherCode}
                                            disabled={discount.id}
                                            onChange={handleVoucherCodeInput}
                                            className="pr-20 w-full text-base font-bold"
                                        />
                                        <Button
                                            size="sm"
                                            color={voucherCode ? "indigo" : "gray"}
                                            disabled={!voucherCode}
                                            className="!absolute right-1 top-1 rounded"
                                            onClick={handleApplyVoucherCode}
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-gray-400 rounded-xl p-5 mx-auto w-full mt-2">
                                <form className=" mx-auto">
                                    <div className="flex items-center justify-between py-2">
                                        <div className="font-bold text-base">Subtotal:</div>
                                        <div className="font-bold text-xl ml-2">{totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'VND' })} </div>
                                    </div>
                                    <div className={showCoupon ? "flex items-center justify-between pt-2" : "hidden"}>
                                        <div className="font-bold text-base">Coupon:</div>
                                        <div className="font-bold text-xl ml-2">{discount.value.toLocaleString('en-US', { style: 'currency', currency: 'VND' })} </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-3 border-t-2 border-gray-400 py-2">
                                        <div className="font-bold text-indigo-600 text-base">Total:</div>
                                        <div className="font-bold text-indigo-600 text-xl ml-2">{(totalPrice - discount.value).toLocaleString('en-US', { style: 'currency', currency: 'VND' })} </div>
                                    </div>
                                    <Button className="flex w-full items-center justify-center bg-indigo-600 rounded-lg mt-3 font-bold text-base text-white transition-all hover:bg-indigo-700"
                                        onClick={handleOpenModal}
                                        size="sm"
                                        disabled={totalPrice != 0}>
                                        Checkout
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center w-11/12 mx-auto mt-10">
                        Your cart is empty. Keep shopping to find a course!
                        <Button className="bg-purple-700 my-10"
                            onClick={() => { navigate("/course") }}>
                            Keep shopping
                        </Button>
                    </div>
                )}
            </div>
            <CheckoutModal price={totalPrice} discount={discount} handlePayment={handlePayment} />
            <ToastContainer />
        </div>
    );
}

export default StudentCart;