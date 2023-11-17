let searchInput = document.querySelector('#search-input');
let searchButton = document.querySelector('#search-button');
let cardsContainer = document.querySelector('.cards-container');

const fetchAPI = () => {
  cardsContainer.innerHTML = '';

  let apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchInput.value}?key=5KZNVBS78BXNU9MJWS9T4LD9E`;

  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let loc = document.createElement('h3');
      loc.textContent = data.resolvedAddress;
      document.querySelector('#title').appendChild(loc);

      let days = data.days;

      days.map((el) => {
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        let datetime = document.createElement('p');
        let tempmax = document.createElement('p');
        let tempmin = document.createElement('p');
        let icon = document.createElement('img');

        datetime.textContent = el.datetime;
        tempmax.textContent = el.tempmax;
        tempmin.textContent = el.tempmin;
        icon.src = `./assets/icons/${el.icon}.svg`;
        icon.alt = el.icon;

        cardDiv.append(datetime, tempmax, tempmin, icon);
        cardsContainer.appendChild(cardDiv);
      });
    });
};

searchButton.addEventListener('click', fetchAPI);
window.addEventListener('keypress', (e) => {
  e.key == 'Enter' ? fetchAPI() : '';
});

(() => {
  cardsContainer.innerHTML = '';
  let apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Manila?key=5KZNVBS78BXNU9MJWS9T4LD9E`;

  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let loc = document.createElement('h3');
      loc.textContent = data.resolvedAddress;
      document.querySelector('#title').appendChild(loc);

      let days = data.days;

      days.map((el) => {
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'fade-in');

        let datetime = document.createElement('p');
        let tempmax = document.createElement('p');
        let tempmin = document.createElement('p');
        let icon = document.createElement('img');

        datetime.textContent = el.datetime;
        tempmax.textContent = el.tempmax + '°C';
        tempmin.textContent = el.tempmin + '°C';
        icon.src = `./assets/icons/${el.icon}.svg`;
        icon.alt = el.icon;

        cardDiv.append(icon, datetime, tempmax, tempmin);
        cardsContainer.appendChild(cardDiv);
      });
    });
})();

window.addEventListener('DOMContentLoaded', () => {
  searchInput.focus();

  setTimeout(() => {
    let cards = document.querySelectorAll('.card');
    console.log(cards);
    cards.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        el.classList.add('color-change-2x');
      });
      el.addEventListener('mouseleave', () => {
        el.classList.remove('color-change-2x');
      });
    });
  }, 1000);
});

let header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.style.opacity = '0.5';
  setTimeout(() => {
    header.style.opacity = '1';
  }, 1500);
});
