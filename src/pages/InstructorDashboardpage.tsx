import { useSelector } from "react-redux";
import { instructor_sidebar } from "@/constants/sidebar";

const InstructorDashboardpage = () => {
  const selectedIndex = useSelector((state: { selectedIndex: { value: number } }) => state.selectedIndex.value);

  return (
    <div>
      {instructor_sidebar.map((item, index) => {
        return selectedIndex === index && item.ele;
      })}
    </div>
  );
};

export default InstructorDashboardpage;
