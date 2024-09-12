import { API_URL } from "@/configs/ApiConfig";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let page = 0;

export const fetchCoursesUnapproved = createAsyncThunk(
  "adminCourseView/fetchCoursesUnapproved",
  async () => {
    const response = await axios.get(
      API_URL + "courses/courses/getUnapprovedCourses",
      {
        params: {
          page: page,
          size: 10,
        },
      }
    );
    return response.data.payload.map((data) => ({
      ...data,
      isUpdateStatus: false,
    }));
  }
);

export const approveCourse = createAsyncThunk(
  "adminCourseView/approveCourse",
  async ({ index, id }) => {
    // console.log(data);
    const respone = await axios.put(API_URL + "courses/update-course-status", {
      courseId: id,
      status: "APPROVED",
    });
    return {
      index: index,
      payload: respone.data.payload,
    };
  }
);

export const rejectCourse = createAsyncThunk(
  "adminCourseView/rejectCourse",
  async ({ index, id }) => {
    const respone = await axios.put(API_URL + "courses/update-course-status", {
      courseId: id,
      status: "REJECTED",
    });
    return {
      index: index,
      payload: respone.data.payload,
    };
  }
);

const initialState = {
  courses: [],
  loading: false,
  haveCourses: true,
};

const adminCourseViewSlice = createSlice({
  name: "adminCourseView",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoursesUnapproved.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoursesUnapproved.fulfilled, (state, actions) => {
        state.loading = false;
        state.courses = state.courses.concat(actions.payload);
        page += 1;
        console.log(state.courses);
      })
      .addCase(fetchCoursesUnapproved.rejected, (state, actions) => {
        state.loading = false;
        state.haveCourses = false;
      });
    builder
      .addCase(approveCourse.pending, (state, actions) => {
        state.courses[actions.meta.arg.index].isUpdateStatus = true;
      })
      .addCase(approveCourse.fulfilled, (state, actions) => {
        state.courses.splice(actions.meta.arg.index, 1);
      })
      .addCase(approveCourse.rejected, (state, actions) => {
        state.courses[actions.meta.arg.index].isUpdateStatus = false;
      });
    builder
      .addCase(rejectCourse.pending, (state, actions) => {
        state.courses[actions.meta.arg.index].isUpdateStatus = true;
      })
      .addCase(rejectCourse.fulfilled, (state, actions) => {
        state.courses.splice(actions.meta.arg.index, 1);
      })
      .addCase(rejectCourse.rejected, (state, actions) => {
        state.courses[actions.meta.arg.index].isUpdateStatus = false;
      });
  },
});

export default adminCourseViewSlice.reducer;
