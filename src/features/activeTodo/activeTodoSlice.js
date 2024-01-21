import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = { activeTodoId: null };

const activeTodoSlice = createSlice({
    name: 'activeTodo',
    initialState,
    reducers: {
        changeActiveTodo: (state, action) => {
            return { ...state, activeTodoId: action.payload }
        },
    },
});


export const { changeActiveTodo } = activeTodoSlice.actions;
export default activeTodoSlice.reducer;


export const selectActiveTodo = (state) => state.activeTodo.activeTodoId;



