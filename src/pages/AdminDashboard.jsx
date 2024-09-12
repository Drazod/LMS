import { Link } from "react-router-dom";

import { House } from "@mui/icons-material";
import ReportCard from "@/components/admin_dashboard/ReportCard";

import { LineChart } from "@mui/x-charts/LineChart";
import { chartsGridClasses } from "@mui/x-charts";
import { areaElementClasses } from "@mui/x-charts";

const monthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dataset = [
  {
    view: 200,
    month: 1,
  },
  {
    view: 120,
    month: 2,
  },
  {
    view: 230,
    month: 3,
  },
  {
    view: 360,
    month: 4,
  },
  {
    view: 210,
    month: 5,
  },
  {
    view: 250,
    month: 6,
  },
];

const chartSetting = {
  grid: {
    horizontal: true,
  },
  slotProps:{legend: { 'hidden': true }},
  sx: {
    [`& .${chartsGridClasses.line}`]: {
      strokeDasharray: "5 3",
      strokeWidth: 2,
    },
    [`& .${areaElementClasses.root}`]: {
      opacity: 0.1,
      fill: "#6c757d",
    },
  },
};

const AdminDashboard = () => {
  return (
    <div className="w-full flex flex-col gap-7">
      <div className="w-full flex flex-row gap-3 pb-1 divide-x divide-solid divide-gray-300 border-b border-solid border-gray-300">
        <div className="text-xl font-medium">Dashboard</div>
        <div className="text-sm text-gray-500 flex flex-wrap items-center gap-1 px-3 not-last-child:after:content-['>'] not-last-child:after:text-black">
          <Link to="/admin" className="flex flex-row items-center gap-1">
            <House sx={{ fontSize: 14 }} className="text-black" />
            <div>Home</div>
          </Link>
          <div>Dashboard</div>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(max(45%,200px),1fr))] gap-3 text-white">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
          <ReportCard
            className="bg-gradient-to-r from-purple-900 to-purple-700"
            title="Total Frofit"
            description="All Customs Value"
            number_prefix={"$"}
            number={18}
            number_postfix={"M"}
            percent={78}
          />
          <ReportCard
            className="bg-gradient-to-l from-deep-purple-700 to-light-blue-700"
            title="New Feedbacks"
            description="Customer Review"
            number={120}
            percent={88}
          />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
          <ReportCard
            className="bg-gradient-to-l from-red-600 to-red-300"
            title="New Orders"
            description="Fresh Order Amount"
            number={720}
            percent={65}
          />
          <ReportCard
            className="bg-gradient-to-l from-blue-800 to-light-blue-500"
            title="New Users"
            description="Joined New User"
            number={350}
            percent={90}
          />
        </div>
      </div>
      <div className="flex flex-col w-full shadow-lg py-4 [&>*]:px-4 aspect-video">
        <div className="text-lg font-semibold pl-4 pb-2 border-b">
          Your Profile Views
        </div>
        <LineChart
          dataset={dataset}
          xAxis={[
            {
              fill: "#e02f5e",
              stroke: "#6f42c1",
              scaleType: "point",
              dataKey: "month",
              valueFormatter: (month, context) => monthList[month - 1],
            },
          ]}
          series={[
            {
              dataKey: "view",
              label: "Views",
              color: "#6f42c1",
              area: true,
            },
          ]}
          {...chartSetting}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
