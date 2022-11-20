const adformEl = document.querySelector('.ad-form');
const mapFiltersEl = document.querySelector('.map__filters');
const adformFieldsets = adformEl.querySelectorAll('fieldset');
const mapFiltersSelects = mapFiltersEl.querySelectorAll('select');

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

export {disableForm, enableForm};
