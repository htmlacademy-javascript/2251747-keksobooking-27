const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch('https://27.javascript.pages.academy/keksobooking/data');
    if (!response.ok) {
      throw new Error('Не удалось загрузить объявления');
    }
    const items = await response.json();
    onSuccess(items);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch('https://27.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body,
      },
    );
    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    }
    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};

export {getData, sendData};
