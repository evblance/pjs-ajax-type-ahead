const JSON_ENDPOINT = 'https://data.nasa.gov/resource/y77d-th95.json';

const resultContainer = document.getElementById('results');
const searchInput = document.getElementById('search');

/** 
 * Updates the DOM with the results of the lookup.
 * @param {string} search The search string that was used in the lookup. 
 * @param {any[]} results The array of lookup results.
 */
const showResults = (search, results) => {
  // Clear our results
  resultContainer.innerHTML = '';

  // Make the results available in the DOM
  for (let result of results) {
    const res = document.createElement('div');
    res.classList.add('result');

    // We want the HTML representing the name to have the search term highlighted
    const nameEl = document.createElement('div');
    nameEl.innerHTML = result.name.replace(search, `<span class="highlighted">${search}</span>`);
    nameEl.classList.add('data');

    const massEl = document.createElement('div');
    // Represent the mass in tonnes for brievity
    const massVal = document.createTextNode(
      result.mass ?
      `${(parseInt(result.mass, 10) / 1000).toFixed(1)} tonnes` :
      `-`
    );
    massEl.appendChild(massVal);
    massEl.classList.add('data');

    res.appendChild(nameEl);
    res.appendChild(massEl);
    resultContainer.appendChild(res);
  }
};

/**
 * Handles changes on the search input.
 * @param {any} event The input change event. 
 */
const handleInputChange = (event) => {
  const search = event.target.value || '';
  const regExp = new RegExp(search, 'gi');
  const results = asteroids.filter((asteroid) => {
    return asteroid.name.match(regExp) ? true : false;
  });
  showResults(search, results);
};

// We need to handle the user's search as they type into the search input
searchInput.addEventListener('keyup', handleInputChange);

// Cache our asteroid search database by request to our endpoint;
let asteroids = [];
const request = fetch(JSON_ENDPOINT);
request
  .then(response => response.json())
  .then((data) => {
    asteroids = data;
  })
  .then(() => showResults('', asteroids));
