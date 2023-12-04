/* eslint-disable no-underscore-dangle */
import React, { memo, useMemo } from 'react';
import { cardsApi } from '@/app/services/CardServices';
import { userApi } from '@/app/services/UserService';
import { CardItem } from '@/app/shared/components/card-item';
import styles from './index.module.scss';

export const Cards = memo(() => {
  const { data } = userApi.useGetUserQuery();
  const { data: cardData, isLoading } = cardsApi.useGetCardsQuery();
  const [changeLikeCardStatus] = cardsApi.useChangeLikeCardStatusMutation();
  const [deleteCard] = cardsApi.useDeleteCardMutation();

  const isOwn: any = useMemo(() => {
    if (!cardData || !data) return undefined;
    return cardData.map(item => item.owner._id === data._id);
  }, [cardData, data]);

  if (isLoading) {
    return 'loading...';
  }

  if (!cardData) return null;

  return (
    <section className={styles.cards__container}>
      {cardData.slice(0, 6).map((card, index) => (
        <CardItem
          key={card._id}
          handleDeleteCard={deleteCard}
          handleLikeCard={changeLikeCardStatus}
          id={card._id}
          isOwn={isOwn[index]}
          likes={card.likes}
          link={card.link}
          name={card.name}
        />
      ))}
    </section>
  );
});
