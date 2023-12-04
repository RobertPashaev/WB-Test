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
  link: z.string().max(1000).regex(new RegExp(completeUrlRegex), 'Введите адрес Сайта'),
  name: z.string().min(4, 'Длинна должна быть не менее 3 символов'),
});

export type FormTypeCard = z.infer<typeof formSchema>;

type Props = {
  onClose: () => void;
  showModal: boolean;
  onSubmit: (data: FormTypeCard) => void;
};

export const AddNewCardModalView = memo(({ showModal, onClose, onSubmit }: Props) => {
  const methods = useForm<FormTypeCard>({
    mode: 'onSubmit',
    resolver: zodResolver(formSchema),
  });

  const { formState } = methods;

  return (
    <Modal handleCloseModal={onClose} showModal={showModal} title="Новое место ">
      <FormProvider
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...methods}
      >
        <form className={styles.modal__inputs} onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField name="name" placeholder="Название" type="text" />
          <InputField name="link" placeholder="Ссылка на изображение" type="url" />
          <button
            className={styles.modal__button}
            disabled={!Object.keys(formState.dirtyFields).length || !formState.isValid}
            type="submit"
          >
            Создать
          </button>
        </form>
      </FormProvider>
    </Modal>
  );
});
