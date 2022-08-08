import { combineReducers } from "redux";

import { fetchUserReducer } from "./auth/auth.reducer";

export const rootReducer = combineReducers({ auth: fetchUserReducer });
