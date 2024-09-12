const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  datas: [
    '<video width="320" height="240" controls> <source src="movie.mp4" type="video/mp4"> <source src="movie.ogg" type="video/ogg"> Your browser does not support the video tag.</video>',
  ],
  saved: true,
  loading: false,
};

const uploadVideoSlice = createSlice({
  name: "editLession",
  initialState,
  reducers: {
    changeName: {
      reducer: (state, action) => {
        state.baseValue.sectionName = action.payload.name;
        console.log(state.baseValue.sectionName);
      },
      prepare: (data) => {
        return { payload: { data } };
      },
    },
  },
});

export const { addVideo } = uploadVideoSlice.actions;
export default uploadVideoSlice.reducer;
