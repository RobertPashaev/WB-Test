/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useCallback, useMemo, SyntheticEvent } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { useController, useFormContext } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

type Props = {
  name: string;
};

export const CardAutocomplete = memo(({ name }: Props) => {
  const options = useMemo(() => ['visa', 'mastercard', 'maestro', 'mir'], []);
  const [inputValue, setInputValue] = React.useState('');

  const methods = useFormContext();

  const handleInputChange = useCallback((event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setInputValue(newValue);
  }, []);

  const handleOnChange = useCallback(
    (event: SyntheticEvent<Element, Event>, newValue: string[]) => {
      const valueString = newValue.join(', ');

      methods.setValue(name, valueString, { shouldValidate: true, shouldTouch: true });
    },
    [methods, name],
  );

  const {
    field,
    fieldState: { error },
  } = useController<{ fieldName: string }, 'fieldName'>({
    name: name as 'fieldName',
  });

  return (
    <Stack sx={{ width: 'max-content', minWidth: '16vw' }}>
      <Autocomplete
        // eslint-disable-next-line no-nested-ternary
        defaultValue={Array.isArray(field.value) ? field.value : field.value ? field.value.split(',') : []}
        multiple
        onChange={handleOnChange}
        onInputChange={handleInputChange}
        options={options}
        renderInput={params => (
          <TextField
            {...params}
            error={!!error}
            helperText={error?.message}
            label="Платежная система"
            name={name}
            onBlur={field.onBlur}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                event.preventDefault();
                options.push(inputValue);
                setInputValue('');
              }
            }}
            variant="standard"
          />
        )}
      />
    </Stack>
  );
});
