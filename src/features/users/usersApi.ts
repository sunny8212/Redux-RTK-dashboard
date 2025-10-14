import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from './usersTypes';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    addUser: builder.mutation<User, Omit<User, 'id'>>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
            const id = Math.floor(Math.random() * 10000);
            // 🟢 Add new user at the TOP
            draft.unshift({ id, ...arg });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),


    updateUser: builder.mutation<User, User>({
      query: ({ id, ...body }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
            const index = draft.findIndex((u) => u.id === arg.id);
            if (index !== -1) draft[index] = arg;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),

    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
            return draft.filter((u) => u.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
