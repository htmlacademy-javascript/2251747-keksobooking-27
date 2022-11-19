import {createObjects} from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const imgTemplate = document.querySelector('#card').content.querySelector('.popup__photo');

const objectsList = createObjects();

const cardFragment = document.createDocumentFragment();

const typeDict = {
  flat:     'Квартира',
  bungalow: 'Бунгало',
  house:    'Дом',
  palace:   'Дворец',
  hotel:    'Отель',
};

const selectorDict = {
  title: '.popup__title',
  address: '.popup__text--address',
  price: '.popup__text--price',
  description: '.popup__description',
};

const featuresDict = {
  wifi: '.popup__feature--wifi',
  dishwasher: '.popup__feature--dishwasher',
  parking: '.popup__feature--parking',
  washer: '.popup__feature--washer',
  elevator: '.popup__feature--elevator',
  conditioner: '.popup__feature--conditioner',
};

objectsList.forEach(({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);
  for (const key in offer) {
    if (offer[key]) {
      if (key === 'features') {
        for (const feature in featuresDict) {
          if (!offer.features.includes(feature)) {
            cardElement.querySelector(featuresDict[feature]).classList.add('hidden');
          }
        }
      } else if (key === 'rooms' && offer.guests) {
        cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
      } else if (key === 'checkin' && offer.checkout) {
        cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
      } else if (key === 'type') {
        cardElement.querySelector('.popup__type').textContent = typeDict[offer.type];
      } else if (key === 'photos') {
        const photosFragment = document.createDocumentFragment();
        offer.photos.forEach((e) => {
          const imgElement = imgTemplate.cloneNode(true);
          imgElement.setAttribute('src', e );
          photosFragment.appendChild(imgElement);
        });
        cardElement.querySelector('.popup__photos').innerHTML = '';
        cardElement.querySelector('.popup__photos').appendChild(photosFragment);
      } else if (key !== 'guests' && key !== 'checkout') {
        cardElement.querySelector(selectorDict[key]).textContent = offer[key];
      }
    } else {
      cardElement.querySelector(selectorDict[key]).classList.add('hidden');
    }
  }
  cardElement.querySelector('.popup__avatar').setAttribute('src', author.avatar);
  cardFragment.appendChild(cardElement);
});

mapCanvas.appendChild(cardFragment);
