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
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'UPDATE',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos']
        }),
    }),
});

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation
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