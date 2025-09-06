import { configureStore } from "@reduxjs/toolkit";

import { selectedIndexSlice } from "@/features/slices/selectedIndex";
import { modalSlice } from "@/slices/modalSlice";
import { editLessionSlice } from "@/slices/editLessionSlice";
import { adminCourseViewSlice } from "@/slices/adminCourseViewSlice";
import { studentApi } from "@/apis/StudentDashboardApi";
import { instuctorApi } from "@/apis/InstructorDashboardApi";
import { CourseApi } from "@/apis/CourseApi";

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    selectedIndex: selectedIndexSlice.reducer,
    editLession: editLessionSlice.reducer,
    adminCourseView: adminCourseViewSlice.reducer,
    // [adminApi.reducerPath]: adminApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [instuctorApi.reducerPath]: instuctorApi.reducer,
    [CourseApi.reducerPath]: CourseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(studentApi.middleware)
      .concat(instuctorApi.middleware)
      .concat(CourseApi.middleware)
      // .concat(adminApi.middleware),
});
