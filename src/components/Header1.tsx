import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  QuestionIcon,
  EnvelopeIcon,
  FacebookLogoIcon,
  GoogleLogoIcon,
  LinkedinLogoIcon,
  ShoppingCartIcon,
} from "@phosphor-icons/react/dist/ssr";

import SelectLanguage from "./Home_Component/DropLang1";
import { SearchHeader } from "@/components/Home_Component/SearchHeader";

import Logo from "@/assets/logo-white.png";

export const Header = () => {
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
          ? "fixed w-full bg-background z-30 text-sm sm:text-base text-foreground transition-colors duration-150 border-b-2 border-foreground/10"
          : "fixed w-full bg-transparent z-30 text-sm sm:text-base text-white transition-colors duration-150"
      }
    >
      <div className={color ? "hidden" : "container mt-4 rounded-2xl sm:flex gap-8 mx-auto px-1 py-1 backdrop-blur-3xl bg-background/25 text-center"}>
        <div className="sm:flex gap-0 sm:grow">
          <Button variant="ghost" className="flex items-center gap-1">
            <QuestionIcon weight="duotone" className="!size-6" />
            <p>Ask a Question</p>
          </Button>
          <Button variant="ghost" className="flex items-center gap-1">
            <EnvelopeIcon weight="duotone" className="!size-6" />
            <p>Contact Support</p>
          </Button>
        </div>
        <div className="sm:flex items-center sm:text-right">
          <SelectLanguage />
          {name ? (
            <div>
              <div className="inline-block mr-4">
                <span>Hello, {name}</span>
              </div>
              <div className="inline-block">
                <button className="text-white" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center">
              <Button variant="ghost" className="flex items-center gap-1">
                Sign In
              </Button>
              <Button variant="ghost" className="flex items-center gap-1">
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto px-8 h-20 flex items-center justify-between ">
        <div className="flex items-center gap-6">
          <img src={Logo} className={`${color ? "invert" : ""} w-28 sm:w-fit object-cover`}></img>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className=
                  {
                    color ? `group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent`
                      : `group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent text-background px-4 py-2 text-normal font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent`
                  }
                >
                  <Link to="/">HOME</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className=
                  {
                    color ? `group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent`
                      : `group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent text-background px-4 py-2 text-normal font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent`
                  }
                >
                  <Link to="/courses">COURSES</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className=
                  {
                    color ? `group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent`
                      : `group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent text-background px-4 py-2 text-normal font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent`
                  }
                >
                  <Link to="/dashboard">DASHBOARD</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <SearchHeader color={color} />
          <Button variant="ghost" size="icon" className="size-8" asChild>
            <a href="/cart">
              <ShoppingCartIcon weight="duotone" className="!size-7" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
