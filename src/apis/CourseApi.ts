import { API_URL } from "@/configs/ApiConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CourseApi = createApi({
  reducerPath: "CourseApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_URL + "api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Course", "Course-Details"],
  endpoints: (build) => ({
    getCourseList: build.query({
      query: (courseId) => `courses/details/${courseId}`,
      providesTags: ["Course"],
    }),
    getCurrentSection: build.query({
      query: (courseId) =>
        `students/${
          localStorage.getItem("userId")
        }/courses/${courseId}/current-section`,
      providesTags: ["Course-Details"],
    }),
    updateCompletedSection: build.mutation({
      query: (sectionId) => ({
        url: `students/complete-section`,
        method: "PUT",
        body: {
          sectionId,
          studentId: localStorage.getItem("userId"),
        },
      }),
      invalidatesTags: ["Course-Details"],
    }),
    getSection: build.query({
      query: (sectionId) => `courses/section/${sectionId}/contents`,
      providesTags: ["Course-Details"],
    }),
  }),
});

export const {
  useGetCourseListQuery,
  useGetCurrentSectionQuery,
  useUpdateCompletedSectionMutation,
  useGetSectionQuery,
} = CourseApi;
