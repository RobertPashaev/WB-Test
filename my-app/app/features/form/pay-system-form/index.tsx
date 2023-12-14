import React, { memo } from 'react';
import { Button } from '@mui/material';
import { Control, useFieldArray } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardAutocomplete } from '@/app/features/card-selector';
import { ModalForm } from '@/types';
import { TextFieldForm } from '@/app/react-hook-form/text-field';
import styles from './index.module.scss';

export const PaySystems = memo(({ index, control }: { index: number; control: Control<ModalForm> }) => {
  const systems = useFieldArray({ control, name: `Acquirers.${index}.PS` });

  return (
    <div className={styles.pay_system__container}>
      <Button
        color="primary"
        onClick={() => systems.append({ Name: '', Rate: 0 })}
        sx={{ width: '20vw' }}
        variant="outlined"
      >
        Добавить платежную систему
      </Button>
      {systems.fields.map((field, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={field.id} className={styles.pay_system__fields}>
          <CardAutocomplete name={`Acquirers.${index}.PS.${key}.Name`} />
          <TextFieldForm label="Ставка" name={`Acquirers.${index}.PS.${key}.Rate`} type="number" />
          <DeleteIcon fontSize="large" onClick={() => systems.remove(key)} />
        </div>
      ))}
    </div>
  );
});
