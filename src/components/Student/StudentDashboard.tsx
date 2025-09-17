import IconLearningHours from "../../assets/IconLearningHours";
import IconCourse from "../../assets/IconCourse";
import BreadCrumbsDashboard from "../BreadCrumbsDashboard";
import { useGetStudentStatsQuery } from "@/apis/StudentDashboardApi";
import Loader from "../Loader";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
  Line,
  LineChart
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const StudentDashboard = () => {
  const { data: studentStat, isLoading, isError } = useGetStudentStatsQuery();
  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;

  const courseData = {
    labels: Object.keys(studentStat.payload.purchaseCourse5),
    datasets: [
      {
        label: "Total courses",
        data: Object.values(studentStat.payload.purchaseCourse5),
        fill: false,
        backgroundColor: "rgb(50, 100, 100)",
        borderColor: "rgba(50, 100, 100, 1)",
      },
    ],
  };

  const hoursData = {
    labels: Object.keys(studentStat.payload.finishCourse5),
    datasets: [
      {
        label: "Total hours",
        data: Object.values(studentStat.payload.finishCourse5).map(
          (item) => item * 3
        ),
        fill: false,
        backgroundColor: "rgb(50, 100, 100)",
        borderColor: "rgba(50, 100, 100, 1)",
      },
    ],
  };

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
    mobile: {
      label: "Mobile",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {/* <BreadCrumbsDashboard name={"Dashboard"} /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            Total Purchased Courses
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <p className="font-bold text-6xl">
                {studentStat.payload.purchaseCourse}
              </p>
              <div className="w-32 h-auto">
                <IconCourse />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            Total Finished Courses
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <p className="font-bold text-6xl">
                {studentStat.payload.finishCourse}
              </p>
              <div className="w-32 h-auto">
                <IconLearningHours />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            Your Learning Progress
          </CardHeader>
          <CardContent>
            {/* <Line data={hoursData} options={options} /> */}
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: -20,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickCount={3}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-mobile)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-mobile)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="url(#fillMobile)"
                  fillOpacity={0.4}
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="url(#fillDesktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            Learning Hours Overview
          </CardHeader>
          <CardContent>
            {/* <Line data={hoursData} options={options} /> */}
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: -20,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
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
                  dataKey="desktop"
                  type="linear"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-desktop)",
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
                <Line
                  dataKey="mobile"
                  type="linear"
                  stroke="var(--color-mobile)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-mobile)",
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

export default StudentDashboard;
