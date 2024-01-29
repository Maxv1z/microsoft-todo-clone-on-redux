import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from '../../api/apiSlice'

const listsAdapter = createEntityAdapter({
    sortComparer: (a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
    }
})

const initialState = listsAdapter.getInitialState();

export const listsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLists: builder.query({
            query: () => '/lists',
            transformResponse: (res) => {
                const sortedLists = [...res].sort((a, b) => a.id - b.id);
                return listsAdapter.setAll(initialState, sortedLists);
            },
            providesTags: (result, error, arg) =>
                result ?
                    [
                        ...result.ids.map(id => ({ type: 'Lists', id })),
                        { type: 'Lists', id: 'LIST' },
                        { type: 'Lists', id: 'PARTIAL-LISTS' }
                    ] : [
                        { type: 'Lists', id: 'LIST' },
                        { type: 'Lists', id: 'PARTIAL-LISTS' }
                    ]
        }),
        addList: builder.mutation({
            query: (list) => ({
                url: './lists',
                method: 'POST',
                body: list
            }),
            invalidatesTags: [{ type: 'Lists', id: 'LIST' }]
        }),
        updateList: builder.mutation({
            query: (list) => ({
                url: `./lists/${list.id}`,
                method: 'PATCH',
                body: list
            }),
            invalidatesTags: (result, error, body) => [{ type: 'Lists', id: body.id }]
        }),
        deleteList: builder.mutation({
            query: ({ id }) => ({
                url: `./lists/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [{ type: 'Lists', id: 'PARTIAL-LISTS' }]
        }),
    }),
});

export const {
    useGetListsQuery,
    useAddListMutation,
    useDeleteListMutation,
    useUpdateListMutation
} = listsApiSlice;

export const selectListResult = listsApiSlice.endpoints.getLists.select()

const selectListsData = createSelector(
    selectListResult,
    listsResult => listsResult.data
)

export const {
    selectAll: selectAllLists,
    selectById: selectListById,
    selectIds: selectListsIds
} = listsAdapter.getSelectors(state => selectListsData(state) ?? initialState)