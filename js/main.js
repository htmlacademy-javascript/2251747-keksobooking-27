import {createObjects} from './data.js';
import './card.js';
import {enableForm, disableForm, setAddress} from './form.js';
import { initialMap, setOnMainPinMove, setOnMapLoad, setPins } from './map.js';


const START_COORDINATE = {
  lat: 35.67285,
  lng: 139.81741,
};

const offers = createObjects();

setOnMapLoad(() => {
  setOnMainPinMove(setAddress);
  setAddress(START_COORDINATE);
  enableForm();
  setPins(offers);
});

disableForm();
initialMap(START_COORDINATE);
