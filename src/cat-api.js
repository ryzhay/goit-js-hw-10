import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_t7WR3LWulrE757wipaQgxJHEAc73JhVGIoiE7hnxs1VJmr9njD2CsxEchvT0Pkp0";

function fetchBreeds() {
   return axios.get(`https://api.thecatapi.com/v1/breeds`)
};

function fetchCatByBreed(breedId) {
   return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
};

export {fetchBreeds, fetchCatByBreed}