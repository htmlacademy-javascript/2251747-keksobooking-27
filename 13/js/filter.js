import { setPins } from './map.js';
import { debounce } from './util.js';

const mapFormEl = document.querySelector('.map__filters');
const mapFiltersSelects = mapFormEl.querySelectorAll('select');
const mapFiltersInputs = mapFormEl.querySelectorAll('input');

const housingTypeEl = mapFormEl.querySelector('#housing-type');
const housingPriceEl = mapFormEl.querySelector('#housing-price');
const housingRoomsEl = mapFormEl.querySelector('#housing-rooms');
const housingGuestsEl = mapFormEl.querySelector('#housing-guests');
const featureCheckboxesEl = mapFormEl.querySelectorAll('.map__checkbox');

const OFFERS_COUNT = 10;
const Price = {
  MIDDLE: 10000,
  HIGH: 50000,
};


let offers = [];

const filterByType = (offer, type) =>
  type === 'any' || offer.offer.type === type;

const filterByPrice = (offer, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return offer.offer.price < Price.MIDDLE;
    case 'middle':
      return (
        offer.offer.price < Price.HIGH && offer.offer.price > Price.MIDDLE
      );
    case 'high':
      return offer.offer.price >= Price.HIGH;
  }
};

const filterByRooms = (offer, rooms) =>
  rooms === 'any' || offer.offer.rooms === Number(rooms);

const filterByGuests = (offer, guests) =>
  guests === 'any' || offer.offer.guests === Number(guests);

const filterByFeatures = (offer, features) => {
  if (!features.length) {
    return true;
  }
  if (!offer.offer.features) {
    return false;
  }

  return features.every((feature) => offer.offer.features.includes(feature));
};

const setPinsForFilteredOffers = () => {
  const selectedType = housingTypeEl.value;
  const selectedPrice = housingPriceEl.value;
  const selectedRooms = housingRoomsEl.value;
  const selectedGuests = housingGuestsEl.value;
  const selectedFeatures = [];
  featureCheckboxesEl.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedFeatures.push(checkbox.value);
    }
  });

  const filteredOffers = [];
  for (const offer of offers) {
    if (filteredOffers.length >= OFFERS_COUNT) {
      break;
    }
    if (
      filterByType(offer, selectedType) &&
      filterByPrice(offer, selectedPrice) &&
      filterByRooms(offer, selectedRooms) &&
      filterByGuests(offer, selectedGuests) &&
      filterByFeatures(offer, selectedFeatures)
    ) {
      filteredOffers.push(offer);
    }
  }
  setPins(filteredOffers);
};

const setOffers = (resp) => {
  offers = resp;
  setPinsForFilteredOffers();
};

const disableFilters = () => {
  mapFormEl.classList.add('map__filters--disabled');
  mapFiltersSelects.forEach((select) => {
    select.setAttribute('disabled', true);
  });
  mapFiltersInputs.forEach((input) => {
    input.setAttribute('disabled', true);
  });
  mapFormEl.querySelector('fieldset').setAttribute('disabled', true);
};

const setInputsChange = (cb) => {
  mapFiltersInputs.forEach((input) => {
    input.removeAttribute('disabled');
    input.addEventListener('change', () => {
      cb();
    });
  });
};

const setFiltersChange = (cb) => {
  mapFiltersSelects.forEach((select) => {
    select.removeAttribute('disabled');
    select.addEventListener('change', () => {
      cb();
    });
  });
};

const enableFilters = () => {
  mapFormEl.classList.remove('map__filters--disabled');
  setFiltersChange(debounce(() => setPinsForFilteredOffers()));
  setInputsChange(debounce(() => setPinsForFilteredOffers()));
  mapFormEl.querySelector('fieldset').removeAttribute('disabled');
};

export {setOffers, disableFilters, setPinsForFilteredOffers, enableFilters};
