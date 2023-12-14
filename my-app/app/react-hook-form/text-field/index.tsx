import React, { memo, useCallback } from 'react';
import { useController } from 'react-hook-form';
import { TextField, TextFieldProps, Typography } from '@mui/material';
import styles from './index.module.scss';

type Props = TextFieldProps & {
  name: string;
};

export const TextFieldForm = memo(({ name, ...props }: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController<{ fieldName: string }, 'fieldName'>({
    name: name as 'fieldName',
  });

  const handleonChangeNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.type === 'number') {
        const output = parseFloat(e.target.value);
        field.onChange(output);
      } else {
        field.onChange(e);
      }
    },
    [field, props.type],
  );

  const handleValueNumber = useCallback((value: number | string) => {
    return Number.isNaN(value) || value === 0 || value === undefined ? '' : value.toString();
  }, []);

  return (
    <div className={styles.block}>
      <TextField
        color={error ? 'error' : 'primary'}
        error={Boolean(error)}
        margin="normal"
        name={name}
        onBlur={field.onBlur}
        onChange={handleonChangeNumber}
        value={handleValueNumber(field.value)}
        variant="standard"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
      <Typography color="error" variant="body1">
        {error?.message}
      </Typography>
    </div>
  );
});
