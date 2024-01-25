import { configureStore } from "@reduxjs/toolkit";
import rootslice from "./rootslice";

const store = configureStore({
  reducer: {
    root: rootslice,
  },
});

export default store;
