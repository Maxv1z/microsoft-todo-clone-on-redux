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
            providesTags: (result) =>
                result ?
                    [
                        ...result.ids.map((id) => ({ type: 'Todos', id })),
                        { type: 'Todos', id: 'LIST' },
                        { type: 'Todos', id: 'PARTIAL-TODOS' },
                    ] : [
                        { type: 'Todos', id: 'LIST' },
                        { type: 'Todos', id: 'PARTIAL-TODOS' }
                    ]
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: [{ type: 'Todos', id: 'LIST' }]
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: (result, error, body) => [{ type: 'Todos', id: body.id }]
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Todos', id: 'PARTIAL-TODOS' }]
        }),
        deleteTodos: builder.mutation({
            query: (ids) => ({
                url: `/todos/delete-multiple`,
                method: 'DELETE',
                body: { ids }
            }),
            invalidatesTags: [{ type: 'Todos', id: 'PARTIAL-TODOS' }]
        }),
    }),
});

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodosMutation
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

// Select todos for a specific list
export const selectTodosByListId = createSelector(
    [selectAllTodos, activeList],
    (allTodos, activeList) => {
        return allTodos
            .filter((todo) => todo.listId === activeList)
            .map((todo) => ({
                id: todo.id,
            }));
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
            .filter((todo) => todo.completed && isSameDate(new Date(todo.timeToFinish), currentTime))
            .map((todo) => todo.id);
    }
);

export const selectUncompletedTodosForToday = createSelector(
    [selectAllTodos],
    (allTodos) => {
        const currentTime = new Date();
        return allTodos
            .filter((todo) => !todo.completed && isSameDate(new Date(todo.timeToFinish), currentTime))
            .map((todo) => todo.id);
    }
);
