import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/types/types';

const HEADERS = {
  authorization: '7d44fa7e-04ef-41d7-b07e-efc6bd06cf53',
  'Content-Type': 'application/json',
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  }),
  tagTypes: ['UserProfile'],
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => ({
        url: `/users/me`,
        headers: HEADERS,
      }),
      providesTags: ['UserProfile'],
    }),
    updateUserInfo: builder.mutation({
      query: ({ name, about }) => ({
        url: `/users/me`,
        headers: HEADERS,
        method: 'PATCH',
        body: { name, about },
      }),
      invalidatesTags: ['UserProfile'],
    }),
    updateUserAvatar: builder.mutation({
      query: ({ avatar }) => ({
        url: `/users/me/avatar`,
        headers: HEADERS,
        method: 'PATCH',
        body: { avatar },
      }),
      invalidatesTags: ['UserProfile'],
    }),
  }),
});

export const { useUpdateUserInfoMutation, useGetUserQuery, useUpdateUserAvatarMutation } = userApi;
