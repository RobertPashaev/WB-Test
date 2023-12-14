/* eslint-disable react/no-array-index-key */
import React, { memo, useCallback, useState } from 'react';
import { Button } from '@mui/material';
import { ModalAddCountryView } from '@/app/view/modal-add-country-view';
import { CountryForm } from '@/app/features/form/country-form';
import { parseResult } from '@/schema';
import { ModalForm } from '@/types';

export const EditorHookForm = memo(() => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = useCallback((data: ModalForm) => {
    // eslint-disable-next-line no-console
    console.log({ newJson: data });
  }, []);

  if (parseResult.success) {
    return (
      <>
        <div style={{ width: 'max-content', display: 'flex', flexDirection: 'column', gap: '5vh', margin: '0 auto' }}>
          {parseResult.data.map((country, index) => (
            <CountryForm key={index} disabled init={country} onSubmit={handleSubmit} />
          ))}
          <ModalAddCountryView closeModal={handleClose} openModal={open} />
        </div>
        <Button
          color="success"
          onClick={handleClickOpen}
          sx={{ width: '30vw', margin: '2vh 35vw' }}
          variant="contained"
        >
          Добавить страну
        </Button>
      </>
    );
  }

  return null;
});
