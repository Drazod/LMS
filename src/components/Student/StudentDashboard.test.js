// StudentDashboard.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StudentDashboard from "./StudentDashboard";
import { useGetStudentStatsQuery } from "@/apis/StudentDashboardApi";
import Loader from "../Loader";
import IconCourse from "../../assets/IconCourse";
import IconLearningHours from "../../assets/IconLearningHours";
import BreadCrumbsDashboard from "../common/BreadcrumbsDashboard";

// Mock dependencies
jest.mock("@/apis/StudentDashboardApi");
jest.mock("../Loader", () => () => <div>Loading...</div>);
jest.mock("../../assets/IconCourse", () => () => <div>IconCourse</div>);
jest.mock("../../assets/IconLearningHours", () => () => (
  <div>IconLearningHours</div>
));
jest.mock("../common/BreadcrumbsDashboard", () => () => (
  <div>BreadCrumbsDashboard</div>
));

describe("StudentDashboard", () => {
  it("renders Loader when data is loading", () => {
    useGetStudentStatsQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    render(<StudentDashboard />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error message when there is an error", () => {
    useGetStudentStatsQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });
    render(<StudentDashboard />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("renders dashboard correctly with data", () => {
    const mockData = {
      payload: {
        purchaseCourse: 5,
        finishCourse: 3,
        purchaseCourse5: { Jan: 1, Feb: 2, Mar: 3 },
        finishCourse5: { Jan: 1, Feb: 2, Mar: 3 },
      },
    };
    useGetStudentStatsQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });
    render(<StudentDashboard />);

    expect(screen.getByText("Total Purchased Courses")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Total Finished Courses")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Your learning progress")).toBeInTheDocument();
    expect(screen.getByText("Learning hours overview")).toBeInTheDocument();
  });

  it("renders charts with correct data", () => {
    const mockData = {
      payload: {
        purchaseCourse: 5,
        finishCourse: 3,
        purchaseCourse5: { Jan: 1, Feb: 2, Mar: 3 },
        finishCourse5: { Jan: 1, Feb: 2, Mar: 3 },
      },
    };
    useGetStudentStatsQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });
    render(<StudentDashboard />);

    // Check if the chart labels and data are correct
    expect(screen.getByText("Total courses")).toBeInTheDocument();
    expect(screen.getByText("Total hours")).toBeInTheDocument();
  });
});
