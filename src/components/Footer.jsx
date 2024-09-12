import React from "react";
import Logo from "../assets/logo-white.png";
import { Button, TextField } from "@mui/material";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="relative w-full text-white container mx-auto sm:px-6">
        <div className="flex  justify-between px-4">
          <a href="#">
            <img
              src={Logo}
              className="w-28 sm:w-fit object-cover mr-12 my-5 sm:my-0"
            ></img>
          </a>
          <div className="flex">
            <div>
              <div className="hidden sm:flex text-center my-6 mr-6">
                <a href="https://www.facebook.com" className="mx-2">
                  <FacebookOutlinedIcon fontSize="small" />
                </a>
                <a href="https://www.google.com" className="mx-2">
                  <GoogleIcon fontSize="small" />
                </a>
                <a href="https://www.linkedin.com" className="mx-2">
                  <LinkedInIcon fontSize="small" />
                </a>
              </div>
            </div>
            <div>
              <Button
                variant="contained"
                className="!bg-orange-500 !text-black !mt-4 !hover:bg-purple-800"
              >
                Join Now
              </Button>
            </div>
          </div>
        </div>
        <div className="sm:hidden mx-4">
          <h3 className="font-bold mb-4 text-base">Sign Up For A Newsletter</h3>
          <p className="text-gray-500">
            Weekly Breaking News Analysis And Cutting Edge Advices On Job
            Searching.
          </p>
          <div className=" flex mt-6 justify-between">
            <TextField
              id="filled-basic1"
              label="Your email here"
              variant="filled"
              className="!bg-gray-400 !rounded-sm !mr-2 !w-full"
              size="small"
            />
            <Button
              variant="contained"
              className="!float-right !bg-orange-500 !hover:bg-purple-800"
            >
              <ArrowLongRightIcon className="text-black" />
            </Button>
          </div>
        </div>
        <div className="flex flex-row mt-8 space-x-4">
          <div className="basis-4/12 hidden sm:block">
            <h3 className="font-bold mb-4 text-base">
              Sign Up For A Newsletter
            </h3>
            <p className="text-gray-500">
              Weekly Breaking News Analysis And Cutting Edge Advices On Job
              Searching.
            </p>

            <div className=" flex mt-6 justify-between">
              <TextField
                id="filled-basic"
                label="Your email here"
                variant="filled"
                className="!bg-gray-400 !rounded-sm !mr-2 !w-full"
                size="small"
              />
              <Button
                variant="contained"
                className="!float-right !bg-orange-500 !hover:bg-purple-800"
              >
                <ArrowLongRightIcon className="text-black" />
              </Button>
            </div>
          </div>
          <div className="basis-2/12">
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
          <div className="basis-2/12">
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
          <div className="basis-2/12">
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
        <div className="text-center mt-24 text-gray-500">Templates Hub</div>
      </div>
    </footer>
  );
};

export default Footer;
