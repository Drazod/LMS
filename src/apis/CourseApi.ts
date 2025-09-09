import { API_URL } from "@/configs/ApiConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CourseApi = createApi({
  reducerPath: "CourseApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Course", "Course-Details"],
  endpoints: (build) => ({
    getCourseList: build.query({
      query: (courseId) => `courses/details/${courseId}`,
      providesTags: ["Course"],
    }),
    getCourseDetails: build.query({
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
  useGetCourseDetailsQuery,
  useUpdateCompletedSectionMutation,
  useGetSectionQuery,
} = CourseApi;
