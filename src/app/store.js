import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../api/apiSlice'

import chosenListReducer from '../features/chosenList/chosenListSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        chosenList: chosenListReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})
