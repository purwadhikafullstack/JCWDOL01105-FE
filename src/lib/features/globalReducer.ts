import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  rand: Math.random(),
  home: false,
  click: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setRand: (state, action) => {
      state.rand = action.payload;
    },
    setHome: (state, action) => {
      state.home = action.payload;
    },
    setClick: (state, action) => {
      state.click = action.payload;
    },
  },
});

export const random = (state: RootState) => state.rand;
export const getHome = (state: RootState) => state.home;
export const getClick = (state: RootState) => state.click;
export const { setRand, setHome, setClick } = globalSlice.actions;
export default globalSlice.reducer;
