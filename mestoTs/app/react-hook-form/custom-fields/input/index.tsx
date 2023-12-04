import React, { InputHTMLAttributes, memo } from 'react';
import { useController } from 'react-hook-form';
import { Input } from '@/app/shared/components/input';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  name: string;
  placeholder: string;
  colorText: string;
  colorBg: string;
  type?: string;
};

export const InputField = memo(({ name, placeholder, colorBg, colorText, type, ...rest }: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController<{ fieldName: string }, 'fieldName'>({
    name: name as 'fieldName',
  });

  return (
    <Input
      colorBg={colorBg}
      colorText={colorText}
      errorText={error?.message}
      name={field.name}
      onBlur={field.onBlur}
      onChange={field.onChange}
      placeholder={placeholder}
      type={type}
      value={field.value === undefined ? '' : field.value}
    />
  );
});
