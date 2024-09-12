import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import imgUrl2 from "../assets/auth/logo-white-2.png";
import * as Yup from "yup";
import axios from "axios";

import FloatingLabel from "@/components/label";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const base_url = "https://curcus-3-0.onrender.com/";

export default function Register() {
  const navigate = useNavigate();
  const initialValues = {
    userRole: "",
    name:"",
    email: "",
    password: "",
  };

  const handleSubmit = async (data) => {
    const userRoleMap = {
      Student: "S",
      Instructor: "I",
    };

    const postData = {
      userRole: userRoleMap[data.userRole],
      name: data.name,
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post(
        `${base_url}api/v1/auth/register`,
        postData
      );
      localStorage.setItem('userId', response.data.payload.userId) 
      localStorage.setItem('role', response.data.payload.userRole)
      localStorage.setItem('name', response.data.payload.name)   
      localStorage.setItem('avtUrl', response.data.payload.avtUrl)    
      navigate('/');
    } catch (error) {}
  };
  const [nameFocused, setNameFocused] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [userRoleFocused, setUserRoleFocused] = useState(false);
  const [userRoleValue, setUserRoleValue] = useState("");
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
                  Sign Up <span className="font-light">Now</span>
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
                              htmlFor="userRole"
                              isFocused={userRoleFocused}
                              inputValue={userRoleValue}
                            >
                              
                            </FloatingLabel>
                            <Field
                              name="userRole"
                              id="userRole"
                              as="select"
                              required
                              className={`form-control ${
                                errors.userRole && touched.userRole ? "is-invalid" : ""
                              } w-full focus:border-none focus:outline-none`}
                              onFocus={() => setUserRoleFocused(true)}
                              onBlur={() => setUserRoleFocused(false)}
                              onChange={(e) => {
                                handleChange(e);
                                setUserRoleValue(e.target.value);
                              }}
                            >
                              <option value="" label="Select role" />
                              <option value="Student" label="Student" />
                              <option value="Instructor" label="Instructor" />
                            </Field>
                            <ErrorMessage
                              className="text-red-500"
                              name="userRole"
                              component="p"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="max-w-full relative w-full min-h-[1px] px-[15px]">
                        <div className="mb-[25px] relative border-b-[1px] border-gray-400">
                          <div className="relative w-full block">
                            <FloatingLabel
                              htmlFor="name"
                              isFocused={nameFocused}
                              inputValue={nameValue}
                            >
                              Your Name
                            </FloatingLabel>
                            <Field
                              name="name"
                              id="name"
                              type="string"
                              required
                              className={`form-control ${
                                errors.name && touched.name ? "is-invalid" : ""
                              } w-full focus:border-none focus:outline-none`}
                              onFocus={() => setNameFocused(true)}
                              onBlur={() => setNameFocused(false)}
                              onChange={(e) => {
                                handleChange(e);
                                setNameValue(e.target.value);
                              }}
                            />

                            <ErrorMessage
                              className="text-red-500"
                              name="name"
                              component="p"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="max-w-full relative w-full min-h-[1px] px-[15px]">
                        <div className="mb-[25px] relative border-b-[1px] border-gray-400">
                          <div className="relative w-full block">
                            <FloatingLabel
                              htmlFor="email"
                              isFocused={emailFocused}
                              inputValue={emailValue}
                            >
                              Your Email
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

                      <div className="max-w-full relative w-full min-h-[1px] px-[15px]">
                        <div className="mb-[25px] relative border-b-[1px] border-gray-400">
                          <div className="relative w-full block">
                            <FloatingLabel
                              htmlFor="password"
                              isFocused={passwordFocused}
                              inputValue={passwordValue}
                            >
                              Your Password
                            </FloatingLabel>
                            <Field
                              name="password"
                              id="password"
                              type="password"
                              required
                              className={`form-control ${
                                errors.password && touched.password
                                  ? "is-invalid"
                                  : ""
                              } w-full focus:border-none focus:outline-none`}
                              onFocus={() => setPasswordFocused(true)}
                              onBlur={() => setPasswordFocused(false)}
                              onChange={(e) => {
                                handleChange(e);
                                setPasswordValue(e.target.value);
                              }}
                            />

                            <ErrorMessage
                              className="text-red-500"
                              name="password"
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
                          Sign Up
                        </button>
                      </div>
                      <div className="w-full flex flex-col justify-start items-start gap-3 px-[15px]">
                        <h6 className="font-medium">Login with Social media</h6>
                        <div className="flex gap-5 justify-center items-center">
                          <a
                            className="w-full text-white btn flex justify-center items-center gap-2 px-4 py-2 rounded-sm facebook bg-[#3B5998]"
                            href="#"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="w-[20px] h-[20px]"
                            >
                              <path
                                fill="#fff"
                                d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
                              />
                            </svg>
                            <p className="text-[14px]">Facebook</p>
                          </a>
                          <a
                            className="w-full text-white btn flex justify-center items-center gap-2 px-4 py-2 rounded-sm facebook bg-[#e5513f]"
                            href="#"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 512"
                              className="w-[20px] h-[20px]"
                            >
                              <path
                                fill="#fff"
                                d="M386.1 228.5c1.8 9.7 3.1 19.4 3.1 32C389.2 370.2 315.6 448 204.8 448c-106.1 0-192-85.9-192-192s85.9-192 192-192c51.9 0 95.1 18.9 128.6 50.3l-52.1 50c-14.1-13.6-39-29.6-76.5-29.6-65.5 0-118.9 54.2-118.9 121.3 0 67.1 53.4 121.3 118.9 121.3 76 0 104.5-54.7 109-82.8H204.8v-66h181.3zm185.4 6.4V179.2h-56v55.7h-55.7v56h55.7v55.7h56v-55.7H627.2v-56h-55.7z"
                              />
                            </svg>
                            <p className="text-[14px]">Google Plus</p>
                          </a>
                        </div>
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
