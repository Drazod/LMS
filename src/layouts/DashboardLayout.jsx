import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavBar from "../components/admin_dashboard/DashboardNavBar";
import DashboardSideBar from "../components/admin_dashboard/DashboardSideBar";
import DashboardSideBarItem from "../components/admin_dashboard/DashboardSideBarItem";

////sideBarData for DashboardLayout
// sideBarData = [
//   {
//     icon: , // your icon
//     text: , // your text
//     path: , // path to link
//   }
// ]

const DashboardLayout = ({ sideBarData }) => {
  const [menuToggle, setMenuToggle] = useState(window.innerWidth > 768);

  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <DashboardNavBar
        menuToggle={menuToggle}
        handleMenuToggle={handleMenuToggle}
      />
      <div className="flex flex-col lg:flex-row flex-grow overflow-auto">
        <DashboardSideBar open={menuToggle} onClose={handleMenuToggle}>
          <div className="flex flex-col">
            {sideBarData.map((data, index) => (
              <DashboardSideBarItem
                key={index}
                icon={data["icon"]}
                text={data["text"]}
                path={data["path"]}
              />
            ))}
          </div>
        </DashboardSideBar>
        <div className="w-full h-full p-9 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
