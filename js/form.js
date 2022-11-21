const roomsToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1','2','3'],
  100: ['0'],
};

const guestsToRooms = {
  0: ['100'],
  1: ['1','2','3'],
  2: ['2','3'],
  3: ['3'],
};

const typesToPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
  max: 100000,
};


const adformEl = document.querySelector('.ad-form');
const mapFiltersEl = document.querySelector('.map__filters');

const adformFieldsets = adformEl.querySelectorAll('fieldset');
const mapFiltersSelects = mapFiltersEl.querySelectorAll('select');
const typeEl = adformEl.querySelector('#type');
const priceEl = adformEl.querySelector('#price');
const timeInEl = adformEl.querySelector('#timein');
const timeOutEl = adformEl.querySelector('#timeout');
const roomNumberEl = adformEl.querySelector('#room_number');
const capacityEl = adformEl.querySelector('#capacity');

const disableForm = () => {
  adformEl.classList.add('ad-form--disabled');
  adformFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', true);
  });
  mapFiltersSelects.forEach((select) => {
    select.setAttribute('disabled', true);
  });
  mapFiltersEl.querySelector('fieldset').setAttribute('disabled', true);
};

const enableForm = () => {
  adformEl.classList.remove('ad-form--disabled');
  adformFieldsets.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
  mapFiltersSelects.forEach((select) => {
    select.removeAttribute('disabled');
  });
  mapFiltersEl.querySelector('fieldset').removeAttribute('disabled');
};

const pristine = new Pristine(
  adformEl,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent:'ad-form__element',
  },
  true
);

const validateCapacity = () =>
  roomsToGuests[roomNumberEl.value].includes(capacityEl.value);
const validatePrice = (value) =>
  value >= typesToPrice[typeEl.value] && value <= typesToPrice.max;

const getCapacityErrorMessage = () =>
  `Указанное количество комнат вмещает ${roomsToGuests[roomNumberEl.value].join('или')}гостей.`;

const getRoomNumberErrorMessage = () =>
  `Для указанного количества гостей требуется ${guestsToRooms[capacityEl.value].join('или')}комнаты.`;

const getPriceErrorMessage = () =>
  `Минимальная цена для этого типа жилья ${typesToPrice[typeEl.value]} руб.`;

const onCapacityChange = () => {
  pristine.validate(capacityEl);
  pristine.validate(roomNumberEl);
};

const onRoomNumberChange = () => {
  pristine.validate(capacityEl);
  pristine.validate(roomNumberEl);
};

const onTimeInChange = () => {
  timeOutEl.value = timeInEl.value;
};

const onTimeOutChange = () => {
  timeInEl.value = timeOutEl.value;
};
capacityEl.addEventListener('change', onCapacityChange);
roomNumberEl.addEventListener('change', onRoomNumberChange);
timeInEl.addEventListener('change', onTimeInChange);
timeOutEl.addEventListener('change', onTimeOutChange);

pristine.addValidator(
  capacityEl,
  validateCapacity,
  getCapacityErrorMessage,
);
pristine.addValidator(
  roomNumberEl,
  validateCapacity,
  getRoomNumberErrorMessage,
);
pristine.addValidator(
  priceEl,
  validatePrice,
  getPriceErrorMessage,
);

adformEl.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Готово к отправке');
  } else {
    console.log(pristine.getErrors());
  }
});

export {disableForm, enableForm};
