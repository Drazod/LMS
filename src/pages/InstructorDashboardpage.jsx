import React from "react";

import InstructorDashboard from "../components/Instructor/InstructorDashboard";
import InstructorCourse from "../components/Instructor/InstructorCourse";
import UserProfile from "../components/UserProfile";
import { useSelector } from "react-redux";
import CreateCourse from "@/pages/CreateCourse";
import { instructor_sidebar } from "@/constants/sidebar";
const InstructorDashboardpage = () => {
  const selectedIndex = useSelector((state) => state.selectedIndex.value);
  return (
    <>
      <div>
        {instructor_sidebar.map((item, index) => {
          return selectedIndex === index && item.ele;
        })}
      </div>
    </>
  );
};

export default InstructorDashboardpage;
