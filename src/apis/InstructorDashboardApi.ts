import { API_ROUTES, API_URL } from "@/configs/ApiConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const instuctorApi = createApi({
  reducerPath: "instuctorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["instuctor", "instuctor-profile"],
  endpoints: (builder) => ({
    getInstructorCourses: builder.query({
      query: ({ page, size }) => ({
        url:
          API_ROUTES.instructor +
          `${localStorage.getItem("userId")}/course?page=${page}&size=${size}`,
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["instuctor"],
    }),
    getInstructor: builder.query({
      query: () => ({
        url: API_ROUTES.instructor + `id/${localStorage.getItem("userId")}`,
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["instuctor-profile"],
    }),
    updateInstructorProfile: builder.mutation({
      query: ({ name,firstName,
  lastName,
  phoneNumber,
  publicAvtId,
  avt }) => ({
        url: API_ROUTES.instructor + `${localStorage.getItem("userId")}`,
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
      invalidatesTags: ["instuctor-profile"],
    }),
    updateInstructorAddress: builder.mutation({
      query: ({
        firstName,
        lastName,
        phoneNumber,
        userAddress,
        userCity,
        userCountry,
        userPostalCode,
      }) => ({
        url:
          API_ROUTES.instructor +
          `${localStorage.getItem("userId")}/update-address`,
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
      invalidatesTags: ["instuctor-profile"],
    }),
    updateInstructorPassword: builder.mutation({
      query: ({ name, email, password, firstName, lastName, phoneNumber }) => ({
        url:
          API_ROUTES.instructor +
          `${localStorage.getItem("userId")}/changePassword`,
        method: "PUT",
        body: { name, email, password, firstName, lastName, phoneNumber },
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["instuctor-profile"],
    }),
    getTotalUsersBuy: builder.query({
      query: () => ({
        url:
          API_ROUTES.instuctorStat +
          `${localStorage.getItem("userId")}/totalUsersBuy`,
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["instuctor"],
    }),
    getTotalRevenue: builder.query({
      query: () => ({
        url:
          API_ROUTES.instuctorStat +
          `${localStorage.getItem("userId")}/totalRevenue`,
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["instuctor"],
    }),
    getTotalCourses: builder.query({
      query: () => ({
        url:
          API_ROUTES.instuctorStat +
          `${localStorage.getItem("userId")}/totalCourses`,
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["instuctor"],
    }),
    getTopCourse: builder.query({
      query: () => ({
        url:
          API_ROUTES.instuctorStat +
          `${localStorage.getItem("userId")}/topCourse`,
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["instuctor"],
    }),
    getRevenuePerYear: builder.query({
      query: () => ({
        url:
          API_ROUTES.instuctorStat +
          `${localStorage.getItem("userId")}/revenuePerYear`,
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["instuctor"],
    }),
    getCoursesPerYear: builder.query({
      query: () => ({
        url:
          API_ROUTES.instuctorStat +
          `${localStorage.getItem("userId")}/coursesPerYear`,
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["instuctor"],
    }),
    // getInstructorCourse: builder.query({
    //   query: (id) => ({
    //     url: `${localStorage.getItem("userId")}/courses/${id}`,
    //     headers: {
    //       "Content-Type": "application/json",
    //       //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   }),
    //   providesTags: ["instuctor"],
    // }),
  }),
});

export const {
  useGetInstructorCoursesQuery,
  useGetInstructorQuery,
  useUpdateInstructorProfileMutation,
  useUpdateInstructorAddressMutation,
  useUpdateInstructorPasswordMutation,
  useGetTotalUsersBuyQuery,
  useGetTotalRevenueQuery,
  useGetTotalCoursesQuery,
  useGetTopCourseQuery,
  useGetRevenuePerYearQuery,
  useGetCoursesPerYearQuery,
} = instuctorApi;
