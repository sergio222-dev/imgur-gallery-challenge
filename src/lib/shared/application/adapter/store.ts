import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "@/lib/shared/application/adapter/reducer";
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";

export const reduxStore = configureStore({
  reducer,
})

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
