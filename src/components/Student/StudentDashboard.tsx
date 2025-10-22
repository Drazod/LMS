import IconLearningHours from "../../assets/IconLearningHours";
import IconCourse from "../../assets/IconCourse";
import { useGetStudentStatsQuery } from "@/apis/StudentDashboardApi";
import Loader from "../common/Loader";

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

  // Extract data from new API response structure
  const stats = studentStat?.data;
  
  if (!stats) return <div>No data available</div>;

  // Generate chart data based on available stats
  const chartData = [
    { month: "January", completed: Math.floor(stats.completedCourses * 0.8), inProgress: Math.floor(stats.inProgressCourses * 0.7) },
    { month: "February", completed: Math.floor(stats.completedCourses * 0.85), inProgress: Math.floor(stats.inProgressCourses * 0.8) },
    { month: "March", completed: Math.floor(stats.completedCourses * 0.9), inProgress: Math.floor(stats.inProgressCourses * 0.85) },
    { month: "April", completed: Math.floor(stats.completedCourses * 0.95), inProgress: Math.floor(stats.inProgressCourses * 0.9) },
    { month: "May", completed: stats.completedCourses, inProgress: Math.floor(stats.inProgressCourses * 0.95) },
    { month: "June", completed: stats.completedCourses, inProgress: stats.inProgressCourses },
  ];

  const chartConfig = {
    completed: {
      label: "Completed Courses",
      color: "var(--chart-1)",
    },
    inProgress: {
      label: "In Progress Courses", 
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <div>
      {/* <BreadCrumbsDashboard name={"Dashboard"} /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            Total Enrollments
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <p className="font-bold text-6xl">
                {stats.totalEnrollments}
              </p>
              <div className="w-32 h-auto">
                <IconCourse />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            Completed Courses
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <p className="font-bold text-6xl">
                {stats.completedCourses}
              </p>
              <div className="w-32 h-auto">
                <IconLearningHours />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            In Progress Courses
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <p className="font-bold text-6xl">
                {stats.inProgressCourses}
              </p>
              <div className="w-32 h-auto">
                <IconCourse />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            Total Hours Learned
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-6xl">
                  {stats.totalHoursLearned}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Average Progress: {stats.averageProgress}%
                </p>
              </div>
              <div className="w-32 h-auto">
                <IconLearningHours />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            Certificates & Streaks
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Certificates Earned:</span>
                <span className="font-bold text-2xl">{stats.certificatesEarned}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Current Streak:</span>
                <span className="font-bold text-2xl">{stats.currentStreak} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Longest Streak:</span>
                <span className="font-bold text-2xl">{stats.longestStreak} days</span>
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
                  <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-completed)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-completed)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillInProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-inProgress)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-inProgress)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="inProgress"
                  type="natural"
                  fill="url(#fillInProgress)"
                  fillOpacity={0.4}
                  stroke="var(--color-inProgress)"
                  stackId="a"
                />
                <Area
                  dataKey="completed"
                  type="natural"
                  fill="url(#fillCompleted)"
                  fillOpacity={0.4}
                  stroke="var(--color-completed)"
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
                  dataKey="completed"
                  type="linear"
                  stroke="var(--color-completed)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-completed)",
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
                  dataKey="inProgress"
                  type="linear"
                  stroke="var(--color-inProgress)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-inProgress)",
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
