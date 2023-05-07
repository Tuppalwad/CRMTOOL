import { configureStore } from "@reduxjs/toolkit";
import AdduserData from "./Redux/index";
export const store = configureStore({
  reducer: {
    user: AdduserData,
  },
});

export default store;
