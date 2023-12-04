import { memo, useCallback } from 'react';
import { userApi } from '@/app/services/UserService';
import { EditProfileModalView, FormType } from '@/app/views/modals/edit-profile-modal-view';

type Props = {
  closeModal: () => void;
  showModal: boolean;
  init: FormType;
};

export const EditProfileModal = memo(({ closeModal, showModal, init }: Props) => {
  const [updateUserInfo] = userApi.useUpdateUserInfoMutation();

  const submitInfoProfile = useCallback(
    async (data: FormType) => {
      try {
        await updateUserInfo(data);
        closeModal();
      } catch (e) {
        console.error(e);
      }
    },
    [closeModal, updateUserInfo],
  );

  return <EditProfileModalView init={init} onClose={closeModal} onSubmit={submitInfoProfile} showModal={showModal} />;
});
