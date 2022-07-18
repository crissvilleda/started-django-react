import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import loadingSlice from "./features/loadingSlice";

export default configureStore({
  reducer: {
    login: loginSlice,
    loading: loadingSlice,
  },
});
