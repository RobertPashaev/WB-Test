import React, { MouseEventHandler, memo, JSX } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import closeIcon from '../../../../public/CloseIcon.svg';
import styles from './index.module.scss';

type Props = {
  showModal: boolean;
  handleCloseModal: MouseEventHandler;
  title: string;
  children: JSX.Element;
};

export const Modal = memo(({ showModal, handleCloseModal, title, children }: Props) => {
  return (
    <div
      className={cn(styles.modal__container, {
        [styles.modal__container_isVisible]: showModal,
      })}
    >
      <div aria-hidden="true" className={styles.modal__overlay} onClick={handleCloseModal} />
      <div className={styles.modal}>
        <Image alt="closeIcon" className={styles.modal__close_icon} onClick={handleCloseModal} src={closeIcon} />
        <h1 className={styles.modal__title}>{title}</h1>
        {children}
      </div>
    </div>
  );
});
