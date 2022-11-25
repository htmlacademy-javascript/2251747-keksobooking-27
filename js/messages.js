const isEscapeKey = (evt) => evt.key === 'Escape';

const onPopupEscKeydown = (alreadyAddedElement, evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    alreadyAddedElement.remove();
  }
};

const showMessage = (selector, hasButton, additionalFunction) => {
  const template = document.querySelector(`#${selector}`).content.querySelector(`.${selector}`);
  const elementToBeAdded = template.cloneNode(true);
  document.querySelector('body').appendChild(elementToBeAdded);
  const alreadyAddedElement = document.querySelector(`.${selector}`);
  alreadyAddedElement.addEventListener('click', () => alreadyAddedElement.remove());
  document.addEventListener('keydown', (event) => onPopupEscKeydown(alreadyAddedElement, event));
  if (hasButton) {
    const button = document.querySelector(`.${selector}__button`);
    button.addEventListener('click', () => {
      alreadyAddedElement.remove();
      if (additionalFunction) {
        additionalFunction();
      }
    });
  }
};

export { showMessage };
