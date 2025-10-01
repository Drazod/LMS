import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  FacebookLogoIcon,
  GoogleLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

import logo from '/hoctiengvietai_black.svg';

export const Footer = () => {
  return (
    <Card className="container mx-auto my-10 rounded-4xl py-14 px-14">
      <CardContent className="flex flex-col gap-10 p-0 pt-0">
        <div className="flex justify-between">
          <a href="/">
            <img
              src={logo}
              className="h-20 object-cover mr-12 my-5 sm:my-0 hover:opacity-50 duration-75 ease-in-out transition"
            ></img>
          </a>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex gap-2">
              <Button variant="ghost" size="icon" className="size-8" asChild>
                <a href="https://www.facebook.com">
                  <FacebookLogoIcon weight="duotone" className="!size-7" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="size-8" asChild>
                <a href="https://www.google.com">
                  <GoogleLogoIcon weight="duotone" className="!size-7" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="size-8" asChild>
                <a href="https://www.linkedin.com">
                  <LinkedinLogoIcon weight="duotone" className="!size-7" />
                </a>
              </Button>
            </div>
            <Button>Join Now</Button>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="hidden sm:flex flex-col w-2/5">
            <h3 className="font-bold mb-2 text-base">
              Sign Up For A Newsletter
            </h3>
            <p>
              Weekly Breaking News Analysis And Cutting Edge Advices On Job
              Searching.
            </p>
            <div className="flex w-full items-center gap-2 mt-6">
              <Input type="email" placeholder="Email" />
              <Button type="submit" variant="outline">
                Subscribe
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-base">Company</h3>
            <ul className="text-gray-500 space-y-2">
              <li>
                <a href="#" className="hover:text-orange-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-base">Get In Touch</h3>
            <ul className="text-gray-500 space-y-2">
              <li>
                <a href="#" className="hover:text-orange-400">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Event
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-base">Courses</h3>
            <ul className="text-gray-500 space-y-2">
              <li>
                <a href="#" className="hover:text-orange-400">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Details
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Membership
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-10">
          <small>&copy; 2025, EduChamp. All rights reserved.</small>
        </div>
      </CardContent>
    </Card>
  );
};
