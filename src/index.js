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
refs.select.classList.add('hidden');
refs.error.classList.add('hidden');

fetchBreeds()
.then(arr => {
  refs.select.classList.remove('hidden');
  refs.loader.classList.add('hidden');
  refs.error.classList.add('hidden');
  refs.select.innerHTML = createMarkup(arr.data);
  slim();
})
.catch(() => {
  refs.loader.classList.add('hidden');
  Notify.failure(`${refs.error.textContent}`)
});

function onChange(event) {
  refs.loader.classList.remove('hidden');
  refs.catInfo.classList.add('hidden');
  refs.error.classList.add('hidden');
  const elementId = event.target.value;

  fetchCatByBreed (elementId).then(object => {
    refs.catInfo.innerHTML = createCatMarkup(object.data[0]);
    refs.loader.classList.add('hidden');
    refs.catInfo.classList.remove('hidden');
  })
  .catch(() => {
    refs.loader.classList.add('hidden');
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
<img src="${url}" alt="${name}" width="350" height="350" />
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