import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchText: "",
    isSearch: false
};

const searchingSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        changeSearchState: (state, action) => {
            state.searchText = action.payload;
        },
        changeIsSearch: (state, action) => {
            state.isSearch = action.payload;
        }
    },
});

export const { changeSearchState, changeIsSearch } = searchingSlice.actions;
export default searchingSlice.reducer;


export const selectIsSearch = (state) => state.search.isSearch;
export const selectSearchText = (state) => state.search.searchText;



