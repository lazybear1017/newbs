import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "test",
  initialState: {
    msg: '熊程峰',
  },
  reducers: {
    changeMsg: (state, action) => {
      // 可以直接修改的“状态”
      state.msg += action.payload;
    },
  },
});
