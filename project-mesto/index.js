document.getElementById('btnEdit').addEventListener('click', function () {
  const nameValue = document.getElementById('name-active').textContent;
  const descriptionValue =
    document.getElementById('discription-active').textContent;

  document.querySelector('input[name="user"]').value = nameValue;
  document.querySelector('input[name="user__description"]').value =
    descriptionValue;

  document.getElementById('my-modal').classList.add('open');
});

const saveBtn = document.querySelector('.save__btn');
const closeModalBtn = document.getElementById('close-my-modal-btn');

saveBtn.addEventListener('click', () => {
  saveData();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    saveData();
  }
});

closeModalBtn.addEventListener('click', () => {
  document.getElementById('my-modal').classList.remove('open');
});

function saveData() {
  const nameInput = document.querySelector('input[name="user"]');
  const descriptionInput = document.querySelector(
    'input[name="user__description"]'
  );
  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.discription');

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  document.getElementById('my-modal').classList.remove('open');
}

const addBtn = document.getElementById('addBtn');
const closeModalBtnAdd = document.getElementById('close-my-modal-btn_add');

addBtn.addEventListener('click', function () {
  document.getElementById('my-modal_add').classList.add('open');
});

closeModalBtnAdd.addEventListener('click', function () {
  document.getElementById('my-modal_add').classList.remove('open');
});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const parentElement = document.querySelector('.elements__grid');

function createCardElement(card) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('grid__element');

  const imageElement = document.createElement('img');
  imageElement.classList.add('grid__image');
  imageElement.src = card.link;
  imageElement.alt = 'image';

  const descriptionElement = document.createElement('div');
  descriptionElement.classList.add('elements_discription');

  const titleElement = document.createElement('h2');
  titleElement.classList.add('elements__text');
  titleElement.textContent = card.name;

  const likeButton = document.createElement('button');
  likeButton.classList.add('like');

  const trashIcon = document.createElement('div');
  trashIcon.classList.add('trash-icon');
  trashIcon.style.backgroundImage = "url('/images/Trash.svg')";

  descriptionElement.appendChild(trashIcon);
  descriptionElement.appendChild(titleElement);
  descriptionElement.appendChild(likeButton);

  trashIcon.addEventListener('click', function () {
    const cardElement = this.closest('.grid__element');

    if (cardElement) {
      cardElement.remove();
    }
  });

  cardElement.appendChild(imageElement);
  cardElement.appendChild(descriptionElement);

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('liked');
    if (likeButton.classList.contains('liked')) {
      likeButton.style.backgroundImage = "url('/images/Union.svg')";
    } else {
      likeButton.style.backgroundImage = "url('/images/like.svg')";
    }
  });

  return cardElement;
}

const createButton = document.querySelector('.save__btn_add');

createButton.addEventListener('click', function () {
  const nameInput = document.querySelector(
    '.input__text_add input[name="name"]'
  );
  const linkInput = document.querySelector(
    '.input__text_link input[name="img_link"]'
  );

  const nameValue = nameInput.value;
  const linkValue = linkInput.value;

  if (nameValue && linkValue) {
    const newCard = {
      name: nameValue,
      link: linkValue,
    };

    const cardElement = createCardElement(newCard);

    if (parentElement.children.length >= 6) {
      parentElement.lastChild.remove();
    }

    parentElement.insertBefore(cardElement, parentElement.firstChild);

    nameInput.value = '';
    linkInput.value = '';

    document.getElementById('my-modal_add').classList.remove('open');
  }
});

for (let i = 0; i < initialCards.length; i++) {
  const card = initialCards[i];
  const cardElement = createCardElement(card);
  parentElement.appendChild(cardElement);
}

const modalContainer = document.getElementById('modal-container');
const modalImage = document.getElementById('modal-image');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close-my-modal-btn2');

function openModal(imageUrl) {
  modalImage.src = imageUrl;
  modalContainer.style.visibility = 'visible';
  modalContainer.style.opacity = '1';
}

function closeModal() {
  modalContainer.style.visibility = 'hidden';
  modalContainer.style.opacity = '0';
}

const cardImages = document.querySelectorAll('.grid__image');

cardImages.forEach(function (image) {
  image.addEventListener('click', function () {
    const imageUrl = image.getAttribute('src');
    openModal(imageUrl);
  });
});

overlay.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);

const trashIcon = document.createElement('div');
trashIcon.classList.add('trash-icon');
trashIcon.style.backgroundImage = "url('/images/Trash.svg')";

descriptionElement.appendChild(trashIcon);
descriptionElement.appendChild(titleElement);
descriptionElement.appendChild(likeButton);
