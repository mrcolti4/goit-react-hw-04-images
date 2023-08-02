import axios from 'axios';

const API_KEY = '21419534-f22d97d920e680e447d0b52ac';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const getImageByQuery = async params => {
  const { data } = await axios({
    params: {
      key: API_KEY,
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
