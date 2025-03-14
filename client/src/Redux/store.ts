import { configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
import userReducer from "../Redux/userSlice";
import helperReducer from "../Redux/helperSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel1,
};

const _persistedReducer = persistCombineReducers(persistConfig, {
  user: userReducer,
  helper: helperReducer,
});

// ✅ Add middleware configuration
export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Fixes the non-serializable value error
    }),
});

export type RootState = ReturnType<typeof store.getState>;
