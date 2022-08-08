import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";

const middlewares = [
  process.env.NODE_ENV === "development" && logger,
  reduxThunk,
].filter(Boolean);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});
