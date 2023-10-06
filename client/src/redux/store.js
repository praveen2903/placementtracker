import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import registerReducer from "./registerSlice";
import clubSlice from "./clubSlice";
import adminSlice from "./adminSlice";
import eventSlice from "./eventSlice";
import chatSlice from "./chatSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        register:registerReducer,
        clubs:clubSlice,
        chats:chatSlice,
        admin:adminSlice,
        events:eventSlice,
    },
  });
  
  export default store;