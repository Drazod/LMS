import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CartItem from "@/components/shopping/CartItem";
import CheckoutModal from  "@/components/shopping/CheckoutModal";
import { useDispatch } from "react-redux";
import { openModal } from "../slices/modalSlice";

import {
  getListCoursesInCart,
  getListVouchers,
  deleteCourse,
  deleteAllCourse,
  deleteListCourse,
  checkoutOrder,
  processingPurchase,
  getCartInfo,
} from "@/apis/Student";

const StudentCart: React.FC = () => {
  const userId = localStorage.getItem("userId") ?? "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cartInfo, setCartInfo] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [listCartItem, setListCartItem] = useState<any[]>([]);
  const [voucherList, setVoucherList] = useState<any[]>([]);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [discount, setDiscount] = useState<{ id: number | null; value: number }>({
    id: null,
    value: 0,
  });
  const [showCoupon, setShowCoupon] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [renderKey, setRenderKey] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((v) => !v);

  const handleDeleteAllCourse = async () => {
    await deleteAllCourse(userId);
    setListCartItem([]);
    setSelectedItems([]);
    setTotalPrice(0);
    setDiscount({ id: null, value: 0 });
    setShowCoupon(false);
    handleOpen();
    setRenderKey((k) => k + 1);
  };

  const handlePayment = async () => {
    const data = {
      prices: {
        totalPrice,
        discountPrice: discount.value,
        finalPrice: totalPrice - discount.value,
      },
      idUser: userId,
      checkoutReq: {
        idCart: cartInfo,
        idCourses: selectedItems,
        idDiscount: discount.id,
      },
    };

    const response = await processingPurchase(data);
    window.location.href = response.data.payload.paymentUrl;
  };

  const handleDeleteListCourse = async () => {
    await deleteListCourse(userId, selectedItems);
    setListCartItem((prev) => prev.filter((item) => !selectedItems.includes(item.courseId)));
    setSelectedItems([]);
    setTotalPrice(0);
    if (discount.id) {
      setDiscount({ id: null, value: 0 });
      setShowCoupon(false);
    }
    handleOpen();
    setRenderKey((k) => k + 1);
  };

  const handleVoucherCodeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(target.value);
  };

  const handleApplyVoucherCode = () => {
    if (totalPrice === 0) {
      toast.error("Please select course first!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }
    const voucherTarget = voucherList.find(
      (v) => v.discount?.code && v.discount.code === voucherCode
    );
    if (voucherTarget) {
      setDiscount({
        id: voucherTarget.discount.discountId,
        value: Number(voucherTarget.discount.value) || 0,
      });
      setShowCoupon(true);
    } else {
      toast.error("Voucher Code does not exist!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleCancelVoucherCode = () => {
    setVoucherCode("");
    setDiscount({ id: null, value: 0 });
    setShowCoupon(false);
  };

  const handleOpenModal = async () => {
    const checkoutReq = {
      idCart: cartInfo,
      idCourses: selectedItems,
      idDiscount: discount.id,
    };
    await checkoutOrder(checkoutReq);
    dispatch(openModal());
  };

  const handleAfterDeleteCourse = async (courseId: number, index: number) => {
    await deleteCourse(userId, courseId);
    setListCartItem((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
    // also remove from selection and recalc totals
    setSelectedItems((prev) => {
      const next = prev.filter((id) => id !== courseId);
      calculateTotalPrice(next);
      return next;
    });
  };

  const checkboxHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = target.checked;
    const value = Number(target.value);

    if (isSelected) {
      setSelectedItems((prev) => {
        const next = [...prev, value];
        calculateTotalPrice(next);
        return next;
      });
    } else {
      setSelectedItems((prev) => {
        const next = prev.filter((id) => id !== value);
        calculateTotalPrice(next);
        return next;
      });
    }
  };

  const checkAllHandler = () => {
    if (listCartItem.length > 0 && selectedItems.length === listCartItem.length) {
      setSelectedItems([]);
      calculateTotalPrice([]);
    } else {
      const ids = listCartItem.map((i) => i.courseId);
      setSelectedItems(ids);
      calculateTotalPrice(ids);
    }
  };

  const calculateTotalPrice = (selectedItemsArray: number[]) => {
    let total = 0;
    if (selectedItemsArray && listCartItem?.length) {
      for (const item of listCartItem) {
        if (selectedItemsArray.includes(item.courseId)) {
          total += Number(item.price) || 0; // ensure numeric sum
        }
      }
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getListCoursesInCart(userId);
        if (items) {
          setListCartItem(items.data?.payload ?? []);
        }

        const data = await getCartInfo(userId);
        setCartInfo(data?.data?.payload ?? null);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }

      try {
        const vouchers = await getListVouchers(userId);
        setVoucherList(vouchers?.data?.payload ?? []);
      } catch {
        setVoucherList([]);
      }
    };
    fetchData();
  }, [userId, renderKey]);

  const allChecked =
    listCartItem.length > 0 && selectedItems.length === listCartItem.length;

  return (
    <div key={renderKey}>
      <div className="bg-course-banner h-48">
        <div className="h-full bg-purple-900 opacity-80 text-center flex items-center">
          <div className="text-white mx-auto mt-auto mb-6 font-bold text-3xl">
            Shopping Cart
          </div>
        </div>
      </div>

      <div className="container mx-auto px-14 flex flex-col h-full w-full">
        <div className="flex items-center">
          <div className="w-5/6 flex flex-row ">
            <Breadcrumbs
              separator={<ChevronRightIcon className="h-4 w-4 text-black" strokeWidth={2.5} />}
              className="bg-white pb-1"
            >
              <a
                href="/"
                className="flex flex-row rounded-full text-base pr-1 py-1 font-normal text-gray-900 hover:text-blue-300"
              >
                <HomeIcon className="mr-1 h-5 w-5" strokeWidth={2.5} />
                Home
              </a>
              <span className="flex flex-row rounded-full text-base px-1 py-1 font-normal text-gray-900">
                <ShoppingCartIcon className="mr-1 h-5 w-5" strokeWidth={2.5} />
                Cart
              </span>
            </Breadcrumbs>
          </div>
        </div>

        {listCartItem.length !== 0 ? (
          // ✅ show content when there are items
          <div className="flex flex-row w-11/12 mb-10 mx-auto">
            <div className="flex flex-col w-3/4">
              <div className="flex flex-row items-center w-11/12 mb-1">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={checkAllHandler}
                    checked={allChecked}
                    className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300"
                  />
                  <label className="ms-2 text-normal font-bold text-gray-900">
                    SELECT ALL COURSES
                  </label>
                </div>
                <button
                  className={selectedItems.length !== 0 ? "ml-auto" : "hidden"}
                  onClick={handleOpen}
                >
                  Remove{" "}
                  {selectedItems.length > 1
                    ? `(${selectedItems.length} items)`
                    : `(${selectedItems.length} item)`}
                </button>

                <Dialog open={open} handler={handleOpen} size="xs">
                  <DialogHeader>Remove Confirmation</DialogHeader>
                  <DialogBody>
                    Are you sure you want to remove the {selectedItems.length}{" "}
                    course(s) from your cart? This process cannot be undone.
                  </DialogBody>
                  <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                      <span>Cancel</span>
                    </Button>
                    <Button
                      className="bg-indigo-600"
                      onClick={
                        allChecked ? handleDeleteAllCourse : handleDeleteListCourse
                      }
                    >
                      <span>Confirm</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
              </div>

              {listCartItem.map((item, index) => (
                <li key={item.courseId} className="flex w-full">
                  <CartItem
                    index={index}
                    id={item.courseId}
                    logo={item.courseThumbnail}
                    name={item.title}
                    tag={item.categoryName}
                    instructor={item.instructorName}
                    price={item.price}
                    handleAfterDeleteCourse={handleAfterDeleteCourse}
                    checkboxHandler={checkboxHandler}
                    selectedItems={selectedItems}
                  />
                </li>
              ))}
            </div>

            <div className="w-1/4 flex flex-col">
              <div className="w-full mx-auto">
                <div className="mx-auto">
                  <div
                    className={
                      showCoupon
                        ? "flex pl-3 text-sm py-2 mb-1 border-dashed border-2 border-gray-400 ml-auto"
                        : "hidden"
                    }
                  >
                    <div className="font-bold">{voucherCode}</div>&nbsp; is applied
                    <button className="ml-auto" onClick={handleCancelVoucherCode}>
                      <XMarkIcon className="items-center h-4 w-4 mr-2" />
                    </button>
                  </div>

                  {/* <div className="relative ml-auto">
                    <Input
                      maxLength={32}
                      label="Voucher Code"
                      value={voucherCode}
                      disabled={!!discount.id}
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
                  </div> */}
                </div>
              </div>

              <div className="border border-gray-400 rounded-xl p-5 mx-auto w-full mt-2">
                <form className="mx-auto">
                  <div className="flex items-center justify-between py-2">
                    <div className="font-bold text-base">Subtotal:</div>
                    <div className="font-bold text-xl ml-2">
                      {totalPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                  </div>

                  <div className={showCoupon ? "flex items-center justify-between pt-2" : "hidden"}>
                    <div className="font-bold text-base">Coupon:</div>
                    <div className="font-bold text-xl ml-2">
                      {discount.value.toLocaleString("en-US", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 border-t-2 border-gray-400 py-2">
                    <div className="font-bold text-indigo-600 text-base">Total:</div>
                    <div className="font-bold text-indigo-600 text-xl ml-2">
                      {(totalPrice - discount.value).toLocaleString("en-US", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                  </div>

                  <Button
                    className="flex w-full items-center justify-center bg-indigo-600 rounded-lg mt-3 font-bold text-base text-white transition-all hover:bg-indigo-700"
                    onClick={handleOpenModal}
                    size="sm"
                    disabled={totalPrice === 0} // ✅ disable only when nothing selected
                  >
                    Checkout
                  </Button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          // ✅ empty cart state
          <div className="flex flex-col items-center w-11/12 mx-auto mt-10">
            Your cart is empty. Keep shopping to find a course!
            <Button className="bg-purple-700 my-10" onClick={() => navigate("/course")}>
              Keep shopping
            </Button>
          </div>
        )}
      </div>

      <CheckoutModal price={totalPrice} discount={discount} handlePayment={handlePayment} />
      <ToastContainer />
    </div>
  );
};

export default StudentCart;
