import DashboardMenuButton from "./DashboardMenuButton";
import logo_white from "../../assets/logo-white.png";
import DashboardDropDownMenu from "./DashboardDropDownMenu";

import test_img from "../../assets/test_profile_img/pic3.jpg";
import { Link, useNavigate } from "react-router-dom";
import { getUserDataFromLocal } from "@/utils/getUserDataFromLocal";
import { removeUserDataFromLocal } from "@/utils/removeUserDataFromLocal";
import { useDispatch } from "react-redux";
import { setSelectedIndex } from "@/features/slices/selectedIndex";

const DashboardNavBar = ({ menuToggle, handleMenuToggle }) => {
  const { avatar, role } = getUserDataFromLocal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    removeUserDataFromLocal();
    navigate("/");
  };

  const handleProfileNav = (role) => {
    dispatch(setSelectedIndex(role == "S" ? 2 : 3));
  };

  console.log(avatar);

  return (
    <div className="w-full flex flex-row min-h-15 gap-4 bg-gradient-to-r from-purple-800 to-indigo-800">
      <DashboardMenuButton
        className="text-white bg-purple-700 text-3xl w-15 h-15"
        open={menuToggle}
        onClick={handleMenuToggle}
      />
      {/* <Link to="/" className="flex items-center justify-center">
        <img src={logo_white} className="w-40"></img>
      </Link> */}
      <div className="flex flex-row mx-4 gap-8 text-white text-sm font-bold">
        <Link to="/" className="text-white flex-grow flex items-center">
          HOME
        </Link>
      </div>
      <div className="flex flex-row ml-auto text-white divide-x divide-solid divide-purple-400 divide-opacity-50">
        <div></div>
        <DashboardDropDownMenu
          buttonContent={
            <div className="px-4">
              <img
                src={avatar}
                width={32}
                height={32}
                className="rounded-full bg-white"
              ></img>
            </div>
          }
        >
          <div className="flex flex-col bg-white shadow-md text-sm [&>*]:p-3 [&>*:hover]:bg-gray-200">
            {role !== "A" && (
              <button
                onClick={() => {
                  handleProfileNav(role);
                }}
              >
                My profile
              </button>
            )}
            <button onClick={handleLogout}>Logout</button>
          </div>
        </DashboardDropDownMenu>
      </div>
    </div>
  );
};

export default DashboardNavBar;
