import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from 'react';
import { useSignIn } from "react-auth-kit";
import imgUrl2 from "../assets/auth/logo-white-2.png";
import * as Yup from "yup";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FacebookLogoIcon, GoogleLogoIcon } from "@phosphor-icons/react";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const base_url = "https://curcus-3-0.onrender.com/";

export default function LoginPage() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const signIn = useSignIn();
  const [error, setError] = useState(""); // State for error message

  const handleSubmit = async (data) => {
    const postData = {
      email: data.email,
      password: data.password,
    };
    console.log(data);
    try {
      const response = await axios.post(
        `${base_url}api/v1/auth/authenticate`,
        postData
      );
      signIn({
        token: response.data.payload.tokens.access_token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: response.data.payload.email },
      });
      localStorage.setItem('userId', response.data.payload.userId);
      localStorage.setItem('role', response.data.payload.userRole);
      localStorage.setItem('name', response.data.payload.name);
      localStorage.setItem('avtUrl', response.data.payload.avtUrl);

      console.log(response.data.payload.tokens.access_token);

      navigate("/");
    } catch (error) {
      setError("The username or password is incorrect ! ");
      console.log("Error: ", error);
    }
  };

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

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
            <div className="mx-auto w-2/5 py-8 col-span-1 md:col-span-2">
              <div className="mb-10">
                <h2 className="mb-2 leading-8 pl-2 border-l-4 border-yellow-800 text-[26px] font-bold">
                  Login to your account
                </h2>
              </div>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={SignupSchema}
              >
                {({ errors, touched, handleChange }) => (
                  <form>
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </a>
                        </div>
                        <Input id="password" type="password" required />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Button type="submit" className="w-full">
                          Login
                        </Button>
                        <Button variant="outline" className="w-full">
                          <GoogleLogoIcon weight="bold" /> Sign up with Google
                        </Button>
                        <Button variant="outline" className="w-full">
                          <FacebookLogoIcon weight="bold" /> Sign up with Facebook
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 text-center text-sm">
                      Don&apos;t have an account?{" "}
                      <a href="/auth/register" className="underline underline-offset-4">
                        Sign up
                      </a>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
