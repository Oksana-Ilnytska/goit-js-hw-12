import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


import { getImagesByQuery } from './src/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './src/render-functions.js';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');

let currentQuery = '';
let currentPage = 1;

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  clearGallery();
  hideLoadMoreButton();

  currentQuery = e.target.elements.search.value.trim();
  if (!currentQuery) {
    iziToast.warning({
      title: 'Oops',
      message: 'Please enter a search query',
    });
    return;
  }

  currentPage = 1;
  await fetchAndRenderImages();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchAndRenderImages(true);
});

async function fetchAndRenderImages(isLoadMore = false) {
  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.totalHits === 0) {
      iziToast.info({
        title: 'No results',
        message: 'No images found for this query',
      });
      return;
    }

    createGallery(data.hits);

    // показуємо або ховаємо кнопку Load more
    if (currentPage * 9 >= data.totalHits) {
      hideLoadMoreButton();
      if (isLoadMore) {
        iziToast.info({
          title: 'End',
          message: 'No more images available',
        });
      }
    } else {
      showLoadMoreButton();
    }

    // 👇 плавний скрол тільки для Load more
    if (isLoadMore) {
      const firstCard = document.querySelector('.gallery').firstElementChild;
      if (firstCard) {
        const { height: cardHeight } = firstCard.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images',
    });
  } finally {
    hideLoader();
  }
}