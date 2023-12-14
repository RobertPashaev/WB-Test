import React, { memo } from 'react';
import { Button } from '@mui/material';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { ModalForm } from '@/types';
import { TextFieldForm } from '@/app/react-hook-form/text-field';
import { PaySystems } from '../../pay-system-form';
import styles from './index.module.scss';

type Props = {
  methods: UseFormReturn<ModalForm, any, undefined>;
  acquirers: UseFieldArrayReturn<ModalForm, 'Acquirers', 'id'>;
};

export const AcquirersFields = memo(({ acquirers, methods }: Props) => {
  return (
    <>
      {acquirers.fields.map((acquirer, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={acquirer.id} className={styles.acquirers_fields__container}>
          <div className={styles.acquirers_fields}>
            <TextFieldForm label="Платежная система эквайера" name={`Acquirers.${index}.Name`} type="text" />
            {acquirers.fields.length > 1 && (
              <TextFieldForm label="Процент" name={`Acquirers.${index}.Percent`} type="number" />
            )}
          </div>
          <PaySystems control={methods.control} index={index} />
          <Button color="error" onClick={() => acquirers.remove(index)} variant="contained">
            Удалить эквайера
          </Button>
        </div>
      ))}
    </>
  );
});
