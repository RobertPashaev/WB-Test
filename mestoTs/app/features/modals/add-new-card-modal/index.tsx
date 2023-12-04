import { memo, useCallback } from 'react';
import { cardsApi } from '@/app/services/CardServices';
import { AddNewCardModalView } from '@/app/views/modals/add-new-card-modal-view';

type FormTypeCard = {
  link: string;
  name: string;
};

type Props = {
  closeModal: () => void;
  showModal: boolean;
};

export const AddNewCardModal = memo(({ closeModal, showModal }: Props) => {
  const [addNewCard] = cardsApi.useCreateCardMutation();

  const submitNewCard = useCallback(
    async (data: FormTypeCard) => {
      try {
        await addNewCard(data);
      } catch (e) {
        console.error(e);
      }
      closeModal();
    },
    [addNewCard, closeModal],
  );

  return <AddNewCardModalView onClose={closeModal} onSubmit={submitNewCard} showModal={showModal} />;
});
