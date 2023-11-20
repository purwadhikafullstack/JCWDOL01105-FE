import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  rand: Math.random(),
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setRand: (state, action) => {
      state.rand = action.payload;
    },
  },
});

export const random = (state: RootState) => state.rand;
export const { setRand } = globalSlice.actions;
export default globalSlice.reducer;
