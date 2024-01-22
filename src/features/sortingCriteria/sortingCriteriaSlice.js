import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const sortingCriteriaSlice = createSlice({
    name: 'sortingCriteria',
    initialState,
    reducers: {
        changeSortingCriteria: (state, action) => {
            return { ...state, filter: action.payload }
        },
    },
});


export const { changeSortingCriteria } = sortingCriteriaSlice.actions;
export default sortingCriteriaSlice.reducer;


export const selectSortingCriteria = (state) => state.sortingCriteria.filter;



