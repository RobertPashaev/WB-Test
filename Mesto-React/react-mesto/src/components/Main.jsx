import React, { useState, useEffect, useCallback } from 'react';
import Profile from './Profile';
import PopupAddCard from './PopupAddCard';
import PopupEditProfile from './PopupEditProfile';
import PopupUpdateAvatar from './PopupUpdateAvatar';
import CardsGrid from './CardsGrid';
import PopupImage from './PopupImage';
import avatarImage from '../images/kustojpg.jpg';

import {
  getUserInfo,
  getInitialCards,
  addNewCard,
  deleteCard,
  likeCard,
  unLikeCard,
  updateAvatar,
  updateUserInfo,
} from '../api/api';

export default function Main() {
  const [isAddCardOpen, setAddCardOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isUpdateAvatarOpen, setUpdateAvatarOpen] = useState(false);

  const [profileName, setProfileName] = useState('');
  const [profileDescription, setProfileDescription] = useState(
    'Исследователь океана'
  );

  const [avatarLink, setAvatarLink] = useState(avatarImage);

  const openAddCard = () => setAddCardOpen(true);
  const openEditProfile = () => setEditProfileOpen(true);
  const openUpdateAvatar = () => setUpdateAvatarOpen(true);
  const [cards, setCards] = useState([]);

  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
    getUserInfo()
      .then((data) => {
        setProfileName(data.name);
        setProfileDescription(data.about);
        setAvatarLink(data.avatar);
        setCurrentUserId(data._id);

        localStorage.setItem('profileName', data.name);
        localStorage.setItem('profileDescription', data.about);
      })
      .catch((err) =>
        console.error('Ошибка при загрузке данных пользователя:', err)
      );

    getInitialCards()
      .then((data) => {
        const validCardsPromises = data.map((card) =>
          fetch(card.link)
            .then((response) => (response.ok ? card : null))
            .catch((error) => {
              return null;
            })
        );

        return Promise.all(validCardsPromises);
      })
      .then((validCards) => {
        const filteredCards = validCards.filter(Boolean).slice(0, 6);
        setCards(filteredCards);
      })
      .catch((err) => console.error('Ошибка при загрузке карточек:', err));
  }, []);

  const handleLikeToggle = (cardId, isLiked) => {
    const action = isLiked ? unLikeCard : likeCard;
    return action(cardId)
      .then((updatedCard) => {
        setCards((prevCards) => {
          return prevCards.map((card) =>
            card._id === cardId ? updatedCard : card
          );
        });
        return updatedCard.likes.length;
      })
      .catch((error) => {
        console.error('Ошибка при лайке/дизлайке карточки:', error);
      });
  };

  const handleCardRemove = (cardId) => {
    deleteCard(cardId)
      .then(() => {
        setCards((prevCards) =>
          prevCards.filter((card) => card._id !== cardId)
        );
      })
      .catch((error) => {
        console.error(`Error deleting card: ${error}`);
      });
  };

  const closeAllPopups = () => {
    setAddCardOpen(false);
    setEditProfileOpen(false);
    setUpdateAvatarOpen(false);
  };

  const handleProfileUpdate = (newName, newDescription) => {
    setProfileName(newName);
    setProfileDescription(newDescription);

    updateUserInfo({ name: newName, about: newDescription })
      .then(() => {
        localStorage.setItem('profileName', newName);
        localStorage.setItem('profileDescription', newDescription);
        closeAllPopups();
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных на сервере:', error);
      });
  };

  const handleAddCard = (newCard) => {
    addNewCard(newCard)
      .then((addedCard) => {
        setCards((prevCards) => {
          let newCards;
          if ((prevCards.length = 5)) {
            newCards = [addedCard, ...prevCards];
          } else {
            newCards = [addedCard, ...prevCards.slice(0, 5)];
          }

          return newCards;
        });
        closeAllPopups();
      })
      .catch((error) => {
        console.error('Ошибка при добавлении новой карточки:', error);
      });
  };

  const handleUpdateAvatar = (newAvatarLink) => {
    updateAvatar(newAvatarLink)
      .then(() => {
        setAvatarLink(newAvatarLink);
        closeAllPopups();
      })
      .catch((error) => {
        console.error('Ошибка при обновлении аватара:', error);
      });
  };

  return (
    <>
      <PopupAddCard
        isOpen={isAddCardOpen}
        onClose={closeAllPopups}
        onAddCard={handleAddCard}
      />
      <PopupEditProfile
        isOpen={isEditProfileOpen}
        onClose={closeAllPopups}
        onUpdate={handleProfileUpdate}
      />
      <PopupUpdateAvatar
        isOpen={isUpdateAvatarOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <Profile
        onImageClick={openUpdateAvatar}
        onEditClick={openEditProfile}
        onAddClick={openAddCard}
        profileName={profileName}
        profileDescription={profileDescription}
        avatarLink={avatarLink}
      />
      <CardsGrid
        cards={cards}
        onCardRemove={handleCardRemove}
        currentUserId={currentUserId}
        onLikeToggle={handleLikeToggle}
      />
      <PopupImage />
    </>
  );
}
