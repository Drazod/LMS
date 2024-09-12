import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Toast = withReactContent(Swal).mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export { Toast };
