import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import { instructor_sidebar, student_sidebar } from "../constants/sidebar";
import DashboardNavBar from "@/components/admin_dashboard/DashboardNavBar";
const StudentAndInstructorLayout = () => {
  const [menuToggle, setMenuToggle] = useState(true);

  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };
  const path = useLocation();
  return (
    <div className="w-full h-screen flex flex-col">
      <DashboardNavBar
        menuToggle={menuToggle}
        handleMenuToggle={handleMenuToggle}
      />
      <div className="flex flex-col lg:flex-row flex-grow overflow-auto w-full">
        <div className="w-full lg:w-fit">
          <DashboardSidebar
            open={menuToggle}
            onClose={handleMenuToggle}
            sidebar={
              path.pathname === "/dashboard/student"
                ? student_sidebar
                : path.pathname === "/dashboard/instructor"
                ? instructor_sidebar
                : ""
            }
          />
        </div>
        <div className="w-full h-full p-9 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default StudentAndInstructorLayout;
