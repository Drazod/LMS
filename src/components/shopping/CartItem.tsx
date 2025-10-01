import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Chip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

type CartItemProps = {
  index: number;
  id: number;
  logo: string;
  name: string;
  tag: string;
  instructor: string;
  price: number; // ensure number; convert before passing if API returns string
  selectedItems: number[];
  checkboxHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAfterDeleteCourse: (courseId: number, index: number) => Promise<void> | void;
};

const formatVND = (n: number) =>
  Number(n).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const CartItem: React.FC<CartItemProps> = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const handleOpen = () => setOpen((v) => !v);

  const handleSubmit = async () => {
    try {
      setDeleting(true);
      await props.handleAfterDeleteCourse(props.id, props.index);
    } finally {
      setDeleting(false);
      handleOpen();
    }
  };

  return (
    <div className="flex w-11/12 h-[120px] border-t-2 border-gray-300 py-3 max-lg:max-w-lg max-lg:mx-auto gap-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          value={props.id}
          checked={props.selectedItems.includes(props.id)}
          onChange={props.checkboxHandler}
          className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 mr-3"
        />
      </div>

      <div className="flex items-start w-[150px]">
        <img
          src={props.logo}
          alt={`${props.name} thumbnail`}
          className="w-[150px] pt-1 object-cover"
        />
      </div>

      <div className="detail w-1/2 lg:pl-3">
        <div className="items-center w-full mb-1">
          <div
            className="font-extrabold text-sm text-gray-900 truncate"
            title={props.name}
          >
            {props.name}
          </div>
        </div>

        <div className="flex select-none items-center font-normal leading-7 text-gray-500 mb-1">
          <Chip size="sm" color="cyan" value={props.tag} />
        </div>

        <div className="flex flex-row font-normal text-sm leading-7 mb-1">
          <div className="font-bold">Instructor:</div>&nbsp;
          <div className="underline underline-offset-2">{props.instructor}</div>
        </div>
      </div>

      <div className="flex place-content-center items-center w-1/6">
        <div className="text-indigo-600 font-manrope font-bold text-base leading-9 text-right">
          {formatVND(props.price)}
        </div>
      </div>

      <div className="flex flex-col place-content-center gap-2 items-center w-1/6">
        <Button color="red" size="sm" onClick={handleOpen} className="w-[84px]" disabled={deleting}>
          Remove
        </Button>
        <Button
          
          size="sm"
          onClick={() => navigate(`/course/${props.id}`)}
          className="bg-green-700 w-[84px]"
        >
          View
        </Button>

        <Dialog open={open} handler={handleOpen} size="xs">
          <DialogHeader>Remove Confirmation</DialogHeader>
          <DialogBody>
            Are you sure you want to remove this course from your cart? This process cannot be undone.
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={handleOpen} className="mr-1" disabled={deleting}>
              <span>Cancel</span>
            </Button>
            <Button className="bg-indigo-600" onClick={handleSubmit} disabled={deleting}>
              <span>{deleting ? "Removing..." : "Confirm"}</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default CartItem;
