import DashboardLayout from "./DashboardLayout";
import {HomeOutlined, ImportContactsOutlined} from "@mui/icons-material"

const AdminDashboardLayout = () => {
  return <DashboardLayout sideBarData={[
    {
      icon: <HomeOutlined />,
      text: "Dashboard",
      path: "dashboard",
    },
    {
      icon: <ImportContactsOutlined />,
      text: "Course",
      path: "course",
    },
  ]} />;
};

export default AdminDashboardLayout;