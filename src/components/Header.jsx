import Logo from "../assets/logo-white.png";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import LanguageDropDown from "./Home_Component/LanguageDropdown";
import Navbar from "../components/Home_Component/navbar";
import DropContentHome, {
  DropContentPage,
  DropContentBlog,
  DropContentDashBoard,
  DropContentCourses,
} from "./Home_Component/Dropcontent";
import SearchHeader from "./Home_Component/SearchHeader";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
function Header() {
  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);
  return (
    <>
      <div
        className={
          color ? "fixed w-full bg-black z-30 " : "fixed w-full bg-black z-30 "
        }
      >
        <div className="pt-2 pb-6 text-white">
          <div className="container mx-auto px-6">
            <div className={color ? "hidden" : "flex justify-between mb-10"}>
              <div className="float-left">
                <ul className="flex">
                  <li className=" pr-2">
                    <QuestionMarkCircleIcon className="h-4 w-4 float-left mt-1 mr-1" />
                    Ask a Question
                  </li>
                  <li className=" pl-2">
                    <EnvelopeIcon className="h-4 w-4 float-left mt-1 mr-1" />
                    Support@gmail.com
                  </li>
                </ul>
              </div>
              <div className="float-right">
                <ul className="flex">
                  <li className=" pr-2">
                    <LanguageDropDown />
                  </li>
                  <li className=" pl-2 pr-2">
                    <a href="/auth/login" className="mx-2">
                      Login
                    </a>
                  </li>
                  <li className=" pl-2">
                    <a href="#" className="mx-2">
                      Resigter
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex">
                <a href="#" className="mr-12">
                  <img src={Logo} className="object-cover"></img>
                </a>
                <Navbar href="#" FlyoutContent={DropContentHome}>
                  HOME
                  <ChevronDownIcon className="h-4 w-4 transform ml-2 float-right mt-1" />
                </Navbar>
                <Navbar href="#" FlyoutContent={DropContentPage}>
                  PAGE
                  <ChevronDownIcon className="h-4 w-4 transform ml-2 float-right mt-1" />
                </Navbar>
                <Navbar href="#" FlyoutContent={DropContentCourses}>
                  OUR COURSES
                  <ChevronDownIcon className="h-4 w-4 transform ml-2 float-right mt-1" />
                </Navbar>
                <Navbar href="#" FlyoutContent={DropContentBlog}>
                  BLOG
                  <ChevronDownIcon className="h-4 w-4 transform ml-2 float-right mt-1" />
                </Navbar>
                <Navbar href="#" FlyoutContent={DropContentDashBoard}>
                  DASHBOARD
                  <ChevronDownIcon className="h-4 w-4 transform ml-2 float-right mt-1" />
                </Navbar>
              </div>
              <div className="flex mt-2">
                <a href="#" className="mx-2">
                  Fb
                </a>
                <a href="#" className="mx-2">
                  Gg
                </a>
                <a href="#" className="mx-2">
                  Ln
                </a>
                <SearchHeader />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
