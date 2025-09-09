import { Link } from "react-router-dom";

const DashboardSideBarItem = ({ icon, text, path }) => {
  return (
    <Link to={path} className="flex flex-row items-center gap-4 p-4 hover:bg-gray-200">
      {icon}
      <div className="text-base">{text}</div>
    </Link>
  );
};

export default DashboardSideBarItem;
