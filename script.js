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
        ).toFixed(1)}M population</p>
            <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
            <p class="country__row"><span> 🏢</span>${data.capital[0]}</p>
            </div>
            </article>
            `;

  countriesContainer.insertAdjacentHTML('beforeend', card);
  countriesContainer.style.opacity = 1;
};

//Displays the country & its neighbouring Countries
const getCountryAndNeighbour = async function (country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );

    if (!response.ok) throw new Error(`Country not found ... 🔥`);

    const data = await response.json();

    // console.log(data[0]);
    // render a card of the country searched
    renderCountry(data[0]);

    const neigbouringCountries = data[0].borders;

    if (!neigbouringCountries) return;
    console.log(neigbouringCountries);
    //render the neighbouring Countries

    neigbouringCountries.map(neighbour => {
      fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
        .then(res => res.json())
        .then(data2 => {
          console.log(data2);

          renderCountry(data2[0], 'neighbour');
        });
    });
  } catch (error) {
    console.log(error);
  }
};

//uses the userInput to render a country
document.getElementById('submit').addEventListener('click', function (e) {
  e.preventDefault();

  const userInput = inputText.value;
  userInput !== '' && getCountryAndNeighbour(userInput);
  countriesContainer.textContent = '';
  userInput.textContent = '';
});
