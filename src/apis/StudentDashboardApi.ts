// src/apis/StudentApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, API_ROUTES } from "@/configs/ApiConfig";

// ---- shared API shapes (adjust to your backend if needed)
type ApiResponse<T> = {
  payload: T;
  metadata?: any;
  message?: string;
};

type StudentProfile = {
  userId: number;
  name: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  publicAvtId?: string;
  avt?: string; // URL or base64 depending on your app
};

type StudentStats = Record<string, number>;
type StudentCourse = any; // replace with your real course type
type StudentCoursesResponse = StudentCourse[];

// ---- small helper
const getUserId = () => Number(localStorage.getItem("userId"));

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}${API_ROUTES.student}`, // e.g. https://api.../api/student/
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["student", "student-profile"],
  endpoints: (builder) => ({
    // GET /{userId}/statistic
    getStudentStats: builder.query<ApiResponse<StudentStats>, { userId?: number } | void>({
      query: (arg) => {
        const userId = (arg as any)?.userId ?? getUserId();
        return `${userId}/statistic`;
      },
      providesTags: ["student"],
    }),

    // GET /{userId}/courses
    getStudentCourses: builder.query<ApiResponse<StudentCoursesResponse>, { userId?: number } | void>({
      query: (arg) => {
        const userId = (arg as any)?.userId ?? getUserId();
        return `${userId}/courses`;
      },
      providesTags: ["student"],
    }),

    // GET /{userId}
    getStudent: builder.query<ApiResponse<StudentProfile>, { userId?: number } | void>({
      query: (arg) => {
        const userId = (arg as any)?.userId ?? getUserId();
        return `${userId}`;
      },
      providesTags: ["student-profile"],
    }),

    // PUT /{userId}
    updateStudentProfile: builder.mutation<
      ApiResponse<StudentProfile>,
      Partial<StudentProfile> & { userId?: number }
    >({
      query: ({ userId, ...body }) => ({
        url: `${userId ?? getUserId()}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["student-profile"],
    }),

    // POST /{userId}/update-address
    updateStudentAddress: builder.mutation<
      ApiResponse<StudentProfile>,
      {
        userId?: number;
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
        userAddress?: string;
        userCity?: string;
        userCountry?: string;
        userPostalCode?: string;
      }
    >({
      query: ({ userId, ...body }) => ({
        url: `${userId ?? getUserId()}/update-address`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["student-profile"],
    }),

    // PUT /{userId}/changePassword
    updateStudentPassword: builder.mutation<
      ApiResponse<unknown>,
      {
        userId?: number;
        name?: string;
        email?: string;
        password: string;
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
      }
    >({
      query: ({ userId, ...body }) => ({
        url: `${userId ?? getUserId()}/changePassword`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["student-profile"],
    }),
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
