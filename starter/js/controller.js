import * as model from "./model";
import searchView from "./searchView";
import { PUBLIC_KEY, PRIVATE_KEY, apiBaseURL, hashVal, TS } from "./config";
import icons from "url:../img/icons.svg";
import { async } from "regenerator-runtime";

const characterContainer = document.querySelector(".character");
const searchBtnClass = document.querySelector(".search__btn");
const form = document.getElementById("search-id");
const btnId = document.getElementById("search-btn");
const inputBox = document.getElementById("input-box");
const searchResults = document.querySelector(".search-results");
const resultsContainer = document.querySelector(".results");

searchBtnClass.addEventListener("click", async function (event) {
  event.preventDefault();

  const inputVal = inputBox.value;
  const searchData = await showCharacters(inputVal);
});

const renderSpinner = function (parentEl) {
  const markup = `
        <div class="spinner">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
        </div>
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

const showCharacters = async function (query) {
  try {
    // Loading Character
    renderSpinner(characterContainer);

    const res = await fetch(
      `${apiBaseURL}/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hashVal}&name=${query}`
    );
    const data = await res.json();
    console.log(res, data);
    console.log(data.data.results);

    if (data.data.count === 0)
      throw Error(`💥💥there is no character found with that name!`);

    let results = data.data.results[0];
    results = {
      comics: results.comics,
      description: results.description,
      events: results.events,
      id: results.id,
      modified: results.modified,
      name: results.name,
      resourceURI: results.resourceURI,
      series: results.series,
      resources: results.resources,
      thumbnail: results.thumbnail,
      urls: results.urls,
    };
    console.log(results);

    // Character results
    const markup = `
              <figure class="character__fig">
              <img src="${
                results.thumbnail["path"] + "." + results.thumbnail["extension"]
              }" alt="Marvel Character" class="character__img" />
              <h1 class="character__title">
                <span>${results.name}</span>
              </h1>
            </figure>

            <div class="character__description-container">
              <p class="character__description">${results.description}</p>
              <div class="bookmark-flex">
                <button class="comic__bookmark-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="12"
                    viewBox="0 0 384 512"
                    class="bookmark-icon"
                  >
                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                    <path
                      d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="comics">
              <h1 class="comics__header">
              <span>Character Comics</span>
              </h1>
              <ul class="character__comics-container">
                <li class="character__comics">${
                  results.comics.items[0].name
                }</li>
                <li class="character__comics">${
                  results.comics.items[1].name
                }</li>
                <li class="character__comics">${
                  results.comics.items[2].name
                }</li>
                <li class="character__comics">${
                  results.comics.items[3].name
                }</li>
              </ul>
              <a href="#">Learn More</a>
            </div>
    `;
    characterContainer.innerHTML = "";
    characterContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    alert(err);
  }
};

////////// SEARCH RESULTS PART //////////
function removeElements() {
  resultsContainer.innerHTML = "";
}

function displayWords(value) {
  inputBox.value = value;
  removeElements();
  showCharacters(value);
}

inputBox.addEventListener("keyup", async function (event) {
  removeElements();
  if (inputBox.value.length < 2) {
    return false;
  }
  const inputVal = inputBox.value.trim();

  const url = `${apiBaseURL}/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hashVal}&nameStartsWith=${inputVal}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.addEventListener("click", function () {
      displayWords(name);
    });
    let word = "<b>" + name.substr(0, inputVal.length) + "</b>";
    word += name.substr(inputVal.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    resultsContainer.appendChild(div);
  });

  const resultsPerPage = 5;
  const totalResult = jsonData.data.results;
  console.log(jsonData.data);
  console.log(totalResult);

  const totalPages = Math.ceil(totalResult / resultsPerPage);

  function showResults(page = 1) {
    const start = (page - 1) * resultsPerPage; // 0
    const end = page * resultsPerPage; // 9
    console.log(start, end);
    return jsonData.data["results"].slice(start, end);
  }
  showResults();
});
