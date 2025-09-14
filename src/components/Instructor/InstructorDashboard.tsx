import React, { useMemo } from "react";
import { Button, Card, CardContent, Typography, styled } from "@mui/material";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

import IconLearningHours from "../../assets/IconLearningHours";
import IconCourse from "../../assets/IconCourse";
import BreadCrumbsDashboard from "../BreadCrumbsDashboard";
import IconSale from "../../assets/IconSale";
import IconEnroll from "../../assets/IconEnroll";
import { useDispatch } from "react-redux";
import { setSelectedIndex } from "@/features/slices/selectedIndex";

import {
  useGetCoursesPerYearQuery,
  useGetRevenuePerYearQuery,
  useGetTopCourseQuery,
  useGetTotalCoursesQuery,
  useGetTotalRevenueQuery,
  useGetTotalUsersBuyQuery,
} from "@/apis/InstructorDashboardApi";
import Loader from "../Loader";

// ---- helpers
const CreateButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#d8a409"),
  backgroundColor: "#d8a409",
  "&:hover": {
    color: theme.palette.getContrastText("#4d0a91"),
    backgroundColor: "#4d0a91",
  },
}));

const formatCurrency = (v: unknown) =>
  typeof v === "number"
    ? `${v.toLocaleString("en-US")} đ`
    : `${Number(v ?? 0).toLocaleString("en-US")} đ`;

const InstructorDashboard: React.FC = () => {
  const dispatch = useDispatch();

  // RTK Query hooks
  const { data: totalUsersBuy, isLoading: isLoadingTotalUsersBuy } =
    useGetTotalUsersBuyQuery();
  const { data: totalRevenue, isLoading: isLoadingTotalRevenue } =
    useGetTotalRevenueQuery();
  const { data: totalCourses, isLoading: isLoadingTotalCourses } =
    useGetTotalCoursesQuery();
  const { data: topCourse, isLoading: isLoadingTopCourse } =
    useGetTopCourseQuery();
  const { data: revenuePerYear, isLoading: isLoadingRevenuePerYear } =
    useGetRevenuePerYearQuery();
  const { data: coursesPerYear, isLoading: isLoadingCoursesPerYear } =
    useGetCoursesPerYearQuery();

  // short hands to payloads with safe defaults
  const revenueMap =
    (revenuePerYear?.payload as Record<string, number> | undefined) ?? {};
  const coursesMap =
    (coursesPerYear?.payload as Record<string, number> | undefined) ?? {};

  // Build chart data only when inputs change
  const courseData = useMemo(
    () => ({
      labels: Object.keys(revenueMap),
      datasets: [
        {
          label: "Total Revenue",
          data: Object.values(revenueMap).map(Number),
          fill: false,
          // colors left to Chart.js defaults; customize if you want
        },
      ],
    }),
    [revenueMap]
  );

  const hoursData = useMemo(
    () => ({
      labels: Object.keys(coursesMap),
      datasets: [
        {
          label: "Tổng số khóa học",
          data: Object.values(coursesMap).map(Number),
          fill: false,
        },
      ],
    }),
    [coursesMap]
  );

  const chartOptions = useMemo(
    () => ({
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      // maintainAspectRatio: false, // uncomment if you want responsive height
    }),
    []
  );

  // show loader while any piece is fetching
  if (
    isLoadingTotalUsersBuy ||
    isLoadingTotalRevenue ||
    isLoadingTotalCourses ||
    isLoadingTopCourse ||
    isLoadingRevenuePerYear ||
    isLoadingCoursesPerYear
  ) {
    return <Loader />;
  }

  return (
    <div className="mt-5">
      <BreadCrumbsDashboard name="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-4">
        {/* Total Sales */}
        <Card>
          <CardContent>
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                <Typography className="!font-bold">Total Sales</Typography>
                <Typography variant="h5" className="!font-bold">
                  {formatCurrency(totalRevenue?.payload)}
                </Typography>
              </div>
              <div className="w-20 h-20 my-auto mx-auto">
                <IconSale />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Enroll */}
        <Card>
          <CardContent>
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                <Typography className="!font-bold">Total Enroll</Typography>
                <Typography variant="h5" className="!font-bold">
                  {Number(totalUsersBuy?.payload ?? 0)}
                </Typography>
              </div>
              <div className="w-20 h-20 my-auto mx-auto">
                <IconEnroll />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Courses */}
        <Card>
          <CardContent>
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                <Typography className="!font-bold">Total Courses</Typography>
                <Typography variant="h5" className="!font-bold">
                  {Number(totalCourses?.payload ?? 0)}
                </Typography>
              </div>
              <div className="w-20 h-20 my-auto mx-auto">
                <IconCourse />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Course */}
        <Card>
          <CardContent>
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                <Typography className="!font-bold">Top Course</Typography>
                <Typography variant="h5" className="!font-bold">
                  ID: {topCourse?.payload?.courseId ?? "No Course"}
                </Typography>
              </div>
              <div className="w-20 h-20 my-auto mx-auto">
                <IconLearningHours />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue chart */}
        <Card className="md:col-span-2">
          <CardContent>
            <Typography className="!font-bold">Total Revenue Overview</Typography>
            <Line data={courseData} options={chartOptions} />
          </CardContent>
        </Card>

        {/* Courses chart */}
        <Card className="md:col-span-2">
          <CardContent>
            <Typography className="!font-bold">Total Courses Overview</Typography>
            <Line data={hoursData} options={chartOptions} />
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <Card className="mt-2">
        <CardContent>
          <div className="flex justify-between">
            <div className="flex my-auto gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 my-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              <Typography variant="h5" className="my-auto">
                Jump Into Course Creation
              </Typography>
            </div>
            <CreateButton onClick={() => dispatch(setSelectedIndex(2))}>
              Create Your Course
            </CreateButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorDashboard;
