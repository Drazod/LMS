import { Input, Switch } from "@material-tailwind/react";
import { Button, Box, SvgIcon } from "@mui/joy";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Autocomplete,
  Alert,
  TextField,
  Collapse,
  CircularProgress,
} from "@mui/material";
import { API_URL } from "@/configs/ApiConfig";
import { useDispatch } from "react-redux";
import { setSelectedIndex } from "@/features/slices/selectedIndex";
import { getUserDataFromLocal } from "@/utils/getUserDataFromLocal";
import "ldrs/tailspin";

// Default values shown
<l-tailspin size="40" stroke="5" speed="0.9" color="black"></l-tailspin>;
const CreateCourse = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const quillRef = useRef(null);
  const [categoryList, setCategoryList] = useState([
    { categoryID: 0, categoryName: "" },
  ]);
  const [category, setCategory] = useState(0);
  const [isloading, setIsLoading] = useState(false);

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [fileError, setFileError] = useState(false);

  const [resetInputField, setResetInputField] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  const userID = getUserDataFromLocal().userId;

  console.log(userID);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 1200;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
    axios
      .get(API_URL + "categories")
      .then((res) => {
        setCategoryList(res.data.payload);
      })
      .catch((err) => console.log(err));
  }, [isMobile]);

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleFile = (e) => {
    e.preventDefault();
    if (e.target.files.length === 0) {
      console.log("No file selected");
    } else {
      setFile(e.target.files[0]);
    }
  };

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handlePrice(e) {
    setPrice(e.target.value);
  }

  function handleCategory(event, value) {
    if (!value) {
      setCategory(0);
    } else {
      setCategory(value);
    }
  }

  function openPrice() {
    setMenu((prev) => !prev);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(editorContent);
    if (!title || !editorContent || !file || category === 0) {
      if (!title) {
        setTitleError(true);
      } else {
        setTitleError(false);
      }
      if (!editorContent || editorContent === "<p><br></p>") {
        setDescriptionError(true);
      } else {
        setDescriptionError(false);
      }
      if (!file) {
        setFileError(true);
      } else {
        setFileError(false);
      }
      if (category === 0) {
        setCategoryError(true);
      } else {
        setCategoryError(false);
      }
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("courseThumbnail", file);
    formData.append("title", title);
    formData.append("description", editorContent);
    formData.append("price", price);
    formData.append("instructorId", userID);
    // formData.append("instructorId", 3);
    formData.append("categoryId", category);
    axios
      .post(API_URL + "courses/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Course created successfully:", response.data);
        setFile(null);
        setTitle("");
        setEditorContent(null);
        setPrice(0);
        setCategory(0);
        setResetInputField((prev) => !prev);

        setTitleError(false);
        setDescriptionError(false);
        setFileError(false);
        setCategoryError(false);
        setIsLoading(false);
        dispatch(setSelectedIndex(1));
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error creating course:", error);
      });
  };

  function InputFileUpload(isMobile) {
    return (
      <Button
        className={isMobile ? "w-[90%]" : "w-fit"}
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="outlined"
        color="neutral"
        startDecorator={
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </SvgIcon>
        }
      >
        <input
          type="file"
          onChange={(e) => handleFile(e)}
          accept="image/*"
          className="w-[100%]"
        />
      </Button>
    );
  }
  return (
    <div className={isMobile ? "text-sm flex w-full" : "text-base flex w-full"}>
      <div className=" bg-white items-center flex flex-col w-[100%]">
        <div className="flex bg-white w-full h-12 items-center justify-center">
          <div className="w-[93%] border-b-2 border-[#D9D9D9] h-8 flex items-center mt-5">
            <div className="ml-2 font-semibold border-r-2 border-[#D9D9D9] w-32">
              Create Course
            </div>
            <div className="ml-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={isMobile ? "size-4" : "size-6"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </div>
            <div className="ml-2 text-[#A2A2A2]">Home {">"} Create Course</div>
          </div>
        </div>
        <form
          className="h-auto w-[90%] shadow-md mt-10 mb-28"
          onSubmit={handleSubmit}
        >
          <div
            className={
              isMobile
                ? "text-xs flex-col justify-center ml-10 my-3"
                : "text-base flex-col justify-center ml-10 my-3"
            }
          >
            <div className="font-semibold">
              Course title*
              <div className="w-1/3 mt-3">
                <Input
                  variant="outlined"
                  label="Title"
                  value={title}
                  className="text-sm"
                  onChange={handleTitle}
                />
              </div>
            </div>

            {titleError ? (
              <Alert
                severity="error"
                className={isMobile ? "w-[200px]" : "w-fit"}
              >
                You haven't filled in the Course Title.
              </Alert>
            ) : (
              <></>
            )}
            <div className="font-semibold mt-5">
              Description*
              <div className={isMobile ? "w-11/12 mt-3" : " w-2/3 mt-3"}>
                <ReactQuill
                  theme="snow"
                  style={{ minHeight: "100px" }}
                  placeholder="Write Something about your view"
                  value={editorContent}
                  onChange={(content) => {
                    handleEditorChange(content);
                  }}
                  ref={quillRef}
                />
              </div>
              {descriptionError ? (
                <Alert
                  severity="error"
                  className={isMobile ? " w-[92%]" : "w-fit"}
                >
                  You haven't filled in the Description.
                </Alert>
              ) : (
                <></>
              )}
            </div>

            <div className="font-semibold mt-3">Category*</div>

            <div className="mt-6">
              <Autocomplete
                onChange={(e, value) => {
                  if (value === null) {
                    handleCategory(e, 0);
                  } else {
                    handleCategory(e, value.id);
                  }
                }}
                size="small"
                disablePortal
                options={categoryList.map((item) => ({
                  id: item.categoryId,
                  label: item.categoryName,
                }))}
                sx={{ width: 250 }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                // value={}
                key={resetInputField}
                renderInput={(params) => (
                  <TextField {...params} label="Select Category" />
                )}
              />
            </div>
            {categoryError ? (
              <Alert
                severity="error"
                className={isMobile ? "w-[90%]" : "w-fit"}
              >
                You haven't chosen the Category of the Course.
              </Alert>
            ) : (
              <></>
            )}

            <div className="text-base font-semibold mt-5 mb-3">Thumbnail*</div>

            <div className="mt-4 flex items-center">
              {InputFileUpload(isMobile)}
            </div>
            {fileError ? (
              <Alert
                severity="error"
                className={isMobile ? "w-[92%]" : "w-fit"}
              >
                You haven't chosen the Thumbnail for the Course.
              </Alert>
            ) : (
              <></>
            )}

            <div className=" mt-6 text-base mb-3">
              <div className=" mr-0 font-semibold flex items-center">
                {menu ? (
                  <div>Price</div>
                ) : (
                  <div className="text-gray-400 font-semibold ">Price</div>
                )}
                <Switch
                  ripple={false}
                  onClick={openPrice}
                  className="h-full w-full checked:bg-[#2ec946]"
                  containerProps={{
                    className: "w-11 h-6 ml-4",
                  }}
                  circleProps={{
                    className: "before:hidden left-0.5 border-none",
                  }}
                />
              </div>
              <Box>
                <Collapse className="w-[30%] mt-3" in={menu}>
                  <Input
                    variant="outlined"
                    label="Price"
                    className="text-sm"
                    onChange={handlePrice}
                    value={price}
                  />
                </Collapse>
              </Box>
            </div>
            <div className=" mb-10 mt-3">
              <Button
                type="submit"
                disabled={isloading}

                // onClick={() => dispatch(setSelectedIndex(1))}
              >
                {isloading ? (
                  <>
                    <CircularProgress size={20} className="mr-3" /> Loading...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateCourse;
