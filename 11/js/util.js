import { getData } from './api.js';
import {enableForm} from './form.js';
import { setPins } from './map.js';
import { showMessage } from './messages.js';


function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } return NaN;
}

function getRandomFloat (min,max, count) {

  const random = (Math.random() * (max - min) + min).toFixed(count);

  if (min >= 0 && max >= min) {
    return parseFloat(random);
  } return NaN;
}

const START_COORDINATE = {
  lat: 35.67285,
  lng: 139.81741,
};

const getDataFunc = () => {
  getData(
    (items) => {
      enableForm();
      setPins(items);
    },
    () => showMessage('load-error', true, () => getDataFunc())
  );
};

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

export {
  getRandomArrayElement,
  getRandomInt,
  getRandomFloat,
  getDataFunc,
  START_COORDINATE
};
