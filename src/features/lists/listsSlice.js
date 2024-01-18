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
            providesTags: ['Lists']
        }),
        addList: builder.mutation({
            query: (list) => ({
                url: '/lists',
                method: 'POST',
                body: list
            }),
            invalidatesTags: ['Lists']
        }),
        updateList: builder.mutation({
            query: (list) => ({
                url: "/lists",
                method: 'POST',
                body: list
            }),
            invalidatesTags: ['Lists']
        }),
        deleteList: builder.mutation({
            query: () => ({
                url: '/lists',
                method: "DELETE"
            }),
            invalidatesTags: ['Lists']
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