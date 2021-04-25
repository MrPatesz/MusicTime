import { configureStore } from "@reduxjs/toolkit";
import queueReducer from "./queue";

export const store = configureStore({
  reducer: {
    queue: queueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
