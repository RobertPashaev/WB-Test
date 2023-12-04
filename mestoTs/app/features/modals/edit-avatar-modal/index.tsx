import { memo, useCallback } from 'react';
import { userApi } from '@/app/services/UserService';
import { EditAvatarModalView, FormType } from '@/app/views/modals/edit-avatar-modal-view';

type Props = {
  closeModal: () => void;
  showModal: boolean;
};

export const EditAvatarModal = memo(({ closeModal, showModal }: Props) => {
  const [updateUserAvatar] = userApi.useUpdateUserAvatarMutation();

  const submitAvatarProfile = useCallback(
    async (data: FormType) => {
      try {
        await updateUserAvatar(data);
        closeModal();
      } catch (e) {
        console.error(e);
      }
    },
    [closeModal, updateUserAvatar],
  );

  return <EditAvatarModalView onClose={closeModal} onSubmit={submitAvatarProfile} showModal={showModal} />;
});
