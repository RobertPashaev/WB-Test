import React, { memo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '@/app/react-hook-form/custom-fields';
import { Modal } from '@/app/shared/components/modal';
import styles from './index.module.scss';

const formSchema = z.object({
  name: z.string().min(3, 'Длинна должна быть больше 3 символов'),
  about: z.string().min(3, 'Длинна должна быть не менее 3 символов'),
});

export type FormType = z.infer<typeof formSchema>;

type Props = {
  onClose: () => void;
  showModal: boolean;
  init: FormType;
  onSubmit: (data: FormType) => void;
};

export const EditProfileModalView = memo(({ showModal, onClose, init, onSubmit }: Props) => {
  const methods = useForm<FormType>({
    mode: 'onSubmit',
    resolver: zodResolver(formSchema),
    defaultValues: init,
  });
  const { formState } = methods;

  return (
    <Modal handleCloseModal={onClose} showModal={showModal} title="Редактировать профиль">
      <FormProvider
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...methods}
      >
        <form className={styles.modal__inputs} onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField name="name" placeholder="Имя" type="text" />
          <InputField name="about" placeholder="Описание" type="text" />
          <button
            className={styles.modal__button}
            disabled={!Object.keys(formState.dirtyFields).length || !formState.isValid}
            type="submit"
          >
            Сохранить
          </button>
        </form>
      </FormProvider>
    </Modal>
  );
});
