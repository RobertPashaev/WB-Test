import React, { memo, useState } from 'react';
import Image from 'next/image';
import { userApi } from '../../services/UserService';
import { AddNewCardModal, EditProfileModal, EditAvatarModal } from '..';
import { useModal } from '../../shared/hooks/use-modal';
import styles from './index.module.scss';

export const Profile = memo(() => {
  const [isHovered, setIsHovered] = useState(false);

  const { data, isLoading } = userApi.useGetUserQuery();

  const { open: openProfile, close: closeProfile, visible: visibleProfile } = useModal();
  const { open: openCards, close: closeCards, visible: visibleCards } = useModal();
  const { open: openAvatar, close: closeAvatar, visible: visibleAvatar } = useModal();

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (isLoading) {
    return 'loading...';
  }

  if (!data) return null;

  return (
    <section className={styles.profile}>
      <div
        aria-hidden="true"
        className={styles.profile__imgContainer}
        onClick={openAvatar}
        onMouseLeave={handleMouseLeave}
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        onMouseOver={handleMouseOver}
      >
        <Image
          alt="Avatar"
          className={styles.profile__img}
          height={120}
          onMouseLeave={handleMouseLeave}
          onMouseOver={handleMouseOver}
          src={data.avatar}
          width={120}
        />
        {isHovered && <div className={styles.overlay} />}
      </div>

      <div className={styles.profile__info}>
        <h1 className={styles.profile__text}>{data.name}</h1>
        <span className={styles.profile__span}>{data.about}</span>
      </div>
      <button
        aria-label="EditProfileModal"
        className={styles.profile__button_edit}
        onClick={openProfile}
        type="button"
      />
      <button aria-label="AddCardModal" className={styles.profile__button_add} onClick={openCards} type="button" />
      <EditProfileModal closeModal={closeProfile} init={data} showModal={visibleProfile} />
      <AddNewCardModal closeModal={closeCards} showModal={visibleCards} />
      <EditAvatarModal closeModal={closeAvatar} showModal={visibleAvatar} />
    </section>
  );
});
