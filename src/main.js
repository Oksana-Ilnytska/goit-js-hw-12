import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  clearGallery();
  hideLoadMoreButton();

  currentQuery = e.target.elements['search-text'].value.trim();
  if (!currentQuery) {
    iziToast.warning({
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