import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function PopupUpdateAvatar(props) {
  const [avatarLink, setAvatarLink] = useState('');
  const [avatarLinkError, setAvatarLinkError] = useState('');
  const [avatarLinkFalse, setAvatarLinkFalse] = useState(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (avatarLinkError === null && avatarLink) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [avatarLinkError, avatarLink]);

  const handleAvatarChange = (e) => {
    const input = e.target;
    setAvatarLink(input.value);

    if (!input.validity.valid) {
      setAvatarLinkError(input.validationMessage);
    } else {
      setAvatarLinkError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.onUpdateAvatar) {
      props.onUpdateAvatar(avatarLink);
    }
  };

  const focusHandle = (e) => {
    if (e.target.name === 'avatar_link') {
      setAvatarLinkFalse(true);
    }
  };

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='updateAvatar'
      isOpen={props.isOpen}
      onClose={props.onClose}
      button='Сохранить'
      onSubmit={handleSubmit}
      isDisabled={!formValid}
    >
      <input
        className='input__text'
        type='url'
        name='avatar_link'
        placeholder='Ссылка на картинку'
        id='linAvatar'
        required
        onChange={handleAvatarChange}
        onFocus={focusHandle}
      />
      {avatarLinkFalse && avatarLinkError && (
        <span className='error-message avatar' id='update_error'>
          {avatarLinkError}
        </span>
      )}
    </PopupWithForm>
  );
}
