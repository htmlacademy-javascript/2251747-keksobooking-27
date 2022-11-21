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

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

export {
  getRandomArrayElement,
  getRandomInt,
  getRandomFloat,
};
