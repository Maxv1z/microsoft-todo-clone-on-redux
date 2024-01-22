import { createSlice, createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { selectAllLists } from '../lists/listsSlice';

const initialState = { filter: '3' };

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


