import React from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Logo from "../../assets/logo-white.png";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
const NavMobile = () => {
  const [nav, setNav] = useState(false);
  const [ourcourses, setOurcourses] = useState(false);
  const [dashboard, setDashboard] = useState(false);

  const toggleNav = () => {
    setNav(!nav);
  };

  const toggleDashboard = () => {
    setDashboard(!dashboard);
  };

  const toggleOurcourses = () => {
    setOurcourses(!ourcourses);
  };

  return (
    <div>
      <div onClick={toggleNav}>
        {nav ? (
          <XMarkIcon className="ml-2 w-5 h-5 inline-block xl:hidden" />
        ) : (
          <Bars3Icon className="ml-2 w-5 h-5 inline-block xl:hidden" />
        )}
      </div>
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-blue-gray-500 bg-blue-gray-300 ease-in-out duration-300 xl:hidden"
            : "fixed -left-full  "
        }
      >
        <img src={Logo} className="w-28 sm:w-fit object-cover m-4"></img>
        <ul className="p-4 ">
          <li className="m-2 p-2  border-b border-gray-500 bg-blue-gray-50 rounded-xl text-black">
            <a href="#" className="hover:text-indigo-300">
              HOME
            </a>
          </li>
          <li className="m-2 p-2  border-b border-gray-500 bg-blue-gray-50 rounded-xl text-black">
            <p onClick={toggleOurcourses}>
              OUR COURSES
              <ChevronDownIcon className="w-4 h-4 inline-block float-right" />
            </p>
            <ul className={!ourcourses ? "hidden  " : "relative"}>
              <li className="pl-2 my-2 ">
                <a href="#">Courses</a>
              </li>
              <li className="pl-2 ">
                <a href="#">Courses Details</a>
              </li>
            </ul>
          </li>
          <li className="m-2 p-2  border-b border-gray-500 bg-blue-gray-50 rounded-xl text-black">
            <a href="#" className="hover:text-indigo-300">
              BLOG
            </a>
          </li>
          <li className="m-2 p-2  border-b border-gray-500 bg-blue-gray-50 rounded-xl text-black">
            <p onClick={toggleDashboard}>
              DASHBOARD
              <ChevronDownIcon className="w-4 h-4 inline-block float-right" />
            </p>
            <ul className={!dashboard ? "hidden  " : "relative"}>
              <li className="pl-2 my-2 ">
                <a href="#">Student</a>
              </li>
              <li className="pl-2 ">
                <a href="#">Instructor</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavMobile;
