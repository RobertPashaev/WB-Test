import React, { memo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '@/app/react-hook-form/custom-fields';
import { Modal } from '@/app/shared/components/modal';
import styles from './index.module.scss';

const completeUrlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const formSchema = z.object({
  avatar: z.string().max(1000).regex(new RegExp(completeUrlRegex), 'Введите адрес изображения'),
});

export type FormType = z.infer<typeof formSchema>;

type Props = {
  onClose: () => void;
  showModal: boolean;
  onSubmit: (data: FormType) => void;
};

export const EditAvatarModalView = memo(({ showModal, onClose, onSubmit }: Props) => {
  const methods = useForm<FormType>({
    mode: 'onSubmit',
    resolver: zodResolver(formSchema),
  });
  const { formState } = methods;

  return (
    <Modal handleCloseModal={onClose} showModal={showModal} title="Обновить Аватар">
      <FormProvider
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...methods}
      >
        <form className={styles.modal__inputs} onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField name="avatar" placeholder="Ссылка на изображение" type="url" />
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
