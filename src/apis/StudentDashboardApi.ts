import { API_URL, API_ROUTES } from "@/configs/ApiConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + API_ROUTES.student,
  }),
  tagTypes: ["student", "student-profile"],
  endpoints: (builder) => ({
    getStudentStats: builder.query({
      query: () => ({
        url: `${localStorage.getItem("userId")}/statistic`,
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["student"],
    }),
    getStudentCourses: builder.query({
      query: () => ({
        url: `${localStorage.getItem("userId")}/courses`,
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["student"],
    }),
    getStudent: builder.query({
      query: () => ({
        url: `${localStorage.getItem("userId")}`,
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["student-profile"],
    }),
    updateStudentProfile: builder.mutation({
      query: ({ name,
        firstName,
        lastName,
        phoneNumber,
        publicAvtId,
        avt }) => ({
        url: `${localStorage.getItem("userId")}`,
        method: "PUT",
        body: {  name,
          firstName,
          lastName,
          phoneNumber,
          publicAvtId,
          avt },
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["student-profile"],
    }),
    updateStudentAddress: builder.mutation({
      query: ({
        firstName,
        lastName,
        phoneNumber,
        userAddress,
        userCity,
        userCountry,
        userPostalCode,
      }) => ({
        url: `${localStorage.getItem("userId")}/update-address`,
        method: "POST",
        body: {
          firstName,
          lastName,
          phoneNumber,
          userAddress,
          userCity,
          userCountry,
          userPostalCode,
        },
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["student-profile"],
    }),

    updateStudentPassword: builder.mutation({
      query: ({ name, email, password, firstName, lastName, phoneNumber }) => ({
        url: `${localStorage.getItem("userId")}/changePassword`,
        method: "PUT",
        body: { name, email, password, firstName, lastName, phoneNumber },
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["student-profile"],
    }),
    // getStudentCourse: builder.query({
    //   query: (id) => ({
    //     url: `${localStorage.getItem("userId")}/courses/${id}`,
    //     headers: {
    //       "Content-Type": "application/json",
    //       //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   }),
    //   providesTags: ["student"],
    // }),
  }),
});

export const {
  useGetStudentStatsQuery,
  useGetStudentCoursesQuery,
  useGetStudentQuery,
  useUpdateStudentProfileMutation,
  useUpdateStudentAddressMutation,
  useUpdateStudentPasswordMutation,
} = studentApi;
