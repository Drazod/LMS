import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
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

// const base_url = "https://localhost:8080/"; // TO BE CHANGED LATER

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
      const { data } = await api.post("/auth/login", values);
      console.log("Login response:", data);
      
      // Handle the new response structure
      const loginData = data.data;
      const user = loginData.user;
      
      signIn({
        token: loginData.accessToken,
        expiresIn: 3600, // Convert from "24h" to seconds if needed
        tokenType: "Bearer",
        authState: { email: user.email },
      });

      // Store user data with new structure
      localStorage.setItem('userId', user.userId);
      localStorage.setItem('role', user.role);
      localStorage.setItem('name', user.name);
      localStorage.setItem('email', user.email);
      localStorage.setItem('accessToken', loginData.accessToken);
      localStorage.setItem('refreshToken', loginData.refreshToken);

      console.log("Access token:", loginData.accessToken);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="bg-[url('/auth/bg2.jpg')] bg-cover bg-center">
        <div className="backdrop-blur-2xl min-h-dvh bg-white/80 md:flex md:items-center">
          <div className="mx-auto px-10 py-24 w-full sm:max-w-9/10 md:max-w-7/10 xl:max-w-1/2 2xl:max-w-3/10">
            <div className="flex flex-col gap-4 mb-8">
              <img
                src={imgUrl2}
                alt="logo"
                width={177}
                height={48}
              />
              <h2 className="font-bold text-3xl md:text-4xl">Log in to your account</h2>
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
                        <Input type="email" className="mt-1.5 bg-background" placeholder="Enter email address" {...field} />
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
                          href="/auth/forget-password"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <FormControl>
                        <Input type="password" className="bg-background" placeholder="Enter password" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full hover:cursor-pointer">
                  Login
                </Button>
              </form>
              <div className="flex flex-col gap-4 mt-8">
                <Button variant="outline" className="w-full hover:cursor-pointer">
                  <GoogleLogoIcon weight="bold" /> Sign up with Google
                </Button>
                <Button variant="outline" className="w-full hover:cursor-pointer">
                  <FacebookLogoIcon weight="bold" /> Sign up with Facebook
                </Button>
              </div>
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
    </>
  );
}
