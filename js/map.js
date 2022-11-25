import { createPopupEl } from './card.js';
import { setAddress } from './form.js';
import { START_COORDINATE } from './util.js';
import {getDataFunc} from './util.js';

const OFFERS = 10;
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 0,
    lng: 0,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const setOnMainPinMove = (callback) => {
  mainPinMarker.on('move', (evt) => callback(evt.target.getLatLng()));
};

const setOnMapLoad = (callback) => {
  map.on('load', callback);
};

const initializeMap = () => {
  map.setView(START_COORDINATE, 10);
  mainPinMarker.addTo(map);
  mainPinMarker.setLatLng(START_COORDINATE);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);
  setOnMainPinMove(setAddress);
  setOnMapLoad(getDataFunc());
};

const createPinMarkers = (offers) => {
  offers.forEach((offer) => {
    const marker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng,
      },
      {
        icon: pinIcon,
      },
    );
    marker.addTo(markerGroup).bindPopup(createPopupEl(offer));
  });
};


const setPins = (offers) => {
  markerGroup.clearLayers();
  createPinMarkers(offers.slice(0, OFFERS));
};

export {initializeMap, setPins};
