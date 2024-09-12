import {
  Breadcrumbs,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import React from "react";
import IconLearningHours from "../../assets/IconLearningHours";
import IconCourse from "../../assets/IconCourse";
import BreadCrumbsDashboard from "../BreadCrumbsDashboard";
import { useGetStudentStatsQuery } from "@/apis/StudentDashboardApi";
import Loader from "../Loader";

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
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="mt-5">
      <BreadCrumbsDashboard name={"Dashboard"} />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
        <Card>
          <CardContent>
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                <Typography variant="medium" className="font-bold">
                  Total Purchased Courses
                </Typography>
                <Typography variant="h5" className="font-bold">
                  {studentStat.payload.purchaseCourse}
                </Typography>
              </div>
              <div className="w-32 h-32">
                <IconCourse />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                <Typography variant="medium" className="font-bold">
                  Total Finished Courses
                </Typography>
                <Typography variant="h5" className="font-bold">
                  {studentStat.payload.finishCourse}
                </Typography>
              </div>
              <div className="w-32 h-32">
                <IconLearningHours />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="medium" className="font-bold">
              Your learning progress
            </Typography>
            <Line data={courseData} options={options} />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="medium" className="font-bold">
              Learning hours overview
            </Typography>
            <Line data={hoursData} options={options} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
