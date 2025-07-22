const searchButton = document.getElementById('search-button');
const overlay = document.getElementById('modal-overlay');
const movieNameInput = document.getElementById('movie-name');
const movieYearInput = document.getElementById('movie-year');
const movieListContainer = document.getElementById('movie-list');

//let movieList = [];
let movieList = JSON.parse(localStorage.getItem('movieList')) || [];

async function searchButtonClickHandler() {
  try {
    const movieName = movieNameInput.value.split(' ').join('+');
    let movieYear = movieYearInput.value;

    console.log(movieName, movieYear);

    if (movieName === '') {
      throw new Error('Informe o nome do Filme');
    }

    if (movieYear === '') {
      movieYear = '';
    } else if (movieYear.length !== 4 || Number.isNaN(Number(movieYear))) {
      throw new Error('Informe o ano do Filme com 4 digitos numéricos');
    } else {
      movieYear = `&y=${movieYear}`;
    }

    let url = ` https://www.omdbapi.com/?i=tt3896198&apikey=${key}&t=${movieName}${movieYear}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    if (data.Error) {
      throw new Error('Filme não encontrado');
    }

    createModal(data);

    overlay.classList.add('open');
  } catch (error) {
    notie.alert({ type: 'error', text: error.message });
    console.log(error);
  }
}

function addToList(movie) {
  movieList.push(movie);
}

function isMovieInList(movie) {
  return movieList.some((m) => m.imdbID === movie.imdbID);
}

function updateUI(movie) {
  movieListContainer.innerHTML += `<article id="movie-card-${movie.imdbID}">
          <img src=${movie.Poster} alt="Poster do filme ${movie.Title}" />
          <button class="remove-button" onclick="{removeFilmFromList('${movie.imdbID}')}">
            <i class="bi bi-trash3"></i> Remover
          </button>
        </article>
        `;
}

function removeFilmFromList(id) {
  notie.confirm({
    text: 'Tem certeza que deseja remover esse filme?',
    submitText: 'Sim',
    cancelText: 'Cancelar',
    position: 'top',
    submitCallback: () => {
      movieList = movieList.filter((m) => m.imdbID !== id);

      document.getElementById(`movie-card-${id}`).remove();

      updateLocalStorage();
    },
  });
}

function updateLocalStorage() {
  localStorage.setItem('movieList', JSON.stringify(movieList));
}

for (let movie of movieList) {
  updateUI(movie);
}

searchButton.addEventListener('click', searchButtonClickHandler);
