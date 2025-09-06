import { API_URL } from "@/configs/ApiConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["admin"],
  endpoints: (builder) => ({
    getInstructorById: builder.query({
      query: (id) => "instructors/id/" + id,
    }),
  }),
});

export const { useGetInstructorByIdQuery } = adminApi;
