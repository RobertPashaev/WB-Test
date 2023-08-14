import React, { useState } from 'react';

export default function Card(props) {
  const [imageFailed, setImageFailed] = useState(false);
  const [likesCount, setLikesCount] = useState(props.card.likes.length); // <-- добавили это
  const [isLiked, setIsLiked] = useState(
    props.card.likes.some((like) => like._id === props.currentUserId)
  );

  const handleImageError = () => {
    setImageFailed(true);
  };

  const handleRemoveClick = () => {
    props.onCardRemove(props.card._id);
  };

  const handleLikeClick = () => {
    props.onLikeToggle(props.card._id, isLiked).then((newLikesCount) => {
      setIsLiked(!isLiked);
      setLikesCount(newLikesCount);
    });
  };
  if (imageFailed) return null;

  const imageUrl = props.card?.link || '...defaultLink...';

  const showTrashIcon =
    props.currentUserId &&
    props.card.owner._id &&
    props.currentUserId === props.card.owner._id;
  const trashIconStyle = showTrashIcon ? {} : { display: 'table-row' };

  return (
    <div className='grid__element'>
      <img
        className='grid__image'
        src={imageUrl}
        alt='Beautiful landscape'
        onError={handleImageError}
      />
      <div className='elements_discription'>
        <div
          className='trash-icon'
          onClick={showTrashIcon ? handleRemoveClick : null}
          style={trashIconStyle}
        ></div>
        <h2 className='elements__text'>{props.card?.name || 'Default name'}</h2>
        <button
          className={`like ${isLiked ? 'is-liked' : ''}`}
          onClick={handleLikeClick}
        >
          <h2 className='like__counter'>{likesCount}</h2>
        </button>
      </div>
    </div>
  );
}
