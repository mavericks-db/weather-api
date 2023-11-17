let searchInput = document.querySelector('#search-input');
let searchButton = document.querySelector('#search-button');
let cardsContainer = document.querySelector('.cards-container');
let title = document.querySelector('#title');

const fetchAPI = (loc) => {
  cardsContainer.innerHTML = '';
  title.innerHTML = '';

  let apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?key=5KZNVBS78BXNU9MJWS9T4LD9E`;

  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let loc = document.createElement('h3');
      loc.textContent = data.resolvedAddress;
      title.appendChild(loc);

      let days = data.days;

      days.map((el) => {
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        let datetime = document.createElement('p');
        let tempmax = document.createElement('p');
        let tempmin = document.createElement('p');
        let icon = document.createElement('img');

        datetime.textContent = el.datetime;
        tempmax.innerHTML = `${el.tempmax} °C <i class="fa-solid fa-temperature-high"></i>`;
        tempmin.innerHTML = `${el.tempmin} °C <i class="fa-solid fa-temperature-low"></i>`;
        icon.src = `./assets/icons/${el.icon}.svg`;
        icon.alt = el.icon;

        cardDiv.append(icon, datetime, tempmax, tempmin);
        cardsContainer.appendChild(cardDiv);
      });
    });
};

searchButton.addEventListener('click', fetchAPI(searchInput.value));
window.addEventListener('keypress', (e) => {
  e.key == 'Enter' ? fetchAPI(searchInput.value) : '';
});

fetchAPI('Manila');

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
  header.style.opacity = '0.9';
  setTimeout(() => {
    header.style.opacity = '1';
  }, 100);
});
