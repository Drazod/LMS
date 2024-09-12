import ReactQuill from "react-quill/lib";
import "react-quill/dist/quill.snow.css";

const lessionComponents = {
  header: {
    type: "HTML",
    display: <div className="font-bold text-2xl">Header</div>,
    content: <div className="font-bold text-2xl">Header</div>,
  },
  paragraph_xs: {
    type: "HTML",
    display: <p className="text-xs">paragraph</p>,
    content: <p className="text-xs">paragraph</p>,
  },
  paragraph_sm: {
    type: "HTML",
    display: <p className="text-sm">paragraph</p>,
    content: <p className="text-sm">paragraph</p>,
  },
  paragraph_base: {
    type: "HTML",
    display: <p className="text-base">paragraph</p>,
    content: <p className="text-base">paragraph</p>,
  },
  paragraph_lg: {
    type: "HTML",
    display: <p className="text-lg">paragraph</p>,
    content: <p className="text-lg">paragraph</p>,
  },
  editor: {
    type: "EDITOR",
    display: <div className="text-lg font-bold">Editor</div>,
    content: "",
  },
  video: {
    type: "VIDEO",
    display: <div className="text-lg font-bold">Video</div>,
    content: "",
  },
};

export default lessionComponents;
