import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalReducer";

export const store = configureStore({
  reducer: globalReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
