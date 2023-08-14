import React from 'react';

export default function PopupWithForm(props) {
  return (
    <section className={`modal ${props.isOpen ? 'open' : ''}`}>
      <div className={'overlay'} onClick={props.onClose}></div>
      <div className={`modal__container modal__container_${props.name}`}>
        <button
          type='button'
          className={`modal__button-close modal__button-close_${props.name}`}
          onClick={props.onClose}
        ></button>
        <form
          onSubmit={props.onSubmit}
          name='modal_form'
          className={`form form-${props.name}`}
        >
          <h2 className={'modal__heading'}>{props.title}</h2>
          {props.children}
          <button
            type='submit'
            className={`modal__button-save modal__button-save-${props.name}`}
            disabled={props.isDisabled}
          >
            {props.button}
          </button>
        </form>
      </div>
    </section>
  );
}
