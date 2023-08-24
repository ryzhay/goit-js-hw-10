import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {fetchBreeds, fetchCatByBreed} from './cat-api';

const refs = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
};

refs.select.addEventListener('change', onChange);
refs.select.classList.add('is-hidden');
refs.error.classList.add('is-hidden');

fetchBreeds()
.then(arr => {
  refs.select.classList.remove('is-hidden');
  refs.loader.classList.add('is-hidden');
  refs.error.classList.add('is-hidden');
  refs.select.innerHTML = createMarkup(arr.data);
  slim();
})
.catch((error) => {
  refs.loader.classList.add('is-hidden');
  Notify.failure(`${refs.error.textContent}`)
});

function onChange(element) {
  element.preventDefault();
  
  refs.loader.classList.remove('is-hidden');
  refs.catInfo.classList.add('is-hidden');
  refs.error.classList.add('is-hidden');
  const elementId = element.target.value;

  fetchCatByBreed (elementId).then(object => {
    refs.catInfo.innerHTML = createCatMarkup(object.data[0]);
    refs.loader.classList.add('is-hidden');
    refs.catInfo.classList.remove('is-hidden');
  })
  .catch((error) => {
    refs.loader.classList.add('is-hidden');
    Notify.failure(`${refs.error.textContent}`)
  })
}


function createMarkup(arr) {
  return arr.map(({ name, id }) => 
  `<option value="${id}">${name}</option>`
  ).join('');
};

function createCatMarkup({
  breeds: {
    0: { temperament, name, description },
  },
  url,
}) {
return `
<img src="${url}" alt="${name}" width="800" height="500" />
<div class="text-wrapper">
<h1 class="title">${name}</h1>
<p class="description">${description}</p>
<h2>Temperament:</h2>
<p class="description">${temperament}</p></div>`;
}

function slim() {
new SlimSelect({
    select: refs.select
  });
}