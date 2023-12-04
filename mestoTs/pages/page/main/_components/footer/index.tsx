import React, { memo } from 'react';
import styles from './index.module.scss';

export const Footer = memo(() => {
  return (
    <section className={styles.footer}>
      <span className={styles.footer__cop}>© 2023 Pasaev Robert</span>
    </section>
  );
});
