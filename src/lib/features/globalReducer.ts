import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  rand: Math.random(),
  home: false,
  click: false,
  page: 1,
  guest: 100,
  query: { city: "", date: { from: "", to: "" } },
  date: { from: new Date(), to: new Date(new Date().getTime() + 24 * 36 * 1e5) },
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
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setGuest: (state, action) => {
      state.guest = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const random = (state: RootState) => state.rand;
export const getHome = (state: RootState) => state.home;
export const getClick = (state: RootState) => state.click;
export const getPage = (state: RootState) => state.page;
export const getGuest = (state: RootState) => state.guest;
export const getQuery = (state: RootState) => state.query;
export const getDate = (state: RootState) => state.date;
export const { setRand, setHome, setClick, setPage, setGuest, setQuery, setDate } = globalSlice.actions;
export default globalSlice.reducer;
