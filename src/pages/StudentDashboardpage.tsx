import React from "react";

import StudentDashboard from "../components/Student/StudentDashboard";
import StudentCourse from "../components/Student/StudentCourse";
import UserProfile from "../components/UserProfile";
import { useSelector } from "react-redux";
import { student_sidebar } from "@/constants/sidebar";

const StudentDashboardpage = () => {
  const selectedIndex = useSelector((state) => state.selectedIndex.value);
  const [width, setWidth] = React.useState(259.159);
  return (
    <>
      <div>
        {student_sidebar.map((item, index) => {
          return selectedIndex === index && item.ele;
        })}
      </div>
    </>
  );
};

export default StudentDashboardpage;
