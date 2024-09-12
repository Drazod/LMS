import Logo from "../assets/logo-white.png";
import { useState, useEffect } from "react";
import React from "react";
import {
  QuestionMarkCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { EnvelopeIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SelectLanguage from "./Home_Component/DropLang1";
import Navbar from "../components/Home_Component/navbar";
import DropContentHome, {
  DropContentDashBoard,
  DropContentCourses,
} from "./Home_Component/Dropcontent";
import SearchHeader from "./Home_Component/SearchHeader";
import NavMobile from "./Home_Component/NavMobile";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  const [openHome, setOpenHome] = useState(false);
  const [openBlog, setOpenBlog] = useState(false);
  const [openDash, setOpenDash] = useState(false);
  const [color, setColor] = useState(false);

  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    setName("");
    navigate("/auth/login");
  };

  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  const getDashboardUrl = () => {
    const role = localStorage.getItem("role");
    if (role === "S") {
      return "/dashboard/student";
    } else if (role === "I") {
      return "/dashboard/instructor";
    } else if (role === "A") {
      return "/admin";
    } else {
      return "/dashboard"; // default or error route
    }
  };
  const dashboardUrl = getDashboardUrl();

  window.addEventListener("scroll", changeColor);
  return (
    <header
      className={
        color
          ? "fixed w-full bg-black z-30 p-2 text-sm sm:text-base text-white"
          : "fixed w-full bg-transparent z-30 p-2 text-sm sm:text-base text-white"
      }
    >
      <div
        className={
          color ? "hidden" : " container sm:flex mx-auto px-2 text-center mb-4"
        }
      >
        <p>
          <QuestionMarkCircleIcon className=" w-4 h-4 sm:h-5 sm:w-5 inline-block mb-1" />
          Ask a Question
        </p>
        <p className="ml-2">
          <EnvelopeIcon className="w-4 h-4 sm:h-5 sm:w-5 inline-block sm:mb-1" />
          Support@website.com
        </p>
        <div className="sm:grow sm:text-right">
          <ul>
            <li className="inline-block mr-10">
              <SelectLanguage />
            </li>
            {name ? (
              <>
                <li className="inline-block mr-4">
                  <span>Hello, {name}</span>
                </li>
                <li className="inline-block">
                  <button className="text-white" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="inline-block mr-4">
                  <a className="text-white" href="/auth/login">
                    Login
                  </a>
                </li>
                <li className="inline-block">
                  <a className="text-white" href="/auth/register">
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-2 flex justify-between ">
        <ul className="xl:flex ">
          <a href="#" className="mr-12 block">
            <img src={Logo} className="w-28 sm:w-fit object-cover"></img>
          </a>
          <div
            onMouseEnter={() => setOpenHome(true)}
            onMouseLeave={() => setOpenHome(false)}
            className="relative h-fit w-fit my-2 mx-3 hidden xl:block"
          >
            <Link
              to="/"
              className="relative text-white hover:text-indigo-300 mr-2"
            >
              HOME
              <span
                style={{
                  transform: openHome ? "scaleX(1)" : "scaleX(0)",
                }}
                className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
              />
            </Link>
          </div>
          <Navbar href="#" FlyoutContent={DropContentCourses}>
            OUR COURSES
            <ChevronDownIcon className="h-4 w-4  sm:h-5 sm:w-5 transform ml-2 float-right mt-1" />
          </Navbar>
          {/* <div
            onMouseEnter={() => setOpenBlog(true)}
            onMouseLeave={() => setOpenBlog(false)}
            className="relative h-fit w-fit my-2 mx-3 hidden xl:block"
          >
            <a
              href="#"
              className="relative text-white hover:text-indigo-300 mr-2"
            >
              BLOG
              <span
                style={{
                  transform: openBlog ? "scaleX(1)" : "scaleX(0)",
                }}
                className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
              />
            </a>
          </div> */}
          <div
            onMouseEnter={() => setOpenDash(true)}
            onMouseLeave={() => setOpenDash(false)}
            className="relative h-fit w-fit my-2 mx-3 hidden xl:block"
          >
            <a
              href={dashboardUrl}
              className="relative text-white hover:text-indigo-300 mr-2"
            >
              DASHBOARD
              <span
                style={{
                  transform: openDash ? "scaleX(1)" : "scaleX(0)",
                }}
                className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
              />
            </a>
          </div>
          {/* <Navbar href="#" FlyoutContent={DropContentDashBoard}>
            DASHBOARD
            <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5 transform ml-2 float-right mt-1" />
          </Navbar> */}
        </ul>
        <div className="flex mt-1">
          <a href="https://www.facebook.com" className="mx-2">
            <FacebookOutlinedIcon fontSize="small" />
          </a>
          <a href="https://www.google.com" className="mx-2">
            <GoogleIcon fontSize="small" />
          </a>
          <a href="https://www.linkedin.com" className="mx-2">
            <LinkedInIcon fontSize="small" />
          </a>
          <SearchHeader />
          <li className="inline-block">
            <a className="text-white" href="/cart">
              <ShoppingCartIcon className="w-4 h-4 sm:h-5 sm:w-5 inline-block sm:mb-1 ml-2" />
            </a>
          </li>
          <NavMobile />
        </div>
      </div>
    </header>
  );
}

export default Header;
