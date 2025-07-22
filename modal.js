const background = document.getElementById('modal-background');
const modalContainer = document.getElementById('modal-container');

let currentMovie = {};

function backgroundClickHandler() {
  overlay.classList.remove('open');
}

function closeModal() {
  overlay.classList.remove('open');
}

function addCurrentMovieToList() {
  if (isMovieInList(currentMovie))
    return notie.alert({
      type: 'error',
      text: 'Filme já foi adicionado na sua lista',
    });

  addToList(currentMovie);
  updateUI(currentMovie);
  updateLocalStorage();
  closeModal();
}

function createModal(data) {
  currentMovie = data;

  modalContainer.innerHTML = `
    <h2 id="modal-title">${data.Title} - ${data.Year}</h2>
          <section id="modal-body">
            <img id="movie-poster" src=${data.Poster} alt="poster do filme ${data.Title}">
            <div id="movie-info">
              <p id="movie-plot"><h3>${data.Plot}</h3></p>
              <p id="movie-cast"><h4>Elenco:</h4> <h5>${data.Actors}</h5></p>
              <p id="movie-genre"><h4>Gênero:</h4> <h5>${data.Genre}</h5></p>
            </div>
          </section>

          <section id="modal-footer">
            <button id="add-to-list" onclick="addCurrentMovieToList()">Adicionar à minha lista</button>
          </section>
    `;
}

background.addEventListener('click', backgroundClickHandler);
