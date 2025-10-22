import { API_ROUTES, API_URL } from "@/configs/ApiConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper to read react-auth-kit cookies as a fallback
function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

export const instuctorApi = createApi({
  reducerPath: "instructorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL, // or: import.meta.env.VITE_API_BASE_URL
    prepareHeaders: (headers) => {
      // Get token from localStorage first; fallback to react-auth-kit cookies
      const token = localStorage.getItem("accessToken") || getCookie("_auth");
      const tokenType =
        localStorage.getItem("token_type") || getCookie("_auth_type") || "Bearer";

      if (token && !headers.has("Authorization")) {
        headers.set("Authorization", `${tokenType} ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["instructor", "instructor-profile"],
  endpoints: (builder) => ({
    getInstructorCourses: builder.query<any, { page: number; size: number }>({
      query: ({ page, size }) => {
        const userId = localStorage.getItem("userId");
        return {
          url: `${API_ROUTES.instructor}${userId}/course?page=${page}&size=${size}`,
          method: "GET",
        };
      },
      providesTags: ["instructor"],
    }),

    getInstructor: builder.query<any, void>({
      query: () => {
        const userId = localStorage.getItem("userId");
        return {
          url: `${API_ROUTES.instructor}id/${userId}`,
          method: "GET",
        };
      },
      providesTags: ["instructor-profile"],
    }),

    updateInstructorProfile: builder.mutation<
      any,
      {
        name: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        publicAvtId?: string | null;
        avt?: string | null;
      }
    >({
      query: (body) => {
        const userId = localStorage.getItem("userId");
        return {
          url: `${API_ROUTES.instructor}${userId}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["instructor-profile"],
    }),

    updateInstructorAddress: builder.mutation<
      any,
      {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        userAddress: string;
        userCity: string;
        userCountry: string;
        userPostalCode: string;
      }
    >({
      query: (body) => {
        const userId = localStorage.getItem("userId");
        return {
          url: `${API_ROUTES.instructor}${userId}/update-address`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["instructor-profile"],
    }),

    updateInstructorPassword: builder.mutation<
      any,
      {
        name: string;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
      }
    >({
      query: (body) => {
        const userId = localStorage.getItem("userId");
        return {
          url: `${API_ROUTES.instructor}${userId}/changePassword`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["instructor-profile"],
    }),

    getTotalUsersBuy: builder.query<any, void>({
      query: () => {
        const userId = localStorage.getItem("userId");
        return {
          url: `${API_ROUTES.instuctorStat}${userId}/totalUsersBuy`,
          method: "GET",
        };
      },
      providesTags: ["instructor"],
    }),

    getTotalRevenue: builder.query<any, void>({
      query: () => {
        const userId = localStorage.getItem("userId");
        return {
          url: `${API_ROUTES.instuctorStat}${userId}/totalRevenue`,
          method: "GET",
        };
      },
      providesTags: ["instructor"],
    }),

    getTotalCourses: builder.query<any, void>({
      query: () => {
        const userId = localStorage.getItem("userId");
        return {
          url: `${API_ROUTES.instuctorStat}${userId}/totalCourses`,
          method: "GET",
        };
      },
      providesTags: ["instructor"],
    }),

    getTopCourse: builder.query<any, void>({
      query: () => {
        const userId = localStorage.getItem("userId");
        return {
          url: `${API_ROUTES.instuctorStat}${userId}/topCourse`,
          method: "GET",
        };
      },
      providesTags: ["instructor"],
    }),

    getRevenuePerYear: builder.query<any, void>({
      query: () => {
        const userId = localStorage.getItem("userId");
        return {
          url: `${API_ROUTES.instuctorStat}${userId}/revenuePerYear`,
          method: "GET",
        };
      },
      providesTags: ["instructor"],
    }),
    deleteInstructorCourse: builder.mutation<{ message?: string }, number>({
      query: (courseId) => ({
        url: `courses/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["instructor"],
    }),
    getCoursesPerYear: builder.query<any, void>({
      query: () => {
        const userId = localStorage.getItem("userId");
        return {
          url: `${API_ROUTES.instuctorStat}${userId}/coursesPerYear`,
          method: "GET",
        };
      },
      providesTags: ["instructor"],
    }),
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
  useDeleteInstructorCourseMutation,
} = instuctorApi;
