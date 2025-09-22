import React, { useMemo } from "react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
  Line,
  LineChart
} from "recharts";

import IconLearningHours from "@/assets/IconLearningHours";
import IconCourse from "@/assets/IconCourse";
import IconSale from "@/assets/IconSale";
import IconEnroll from "@/assets/IconEnroll";

// import { useDispatch } from "react-redux";

import {
  useGetCoursesPerYearQuery,
  useGetRevenuePerYearQuery,
  useGetTopCourseQuery,
  useGetTotalCoursesQuery,
  useGetTotalRevenueQuery,
  useGetTotalUsersBuyQuery,
} from "@/apis/InstructorDashboardApi";
import Loader from "../Loader";

const formatCurrency = (v: unknown) =>
  typeof v === "number"
    ? `${v.toLocaleString("en-US")} đ`
    : `${Number(v ?? 0).toLocaleString("en-US")} đ`;

const chartConfig = {
  total_course: {
    label: "Total courses",
    color: "var(--chart-1)",
  },
  total_revenue: {
    label: "Total revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const InstructorDashboard: React.FC = () => {
  // const dispatch = useDispatch();

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

  const revenueChartData = useMemo(
    () =>
      Object.entries(revenueMap).map(([year, total_revenue]) => ({
        year,
        total_revenue,
      })),
    [revenueMap]
  );

  const courseChartData = useMemo(
    () =>
      Object.entries(coursesMap).map(([year, total_course]) => ({
        year,
        total_course,
      })),
    [coursesMap]
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
      {/* <BreadCrumbsDashboard name="Dashboard" /> */}

      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-4">
        {/* Total Sales */}
        <Card>
          <CardHeader>
            Total Sales
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <p className="font-bold text-6xl">
                {formatCurrency(totalRevenue?.payload)}
              </p>
              <div className="w-32 h-auto">
                <IconSale />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Enroll */}
        <Card>
          <CardHeader>
            Total Enrollments
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <p className="font-bold text-6xl">
                {Number(totalUsersBuy?.payload ?? 0)}
              </p>
              <div className="w-32 h-auto">
                <IconEnroll />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Courses */}
        <Card>
          <CardHeader>
            Total Courses
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <p className="font-bold text-6xl">
                {Number(totalCourses?.payload ?? 0)}
              </p>
              <div className="w-32 h-auto">
                <IconCourse />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Course */}
        <Card>
          <CardHeader>
            Top Course
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <p className="font-bold text-6xl">
                ID: {topCourse?.payload?.courseId ?? "No Course"}
              </p>
              <div className="w-32 h-auto">
                <IconLearningHours />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue chart */}
        <Card className="md:col-span-2">
          <CardHeader>
            Total Revenue Overview
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={revenueChartData}
                margin={{
                  left: -20,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickCount={3}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  dataKey="total_revenue"
                  type="linear"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--chart-2)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Line>
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Courses chart */}
        <Card className="md:col-span-2">
          <CardHeader>
            Total Courses Overview
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={courseChartData}
                margin={{
                  left: -20,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickCount={3}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  dataKey="total_course"
                  type="linear"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--chart-1)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Line>
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstructorDashboard;
