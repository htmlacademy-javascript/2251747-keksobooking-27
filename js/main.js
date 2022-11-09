function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } return NaN;

}
getRandomInt();

function getRandomFloat (min,max, count) {

  const random = (Math.random() * (max - min) + min).toFixed(count);

  if (min >= 0 && max >= min) {
    return parseFloat(random);
  } return NaN;
}
getRandomFloat();
