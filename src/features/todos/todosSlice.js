import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from '../../api/apiSlice'

const todosAdapter = createEntityAdapter({
})

const initialState = todosAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query({
            query: () => '/todos',
            transformResponse: (res) => {
                const sortedTodos = [...res].sort((a, b) => a.id - b.id);
                return todosAdapter.setAll(initialState, sortedTodos);
            },
            providesTags: ['Todos']
        }),
        addTodo: builder.query({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            providesTags: ['Todos']
        }),
        updateTodo: builder.query({
            query: (todo) => ({
                url: '/todos',
                method: 'UPDATE',
                body: todo
            }),
            providesTags: ['Todos']
        }),
        deleteTodo: builder.query({
            query: (todo) => ({
                url: '/todos',
                method: 'DELETE',
            }),
            providesTags: ['Todos']
        }),
    }),
});

export const {
    useGetTodosQuery,
    useUpdateTodoQuery,
    useDeleteTodoQuery,
    useAddTodoQuery
} = extendedApiSlice;

export const selectTodoResult = extendedApiSlice.endpoints.getTodos.select()

const selectTodosData = createSelector(
    selectTodoResult,
    todosResult => todosResult.data
)

export const {
    selectAll: selectAllTodos,
    selectById: selectTodoById,
    selectIds: selectTodosIds
} = todosAdapter.getSelectors(state => selectTodosData(state) ?? initialState)

// Select listId field from a todo
export const selectIdAndListIdsFromTodos = createSelector(
    selectAllTodos,
    (allTodos) => allTodos.map((todo) => ({ id: todo.id, listId: todo.listId }))
);