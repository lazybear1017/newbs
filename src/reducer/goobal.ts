import { createSlice } from "@reduxjs/toolkit";

export const goobalSlice = createSlice({
  name: "goobal",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state, action) => {
      // 可以直接修改的“状态”
      state.value += action.payload;
    },
  },
});
