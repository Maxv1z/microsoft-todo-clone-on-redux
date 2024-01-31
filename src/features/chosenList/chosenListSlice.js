import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = { filter: '1' };

const chosenListSlice = createSlice({
    name: 'chosenList',
    initialState,
    reducers: {
        changeListChoice: (state, action) => {
            return { ...state, filter: action.payload }
        },
    },
});

export const { changeListChoice } = chosenListSlice.actions;
export default chosenListSlice.reducer;

import { selectIdAndListIdsFromTodos } from '../todos/todosSlice';

export const selectActiveList = (state) => state.chosenList.filter;

// Create a selector to filter todos based on listId and return id and listId
export const selectTodoIdsByFilter = createSelector(
    [selectIdAndListIdsFromTodos, selectActiveList],
    (idAndListIds, activeList) => {
        const filteredIds = idAndListIds
            .filter((todo) => todo.listId == activeList)
            .map((todo) => todo.id)
        return filteredIds;
    }
);


