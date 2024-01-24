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
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
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
    useUpdateTodoMutation,
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

const activeList = (state) => state.chosenList.filter;

export const selectCompletedTodos = createSelector(
    [selectAllTodos, activeList],
    (allTodos, activeList) => {
        return allTodos
            .filter((todo) => todo.completed == true && todo.listId == activeList)
            .map((todo) => todo.id);
    }
);

export const selectStarredTodos = createSelector(
    [selectAllTodos],
    (allTodos) => {
        return allTodos
            .filter((todo) => todo.starred === true && todo.completed === false)
            .map((todo) => todo.id);
    }
);

export const selectUncompletedTodos = createSelector(
    [selectAllTodos, activeList],
    (allTodos, activeList) => {
        return allTodos
            .filter((todo) => !todo.completed && todo.listId === activeList)
            .map((todo) => ({
                id: todo.id,
                title: todo.title,
                createdAt: todo.createdAt,
                starred: todo.starred,
            }));
    }
);

const isSameDate = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

export const selectCompletedTodosForToday = createSelector(
    [selectAllTodos],
    (allTodos) => {
        const currentTime = new Date();
        return allTodos
            .filter((todo) => todo.completed && isSameDate(new Date(todo.finishAt), currentTime))
            .map((todo) => todo.id);
    }
);

export const selectUncompletedTodosForToday = createSelector(
    [selectAllTodos],
    (allTodos) => {
        const currentTime = new Date();
        return allTodos
            .filter((todo) => !todo.completed && isSameDate(new Date(todo.finishAt), currentTime))
            .map((todo) => todo.id);
    }
);
