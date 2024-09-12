import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import imgUrl2 from "../assets/auth/logo-white-2.png";
import * as Yup from "yup";
import axios from "axios";
import FloatingLabel from "@/components/label"; // Import the custom FloatingLabel component

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const base_url = "https://curcus-3-0.onrender.com/";

export default function ForgetPassword() {
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  const initialValues = {
    email: "",
  };

  const handleSubmit = async (data) => {
    const postData = {
      email: data.email,
    };
    try {
      const response = await axios.post(
        `${base_url}/api/password-reset/request`,
        postData
      );
      console.log(response.data);
      alert("Send thành công!");
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  return (
    <>
      <div className="page-wraper">
        <div className="account-form">
          <div className="w-full h-screen grid grid-cols-1 md:grid-cols-3 justify-center items-center">
            <div className="relative w-full h-full col-span-1 bg-[url('/auth/bg2.jpg')] bg-cover bg-center">
              <img
                src={imgUrl2}
                alt="logo"
                width={211}
                height={57}
                className="absolute top-1/4 md:top-1/2 left-1/2 -translate-x-1/2 z-50"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-[#4c1864]/50"></div>
            </div>
            <div className="max-w-[450px] mx-auto py-8 col-span-1 md:col-span-2">
              <div className="mb-10">
                <h2 className="mb-2 leading-8 pl-2 border-l-4 border-yellow-800 text-[32px] font-bold">
                  Forget <span className="font-light">Password</span>
                </h2>
                <p className="pt-[10px] text-base max-w-[500px] leading-7">
                  {"Login To Your Account"}
                  <> </>
                  <Link className="text-purple-900 underline" to="/auth/login">
                    Click here
                  </Link>
                </p>
              </div>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={SignupSchema}
              >
                {({ errors, touched, handleChange }) => (
                  <Form className="box-border relative">
                    <div className="-mx-[15px] flex flex-wrap box-border gap-3">
                      <div className="max-w-full relative w-full min-h-[1px] px-[15px]">
                        <div className="mb-[25px] relative border-b-[1px] border-gray-400">
                          <div className="relative w-full block">
                            <FloatingLabel
                              htmlFor="email"
                              isFocused={emailFocused}
                              inputValue={emailValue}
                            >
                              Your Email Address
                            </FloatingLabel>
                            <Field
                              name="email"
                              id="email"
                              type="email"
                              required
                              className={`form-control ${
                                errors.email && touched.email
                                  ? "is-invalid"
                                  : ""
                              } w-full focus:border-none focus:outline-none`}
                              onFocus={() => setEmailFocused(true)}
                              onBlur={() => setEmailFocused(false)}
                              onChange={(e) => {
                                handleChange(e);
                                setEmailValue(e.target.value);
                              }}
                            />
                            <ErrorMessage
                              className="text-red-500"
                              name="email"
                              component="p"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="max-w-full relative w-full min-h-[1px] px-[15px] mb-[30px]">
                        <button
                          type="submit"
                          className="btn bg-[#f7b205] button-md font-medium text-base text-black hover:bg-[#4c1864] hover:text-white text-center rounded-sm box-border px-10 py-3"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
