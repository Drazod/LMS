import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, stateOfModal } from "../slices/modalSlice";
import {
  Button,
  Card,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  ArrowLeftIcon,
  CreditCardIcon,
  LockClosedIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import VNPay from "../assets/Cart/VNPAY.png";
import CreditCard from "../assets/Cart/CreditCard.png";

type CheckoutModalProps = {
  price: number; // total selected price before discount
  discount: { id: number | null; value: number };
  handlePayment: () => Promise<void> | void; // triggers the VNPay flow
};

const formatVND = (n: number) =>
  Number(n || 0).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const CheckoutModal: React.FC<CheckoutModalProps> = React.memo((props) => {
  const dispatch = useDispatch();
  const modalState = useSelector(stateOfModal); // <-- use real Redux state
  const [paymentOptions, setPaymentOptions] = React.useState<1 | 2>(1);
  const [processing, setProcessing] = React.useState(false);

  const handleCloseModal = () => dispatch(closeModal());

  const handleProceed = async () => {
    try {
      setProcessing(true);
      await props.handlePayment();
    } finally {
      setProcessing(false);
    }
  };

  // Close on ESC
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalState) handleCloseModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalState]);

  if (!modalState) return null;

  const total = (props.price || 0) - (props.discount?.value || 0);

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/50">
      <div className="flex-col bg-white w-5/6 h-full rounded-lg shadow-lg overflow-y-auto">
        <Button
          className="flex mr-auto mt-6 ml-6 text-gray-600"
          onClick={handleCloseModal}
          variant="text"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="text-sm ml-3">Back to Cart</span>
        </Button>

        <div className="flex flex-col md:flex-row mt-5 w-11/12 mx-auto gap-6 pb-12">
          {/* Left: Payment method */}
          <div className="md:w-2/3 w-full h-auto rounded-3xl border-2 border-gray-200">
            <div className="w-11/12 mt-5 mx-auto">
              <div className="flex mr-auto">
                <div className="text-xl font-bold">SELECT PAYMENT METHOD</div>
              </div>
              <hr className="w-16 border-gray-300 mt-3 border-2" />
            </div>

            <div className="flex gap-6 w-11/12 mx-auto mt-5">
              <Button
                className={`text-sm w-1/2 border-2 rounded-lg flex items-center justify-center ${
                  paymentOptions === 1
                    ? "bg-light-blue-400 border-light-blue-400 text-white"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
                onClick={() => setPaymentOptions(1)}
              >
                <CreditCardIcon className="h-5 w-5 mr-3" />
                Credit Card
              </Button>

              <Button
                className={`w-1/2 bg-white border-2 rounded-lg flex items-center justify-center ${
                  paymentOptions === 2 ? "border-light-blue-400" : "border-gray-300"
                }`}
                onClick={() => setPaymentOptions(2)}
              >
                <img className="h-6" src={VNPay} alt="VNPay" />
              </Button>
            </div>

            {/* Credit Card (disabled demo fields) */}
            <div
              className={`w-11/12 mt-5 mx-auto border-2 border-gray-200 p-3 mb-6 ${
                paymentOptions === 1 ? "flex flex-col md:flex-row" : "hidden"
              }`}
            >
              <Card color="transparent" shadow={false} className="flex md:w-1/2 md:mr-10 w-full">
                <form className="flex flex-col gap-4">
                  <div>
                    <div className="font-semibold text-sm">NAME ON CARD</div>
                    <Input
                      disabled
                      type="text"
                      size="md"
                      placeholder="KIM NHAT THANH"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900 max-h-[2rem]"
                      labelProps={{ className: "before:content-none after:content-none" }}
                    />
                  </div>

                  <div>
                    <div className="font-semibold text-sm">CARD NUMBER</div>
                    <Input
                      disabled
                      maxLength={19}
                      icon={<CreditCardIcon className="h-5 w-5 text-blue-gray-700" />}
                      placeholder="0000 0000 0000 0000"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900 max-h-[2rem]"
                      labelProps={{ className: "before:content-none after:content-none" }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="font-semibold text-sm">EXPIRY DATE</div>
                      <Input
                        disabled
                        maxLength={5}
                        placeholder="mm/yyyy"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 max-h-[2rem]"
                        labelProps={{ className: "before:content-none after:content-none" }}
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">CVC / CVV</div>
                      <Input
                        disabled
                        maxLength={4}
                        placeholder="000"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 max-h-[2rem]"
                        labelProps={{ className: "before:content-none after:content-none" }}
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input disabled type="checkbox" className="w-3 h-3 rounded" />
                    Save Card Details
                  </label>
                </form>
              </Card>

              <div className="flex md:w-1/2 w-full mt-8 md:mt-0">
                <img src={CreditCard} alt="Credit Card Illustration" className="h-[150px] mx-auto" />
              </div>
            </div>

            {/* VNPay */}
            <div
              className={`items-center justify-center flex w-11/12 mx-auto ${
                paymentOptions === 2 ? "h-40" : "hidden"
              }`}
            >
              <Button
                className="flex items-center justify-center w-1/3 text-sm"
                onClick={handleProceed}
                disabled={processing}
              >
                {processing ? "Redirecting..." : "Proceed"}
                <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="md:w-1/3 w-full flex flex-col">
            <form className="w-full p-5 border-2 border-gray-200 rounded-3xl">
              <div className="text-xl font-bold">ORDER SUMMARY</div>
              <hr className="w-12 border-gray-300 mt-3 border-2" />

              <div className="flex items-center justify-between py-5">
                <div className="font-bold text-base">Original Price:</div>
                <div className="font-bold text-base">{formatVND(props.price)}</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="font-normal text-base">Discounts:</div>
                <div className="font-normal text-base">{formatVND(props.discount?.value || 0)}</div>
              </div>

              <div className="flex items-center justify-between mt-5 border-t-2 border-gray-200 pt-5">
                <div className="font-bold text-base">Total:</div>
                <div className="font-bold text-base">{formatVND(total)}</div>
              </div>

              <Typography
                variant="h6"
                color="gray"
                className="mt-2 flex items-center justify-center gap-2 font-bold opacity-60"
              >
                <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Secured checkout
              </Typography>
            </form>

            {/* “Complete Checkout” for credit card (demo) */}
            <Button
              className={`ml-auto mt-5 ${paymentOptions === 1 ? "bg-light-blue-400 text-white" : "hidden"}`}
              onClick={handleCloseModal}
            >
              <span className="text-sm">Complete Checkout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CheckoutModal;
