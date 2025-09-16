import { useSelector } from "react-redux";
import { student_sidebar } from "@/constants/sidebar";

const StudentDashboardpage = () => {
  const selectedIndex = useSelector((state: any) => state.selectedIndex.value);

  return (
    <div>
      {student_sidebar.map((item, index) => {
        return selectedIndex === index && item.ele;
      })}
    </div>
  );
};

export default StudentDashboardpage;
