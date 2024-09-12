import React from "react";
import "@testing-library/jest-dom";
import { act, fireEvent, screen } from "@testing-library/react";
import { render } from "../../utils/test-util";
import {
  useGetStudentQuery,
  useUpdateStudentMutation,
  useUpdateStudentPasswordMutation,
} from "@/apis/StudentDashboardApi";
import { BrowserRouter as Route } from "react-router-dom";
import StudentProfile from "./StudentProfile";
import * as StudentDashboardApi from "@/apis/StudentDashboardApi";
const mockStudentData = {
  payload: {
    studentId: 1,
    name: "Alexander",
    email: "abc@gmail.com",
    firstName: "Alex",
    lastName: "xander",
    phoneNumber: "0966319599",
    avtUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTemIam6wLggygOiIyEAp6CNGqNK5ac5-UnVpWo5qhdQX6dxMvKmq2ZV9fk4tolB9uzCac&usqp=CAU",
    publicAvtId: "string1",
    userAddress: "string2",
    userCity: "string3",
    userCountry: "string4",
    userPostalCode: "string5",
  },
};
jest.mock("@/apis/StudentDashboardApi", () => {
  const originalModule = jest.requireActual("@/apis/StudentDashboardApi");
  return {
    __esModule: true,
    ...originalModule,
    useGetStudentQuery: jest.fn(),
  };
});

describe("StudentProfile Page", () => {
  test("StudentProfile page", () => {
    expect(StudentProfile).toBeDefined();
  });
});
describe("StudentProfile API", () => {
  it("API Pending Stage", () => {
    StudentDashboardApi.useGetStudentQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <Route>
        <StudentProfile />
      </Route>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
  test("API Reject Stage", () => {
    StudentDashboardApi.useGetStudentQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <Route>
        <StudentProfile />
      </Route>
    );

    expect(screen.getByText("Error")).toBeInTheDocument();
  });
  test("API Fulfilled Stage", async () => {
    StudentDashboardApi.useGetStudentQuery.mockReturnValue({
      data: mockStudentData,
      isLoading: false,
      isError: false,
    });

    render(
      <Route>
        <StudentProfile />
      </Route>
    );
    expect(
      screen.getByDisplayValue(mockStudentData.payload.email)
    ).toBeInTheDocument();
  });
});

describe("StudentProfile Component", () => {
  beforeEach(() => {
    StudentDashboardApi.useGetStudentQuery.mockReturnValue({
      data: mockStudentData,
    });
    render(
      <Route>
        <StudentProfile />
      </Route>
    );
  });

  test("StudentProfile Input", () => {
    expect(
      screen.getByDisplayValue(mockStudentData.payload.email)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockStudentData.payload.phoneNumber)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockStudentData.payload.firstName)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockStudentData.payload.lastName)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockStudentData.payload.userAddress)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockStudentData.payload.userCity)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockStudentData.payload.userCountry)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockStudentData.payload.userPostalCode)
    ).toBeInTheDocument();
  });

  test("StudentProfile Update Input", () => {
    fireEvent.change(
      screen.getByDisplayValue(mockStudentData.payload.firstName),
      { target: { value: "Jane" } }
    );
    fireEvent.change(
      screen.getByDisplayValue(mockStudentData.payload.lastName),
      {
        target: { value: "Smith" },
      }
    );
    fireEvent.change(screen.getByDisplayValue(mockStudentData.payload.email), {
      target: { value: "John" },
    });
    fireEvent.change(
      screen.getByDisplayValue(mockStudentData.payload.phoneNumber),
      { target: { value: "1234567890" } }
    );

    fireEvent.change(
      screen.getByDisplayValue(mockStudentData.payload.userAddress),
      { target: { value: "123 Main St" } }
    );

    fireEvent.change(
      screen.getByDisplayValue(mockStudentData.payload.userCity),
      { target: { value: "Anytown" } }
    );

    fireEvent.change(
      screen.getByDisplayValue(mockStudentData.payload.userCountry),
      { target: { value: "USA" } }
    );

    fireEvent.change(
      screen.getByDisplayValue(mockStudentData.payload.userPostalCode),
      { target: { value: "12345" } }
    );

    expect(screen.getByDisplayValue("Jane")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Smith")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockStudentData.payload.email)
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123 Main St")).toBeInTheDocument();
  });
});
