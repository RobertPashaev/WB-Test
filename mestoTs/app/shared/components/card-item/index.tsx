/* eslint-disable no-underscore-dangle */
import React, { memo, useCallback, useMemo } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import trashIcon from '../../../../public/Trash.svg';
import likeSrc from '../../../../public/like.svg';
import likeActive from '../../../../public/active-like.svg';
import { userApi } from '@/app/services/UserService';
import { User } from '@/types/types';
import { cardsApi } from '@/app/services/CardServices';
import styles from './index.module.scss';

type Props = {
  id: string;
  link: string;
  likes: User[];
  name: string;
  handleLikeCard: ({ id, isLiked }: { id: string; isLiked: boolean }) => void;
  handleDeleteCard: ({ id }: { id: string }) => void;
  isOwn: boolean;
};

export const CardItem = memo(({ id, link, name, likes, handleLikeCard, handleDeleteCard, isOwn }: Props) => {
  const { data, isLoading } = userApi.useGetUserQuery();
  const { data: cardData } = cardsApi.useGetCardsQuery();

  const isLiked = useMemo(() => {
    if (!data) return undefined;
    return likes.some(like => like._id === data._id);
  }, [data, likes]);

  const handleOnClick = useCallback(() => {
    if (isLiked === undefined) return;

    handleLikeCard({ id, isLiked });
  }, [handleLikeCard, id, isLiked]);

  const handleDelete = useCallback(() => {
    if (cardData === undefined) return;
    cardData.map(card => card._id === data?._id);

    handleDeleteCard({ id });
  }, [cardData, data?._id, handleDeleteCard, id]);

  return (
    <div className={styles.card_container}>
      <Image
        key={id}
        alt="image"
        aria-hidden
        height={282}
        src={link}
        style={{
          borderTopRightRadius: '10px',
          borderTopLeftRadius: '10px',
        }}
        width={282}
      />
      <Image
        alt="trash"
        className={cn(styles.card__trash_icon, {
          [styles.card__trash_icon_isOwn]: isOwn,
        })}
        onClick={handleDelete}
        src={trashIcon}
      />
      <div className={styles.card__info}>
        <h1 className={styles.card__text}>{name}</h1>
        <div className={styles.card__like}>
          <Image
            alt="like"
            className={styles.card__like_active}
            onClick={handleOnClick}
            src={isLiked ? likeActive : likeSrc}
          />
          <span>{likes.length}</span>
        </div>
      </div>
    </div>
  );
});
