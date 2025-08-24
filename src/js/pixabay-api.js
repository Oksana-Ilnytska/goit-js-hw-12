import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '';

//51926469-17331259ac3d6722fcf98d7c3

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15
      },





    });
    return response.data.hits;
  } catch (error) {
    throw new Error('Error');
  }
}

