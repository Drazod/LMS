import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FacebookLogoIcon, GoogleLogoIcon } from "@phosphor-icons/react";
import imgUrl2 from "@/assets/auth/logo-white-2.png";

const base_url = "https://curcus-3-0.onrender.com/"; // TO BE CHANGED LATER

export default function LoginPage() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  
  const loginSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const response = await axios.post(
        `${base_url}api/v1/auth/authenticate`,
        values
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
      console.error("Login error:", error);
    }
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
            <div className="mx-auto w-2/5 py-8 col-span-1 md:col-span-2">
              <div className="mb-10">
                <h2 className="mb-2 leading-8 pl-2 border-l-4 border-yellow-800 text-[26px] font-bold">
                  Login to your account
                </h2>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input className="mt-1.5" placeholder="Enter email address" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                          <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </a>
                        </div>
                        <FormControl>
                          <Input placeholder="Enter password" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
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
                </form>
                <div className="mt-8 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="/auth/register" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
