import { configureStore } from "@reduxjs/toolkit";
import { BookSlice } from "./Reducer/BookSlice";

 export const store = configureStore({
    reducer:{
        app: BookSlice.reducer
    }
})