import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function PopupEditProfile(props) {
  const [inputName, setInputName] = useState(
    localStorage.getItem('profileName') || ''
  );
  const [inputDescription, setInputDescription] = useState(
    localStorage.getItem('profileDescription') || ''
  );
  const [inputNameFalse, setinputNameFalse] = useState(false);
  const [inputNameError, setinputNameError] = useState('');
  const [inputDescriptionFalse, setInputDescriptionFalse] = useState(false);
  const [inputDescriptionError, setInputDescriptionError] = useState('');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (
      inputNameError === null &&
      inputDescriptionError === null &&
      inputName &&
      inputDescription
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [inputNameError, inputDescriptionError, inputName, inputDescription]);

  useEffect(() => {
    if (props.isOpen) {
      setInputName(props.inputName);
      setInputDescription(props.inputDescription);
    }
  }, [props.isOpen, props.profileName, props.profileDescription]);

  const handleNameChange = (e) => {
    const input = e.target;
    setInputName(input.value);

    if (!input.validity.valid) {
      setinputNameError(input.validationMessage);
    } else {
      setinputNameError(null);
    }
  };

  const handleDescriptionChange = (e) => {
    const input = e.target;
    setInputDescription(input.value);

    if (!input.validity.valid) {
      setInputDescriptionError(input.validationMessage);
    } else {
      setInputDescriptionError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdate(inputName, inputDescription);
  };

  const focusHandle = (e) => {
    switch (e.target.name) {
      case 'user':
        setinputNameFalse(true);
        break;
      case 'img_link':
        setInputDescriptionFalse(true);
        break;
    }
  };

  return (
    <PopupWithForm
      title='Редактировать Профиль'
      name='edit'
      isOpen={props.isOpen}
      onClose={props.onClose}
      button='Сохранить'
      onSubmit={handleSubmit}
      isDisabled={!formValid}
    >
      <input
        className='input__text'
        type='text'
        name='user'
        placeholder='Имя'
        id='userIn'
        required
        value={inputName}
        onChange={handleNameChange}
        pattern='^[A-Za-zА-Яа-яЁё\s -]+$'
        minLength='2'
        maxLength='40'
        onFocus={(e) => focusHandle(e)}
      />
      {inputNameError && inputDescriptionFalse && (
        <span className='error-message first'>{inputNameError}</span>
      )}
      <input
        className='input__text'
        type='text'
        name='img_link'
        placeholder='Описание'
        pattern='^[A-Za-zА-Яа-яЁё\s -]+$'
        minLength='2'
        maxLength='200'
        id='discriptionIn'
        required
        value={inputDescription}
        onChange={handleDescriptionChange}
        onFocus={(e) => focusHandle(e)}
      ></input>
      {inputDescriptionError && inputNameFalse && (
        <span className='error-message second'>{inputDescriptionError}</span>
      )}
    </PopupWithForm>
  );
}
