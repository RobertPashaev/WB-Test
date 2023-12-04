import React, { InputHTMLAttributes } from 'react';
import styles from './index.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  errorText?: string;
  type?: string;
  placeholder: string;
  colorBg?: string;
  colorText: string;
};

export const Input = ({ type, errorText, placeholder, colorBg, colorText, ...rest }: Props) => {
  return (
    <div className={styles.input__container}>
      <input
        className={styles.input}
        type={type}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        placeholder={placeholder}
        style={{ backgroundColor: colorBg, color: colorText }}
      />
      <span className={styles.error}>{errorText}</span>
    </div>
  );
};
