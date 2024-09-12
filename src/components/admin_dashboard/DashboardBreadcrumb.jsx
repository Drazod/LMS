import { House } from "@mui/icons-material";
import { Link } from "react-router-dom";

const DashboardBreadcrumb = ({ homePath, name }) => {
  return (
    <div className="w-full flex flex-row gap-3 pb-1 divide-x divide-solid divide-gray-300 border-b border-solid border-gray-300">
      <div className="text-xl font-medium">Courses</div>
      <div className="text-sm text-gray-500 flex flex-wrap items-center gap-1 px-3 not-last-child:after:content-['>'] not-last-child:after:text-black">
        <Link to={homePath} className="flex flex-row items-center gap-1">
          <House sx={{ fontSize: 14 }} className="text-black" />
          <div>Home</div>
        </Link>
        <div>{name}</div>
      </div>
    </div>
  );
};

export default DashboardBreadcrumb;
