import axios from 'axios';

const API_KEY = '21419534-f22d97d920e680e447d0b52ac';

axios.defaults.baseURL = `https://pixabay.com/api`;
axios.defaults.params = { key: API_KEY };

const setDefaultQuery = query => {
  axios.defaults.params = { ...axios.defaults.params, q: query };
};

export const getImageByQuery = async (query = '', params = {}) => {
  // Якщо в нас змінюється запит то ми його зберігаємо
  // в дефолтні параметри, це зроблено для кнопки loadmore у якій
  // змінюється лише page
  if (query !== '') {
    setDefaultQuery(query);
  }
  const { data } = await axios({
    params: {
      ...params,
    },
  });

  const response = data.hits.map(item => {
    return {
      id: item.id,
      webformatURL: item.webformatURL,
      largeImageURL: item.largeImageURL,
    };
  });
  return response;
};
