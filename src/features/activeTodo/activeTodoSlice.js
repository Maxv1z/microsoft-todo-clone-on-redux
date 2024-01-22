import { createSlice } from '@reduxjs/toolkit';

const initialState = { activeTodoId: null };

const activeTodoSlice = createSlice({
    name: 'activeTodo',
    initialState,
    reducers: {
        changeActiveTodo: (state, action) => {
            if (state.activeTodoId === action.payload && state.activeTodoId !== null) {
                return { ...state, activeTodoId: null };
            } else {
                return { ...state, activeTodoId: action.payload };
            }
        },
    },
});

export const { changeActiveTodo } = activeTodoSlice.actions;
export default activeTodoSlice.reducer;

export const selectActiveTodo = (state) => state.activeTodo.activeTodoId;
