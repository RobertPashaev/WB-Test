import React from 'react';

export default function PopupImage(props) {
  return (
    <div id='modal-container' className='containerImg '>
      <div className='modal_img'></div>
      <div id='modal'>
        <button
          id='close-my-modal-btn2'
          className='icon_close'
          onClick={props.onClose}
        ></button>
        <img id='modal-image' src={props.imageUrl} alt='modal content' />

        <p
          className='modal__caption'
          name='image-caption'
          id='modal-caption'
        ></p>
      </div>
    </div>
  );
}
