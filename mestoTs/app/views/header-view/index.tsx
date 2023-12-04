/* eslint-disable @next/next/no-html-link-for-pages */
import React, { memo } from 'react';
import Image from 'next/image';
import logo from '../../../public/Vector.png';
import styles from './index.module.css';

type Props = {
  email?: string;
  logView: string;
  href: string;
};

export const HeaderView = memo(({ email, logView, href }: Props) => {
  return (
    <div className={styles.header}>
      <a href="/">
        <Image alt="Logo" height={33} src={logo} style={{ cursor: 'pointer' }} width={142} />
      </a>

      <h2 className={styles.header__text}>
        <span className={styles.header__span}>{email}</span>
        <a href={href}>{logView}</a>
      </h2>
    </div>
  );
});
