import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const selectedIndexSlice = createSlice({
  name: "selectedIndex",
  initialState,
  reducers: {
    setSelectedIndex: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, setSelectedIndex } =
  selectedIndexSlice.actions;

export default selectedIndexSlice.reducer;
