import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../api/apiSlice'

import chosenListReducer from '../features/chosenList/chosenListSlice'
import activeTodoReducer from "../features/activeTodo/activeTodoSlice";
import sortingCriteriaReducer from "../features/sortingCriteria/sortingCriteriaSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        chosenList: chosenListReducer,
        activeTodo: activeTodoReducer,
        sortingCriteria: sortingCriteriaReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})
