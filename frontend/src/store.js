import { configureStore } from "@reduxjs/toolkit";

import createReducer from "./features/articleSlice";

export const store = configureStore({
    reducer: {
        articleState: createReducer
    }
})