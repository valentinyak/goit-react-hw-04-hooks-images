const KEY = '18971005-ed9d64a9f1a2bb3296a1c2dd7';

function fetchImages(query, page) {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Нет результатов по запросу ${query}`));
  });
}

const pixabayAPI = { fetchImages };

export default pixabayAPI;
