import { configureStore } from "@reduxjs/toolkit";
import { goobalSlice } from "./reducer/goobal";
import { testSlice } from "./reducer/test";

export const store = configureStore({
  reducer: {
    goobal: goobalSlice.reducer,
    test: testSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // 导出RootState返回类型
