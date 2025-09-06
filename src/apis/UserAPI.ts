import { API_ROUTES, API_URL } from "@/configs/ApiConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const UserApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + API_ROUTES.user,
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `${localStorage.getItem("userId") || 2}`,
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["user"],
    }),
    // getUser: builder.query({
    //   query: (id) => ({
    //     url: `${localStorage.getItem("id") || 2}/${id}`,
    //     headers: {
    //       "Content-Type": "application/json",
    //       //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   }),
    //   providesTags: ["user"],
    // }),
  }),
});

const { useGetUserQuery } = UserApi;
