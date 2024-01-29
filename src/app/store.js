import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../api/apiSlice'

import chosenListReducer from '../features/chosenList/chosenListSlice'
import activeTodoReducer from "../features/activeTodo/activeTodoSlice";
import sortingCriteriaReducer from "../features/sortingCriteria/sortingCriteriaSlice";
import searchingReducer from "../features/isSearching/searchingSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        chosenList: chosenListReducer,
        activeTodo: activeTodoReducer,
        sortingCriteria: sortingCriteriaReducer,
        search: searchingReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})
