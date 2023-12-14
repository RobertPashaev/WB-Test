import React, { memo, useCallback } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { ModalForm } from '@/types';
import { CountryForm } from '@/app/features/form/country-form';
import json from '@/constants/api.json';
import styles from './index.module.scss';

const init = {
  Country: '',
  Currency: '',
  Acquirers: [
    {
      PS: [{ Rate: 0, Name: '' }],
      Name: '',
    },
  ],
};

type Props = {
  closeModal: () => void;
  openModal: boolean;
};

export const ModalAddCountryView = memo(({ closeModal, openModal }: Props) => {
  const handleSubmit = useCallback(
    (data: ModalForm) => {
      json.push(data);
      // eslint-disable-next-line no-console
      console.log({ json });
      closeModal();
    },
    [closeModal],
  );
  return (
    <Dialog onClose={closeModal} open={openModal} sx={{ maxWidth: '100vw' }}>
      <DialogTitle>Добавить новую страну</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <DialogContentText>Заполните все поля</DialogContentText>
        <div className={styles.acquirer__title}>
          <Typography variant="h5">Эквайеры</Typography>
          <CountryForm init={init} onSubmit={handleSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
});
