import React, { memo, useCallback } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { Button, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextFieldForm } from '@/app/react-hook-form/text-field';
import { ModalForm } from '@/types';
import { parseResult, formSchemaRefine } from '@/schema';
import { AcquirersFields } from './aquirers-fields';
import styles from './index.module.scss';

type Props = {
  init: ModalForm;
  disabled?: boolean;
  onSubmit: (data: ModalForm) => void;
};

export const CountryForm = memo(({ init, disabled, onSubmit }: Props) => {
  const methods = useForm<ModalForm>({
    defaultValues: init,
    resolver: zodResolver(formSchemaRefine),
    mode: 'onSubmit',
  });

  const acquirers = useFieldArray({
    name: `Acquirers`,
    control: methods.control,
  });

  const handleSubmit = useCallback(
    (data: ModalForm) => {
      if (methods.formState.dirtyFields.Country && parseResult.success) {
        if (parseResult.data.some(el => el.Country === data.Country)) {
          methods.setError('Country', { message: 'Страна с таким именем уже есть.' });
          return;
        }
      }

      onSubmit(data);
    },
    [methods, onSubmit],
  );

  return (
    <FormProvider
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...methods}
    >
      <form className={styles.form} onSubmit={methods.handleSubmit(handleSubmit)}>
        <div className={styles.text_fields__country}>
          <TextFieldForm disabled={disabled} label="Название страны" name="Country" type="text" />
          <TextFieldForm label="Валюта" name="Currency" type="text" />
          <Button
            color="success"
            onClick={() => acquirers.append({ Name: '', PS: [{ Name: '', Rate: 0 }] })}
            variant="contained"
          >
            Добавить эквайера
          </Button>
        </div>
        <AcquirersFields acquirers={acquirers} methods={methods} />
        {methods.formState.errors &&
          methods.formState.errors.Acquirers &&
          methods.formState.errors.Acquirers.root &&
          methods?.formState?.errors?.Acquirers?.[0]?.PS?.root?.message && (
            <Typography color="error">{methods.formState.errors.Acquirers.root.message}</Typography>
          )}
        {methods?.formState?.errors?.Acquirers?.[0]?.PS?.root?.message && (
          <Typography color="error">{methods?.formState?.errors?.Acquirers?.[0]?.PS?.root?.message}</Typography>
        )}
        {methods.formState.errors?.Acquirers?.root && (
          <Typography color="error">{methods.formState.errors.Acquirers.root.message}</Typography>
        )}
        <Button type="submit" variant="contained">
          Сохранить
        </Button>
        <Button variant="contained">Отмена</Button>
      </form>
    </FormProvider>
  );
});
