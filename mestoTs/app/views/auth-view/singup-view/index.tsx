import React, { memo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '@/app/react-hook-form/custom-fields';
import styles from './index.module.scss';

const formSchema = z.object({
  email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
  password: z.string().min(4, 'Длинна должна быть не менее 6 символов'),
});

export type FormSignup = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (data: FormSignup) => void;
  title: string;
};

export const SingupView = memo(({ onSubmit, title }: Props) => {
  const methods = useForm<FormSignup>({
    mode: 'onSubmit',
    resolver: zodResolver(formSchema),
  });

  const { formState } = methods;

  return (
    <div className={styles.auth__container}>
      <h1 className={styles.auth__title}>{title}</h1>
      <FormProvider
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...methods}
      >
        <form className={styles.auth__inputs} onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField colorBg="black" colorText="white" name="email" placeholder="Email" />
          <InputField colorBg="black" colorText="white" name="password" placeholder="Пароль" type="password" />
          <button
            className={styles.auth__button}
            disabled={!Object.keys(formState.dirtyFields).length || !formState.isValid}
            type="submit"
          >
            Зарегестрироваться
          </button>
          <a className={styles.auth__span} href="singin">
            Уже зарегистрированы? Войти
          </a>
        </form>
      </FormProvider>
    </div>
  );
});
