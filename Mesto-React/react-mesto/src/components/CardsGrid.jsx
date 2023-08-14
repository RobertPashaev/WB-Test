import React from 'react';
import Card from './Card';

export default function CardsGrid(props) {
  return (
    <section className='elements__grid'>
      {props.cards.map((card) => (
        <Card
          key={card._id}
          card={card}
          onImageClick={props.openImageModal}
          onCardRemove={props.onCardRemove}
          currentUserId={props.currentUserId}
          onLikeToggle={props.onLikeToggle}
        />
      ))}
    </section>
  );
}
