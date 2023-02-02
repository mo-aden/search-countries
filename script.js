'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const inputText = document.getElementById('country');

countriesContainer.style.opacity = 1;

///////////////////////////////////////

//render a card w/ country info
const renderCountry = function (data, className = '') {
  const card = `
        <article class="country ${className}">
        <img class="country__img" src=${data.flags.png} />
        <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
            <p class="country__row"><span> 🏢</span>${data.capital[0]}</p>
            </div>
            </article>
            `;

  countriesContainer.insertAdjacentHTML('beforeend', card);
  countriesContainer.style.opacity = 1;
};

// Alternatively create a helper func
const getJSON = function (url, errMessage = 'Something went wrong !!') {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(renderErr(`${errMessage} ${response.status}`));

    return response.json();
  });
};

const renderErr = function (err) {
  countriesContainer.insertAdjacentText('beforeend', err);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);

      const neighbouringCountries = data[0].borders[0];

      console.log(neighbouringCountries);
      if (!neighbouringCountries) return;

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbouringCountries}`,
        "Country doesn't have neighbouring country!"
      );
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.log(`Enter a differrent city or check the spelling ❤️‍🔥❤️‍🔥❤️‍🔥  `);
      // alert(`Wrong country ...`);
    });
};

//uses the userInput to render a country
document.getElementById('submit').addEventListener('click', function (e) {
  e.preventDefault();
  const userInput = inputText.value;

  userInput !== '' && getCountryAndNeighbour(userInput);
});
