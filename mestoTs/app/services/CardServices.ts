import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/types/types';

const HEADERS = {
  authorization: '7d44fa7e-04ef-41d7-b07e-efc6bd06cf53',
  'Content-Type': 'application/json',
};

type Card = {
  likes: User[];
  _id: string;
  name: string;
  link: string;
  owner: User;
  createdAt: string;
};

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  }),
  tagTypes: ['Cards'],
  endpoints: builder => ({
    getCards: builder.query<Card[], void>({
      query: () => ({
        headers: HEADERS,
        url: `/cards`,
      }),
      providesTags: ['Cards'],
    }),
    createCard: builder.mutation({
      query: ({ link, name }) => ({
        url: '/cards',
        method: 'POST',
        headers: HEADERS,
        body: { link, name },
      }),
      invalidatesTags: ['Cards'],
    }),
    deleteCard: builder.mutation({
      query: ({ id }) => ({
        url: `/cards/${id}`,
        method: 'DELETE',
        headers: HEADERS,
      }),
      invalidatesTags: ['Cards'],
    }),
    changeLikeCardStatus: builder.mutation<{}, { id: string; isLiked: boolean }>({
      query: ({ id, isLiked }) => ({
        url: `/cards/likes/${id}`,
        method: isLiked ? 'DELETE' : 'PUT',
        headers: HEADERS,
      }),
      invalidatesTags: ['Cards'],
    }),
  }),
});

export const { useCreateCardMutation, useDeleteCardMutation } = cardsApi;
