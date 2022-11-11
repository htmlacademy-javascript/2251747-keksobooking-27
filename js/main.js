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

const OFFERSCOUNT = 10;

const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const price = {
  min: 1000,
  max: 100000,
};

const titles = [
  'Дом на берегу черного моря',
  'Квартира с видом на Невский проспект',
  'Хостел Friends',
  'Милая коммуна в центре города',
  'Комната в коммунальной квартире',
  'Бутик-отель',
  'Гостевой дом у Гио',
  'Квартира с видом на горы',
  'Комната на чердаке',
  'Резиденция президента',
  'Домик в деревне',
  'В гостях у сказки',
  'Замок принцессы',
  'Дом дракулы',
];

const times = ['12:00', '13:00', '14:00'];

const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg' ,
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const descriptions = [
'Великолепный дом на берегу черного моря. Подходит как туристам, группе друзей и для семейного отдыха',
'Хостел на краю парка. Без интернета, регистрации и смс.',
'Квартира с видом на Невский проспект . Подходит для всех кто любит Петербург',
'Резиденция президента в старинном центре города. Только для тех кто может себе позволить',
'Комната в коммунальной квартире. Для тех кто любит компанию',
'Милая коммуна в центре города для душевного общения. Ужинаем вместе и играем в «Мафию» по выходным',
'У нас тут все ништяк. Ларек за углом. Шашлык 24 часа. Приезжайте! Интернетов нет!',
'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки',
'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
'С животными просьба не беспокоить.',
'Комната в трёхкомнатной квартире, подойдёт молодым путешественникам.',
'Бутик-отель для ценителей истории. Почуствуй себя героем из прошлого.',
'Дом с привидениями и не только',
'Подарите себе сказку на один день',
];

const location = {
  minLat: 35.65,
  maxLat: 35.7,
  minLong: 139.7,
  maxLong: 139.8,
};


const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];
const createAuthor = (index) => {
  return {
    avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`,
  };
};

const createOffer = () => {
  return {
    title: getRandomArrayElement(titles),
    address: `${getRandomLat()}, ${getRandomLong()}`,
    price: getRandomInt(price.min, price.max),
    type: getRandomArrayElement(types),
    rooms: getRandomInt(1,3),
    guests: getRandomInt(1,3),
    checkin: getRandomArrayElement(times),
    checkout: getRandomArrayElement(times),
    features: features.slice(0, getRandomInt(0, features.length)),
    description: getRandomArrayElement(descriptions),
    photos: Array.from({length: getRandomInt(0, 10)} , () => getRandomArrayElement(photos)),

  }
};

const createLoc = () => {
  return {
    lat: getRandomLat(),
    long: getRandomLong(),
  }
};

const getRandomLat = () => getRandomFloat(location.minLat, location.maxLat, 5);
const getRandomLong = () => getRandomFloat(location.minLong, location.maxLong, 5);

const createObj = (el, index) => ({
  author: createAuthor(index+1),
  offer: createOffer(),
  location: createLoc(),
});

const objects = Array.from({length: OFFERSCOUNT}, createObj);

console.log(objects);
