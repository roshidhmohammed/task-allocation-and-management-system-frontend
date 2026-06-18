import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user"
import editTaskReducer from "./slices/editTask"


const store = configureStore({
  reducer: {
    user: userReducer,
    editTask: editTaskReducer
  },
});


export default store;