import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function PopupAddCard(props) {
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');
  const [cardNameFalse, setCardNameFalse] = useState(false);
  const [cardLinkFalse, setCardLinkFalse] = useState(false);
  const [cardNameError, setCardNameError] = useState('');
  const [cardLinkError, setCardLinkError] = useState('');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (
      cardNameError === null &&
      cardLinkError === null &&
      cardName &&
      cardLink
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [cardNameError, cardLinkError, cardName, cardLink]);

  const focusHandle = (e) => {
    switch (e.target.name) {
      case 'cardName':
        setCardNameFalse(true);
        break;
      case 'cardLink':
        setCardLinkFalse(true);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.onAddCard) {
      props.onAddCard({
        name: cardName,
        link: cardLink,
      });
    }

    setCardName('');
    setCardLink('');
  };

  const handleCardNameChange = (e) => {
    const input = e.target;
    setCardName(input.value);

    if (!input.validity.valid) {
      setCardNameError(input.validationMessage);
    } else {
      setCardNameError(null);
    }
  };

  const handleCardLinkChange = (e) => {
    const input = e.target;
    setCardLink(input.value);

    if (!input.validity.valid) {
      setCardLinkError(input.validationMessage);
    } else {
      setCardLinkError(null);
    }
  };

  return (
    <PopupWithForm
      title='Новое Место'
      name='AddImg'
      isOpen={props.isOpen}
      onClose={props.onClose}
      button='Сохранить'
      onSubmit={handleSubmit}
      isDisabled={!formValid}
    >
      <input
        className='input__text'
        type='text'
        name='cardName'
        placeholder='Название'
        required
        pattern='^[A-Za-zА-Яа-яЁё\s -]+$'
        minLength='2'
        maxLength='40'
        value={cardName}
        onChange={(e) => {
          handleCardNameChange(e);
        }}
        onFocus={(e) => focusHandle(e)}
      />
      {cardNameFalse && cardNameError && (
        <span className='error-message first'>{cardNameError}</span>
      )}
      <input
        className='input__text'
        type='url'
        name='cardLink'
        placeholder='Ссылка на картинку'
        id='linkImg'
        required
        value={cardLink}
        onChange={(e) => {
          handleCardLinkChange(e);
        }}
        onFocus={(e) => focusHandle(e)}
      />
      {cardLinkFalse && cardLinkError && (
        <span className='error-message second'>{cardLinkError}</span>
      )}
    </PopupWithForm>
  );
}
