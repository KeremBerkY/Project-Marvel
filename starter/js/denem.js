import * as model from "./model";
import searchView from "./searchView";
import { PUBLIC_KEY, PRIVATE_KEY, apiBaseURL, hashVal, TS } from "./config";
import icons from "url:../img/icons.svg";
import { async } from "regenerator-runtime";

// const controlSearchResults = async function () {
//   try {
//     // 1) Get search query
//     const query = searchView.getQuery();
//     if (!query) return;

//     // 2) Load search results
//     await model.showCharacters(query);

//     // 3) Render results
//   } catch (err) {
//     alert(err);
//   }
// };

// const init = function () {
//   searchView.addHandlerSearch(controlSearchResults);
// };
// init();

/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//////////// AŞAĞISI DENEME /////////////////
/////////////////////////////////////////////////////////
/*
const controlSearchResults = async function () {
  try {
    // renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await showCharacters(query);

    // 3) Render results
    // resultsView.render(model.state.search.results);
    // resultsView.render(model.getSearchResultsPage());

    // // 4) Render initial pagnation buttons
    // paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
};
init();
*/
/////////////////////////////////////////////////////////
////////////// Çalışan /////////////////
/////////////////////////////////////////////////////////

const characterContainer = document.querySelector(".character");
const searchBtnClass = document.querySelector(".search__btn");
const form = document.getElementById("search-id");
const btnId = document.getElementById("search-btn");
const inputBox = document.getElementById("input-box");
const searchResults = document.querySelector(".search-results");
const resultsContainer = document.querySelector(".results");

/////////// Sayfa yüklendiğinde character() fonksiyonu çalıştırma denemesi //////////
////1)
//// character() fonksiyonu denemeleri/////
// document.addEventListener("DOMContentLoaded", function () {
//   character(); // Sayfa yüklendiğinde character() fonksiyonunu çağırma
// });
////2)
// window.onload = function () {
//   character(); // Sayfa yüklendiğinde character() fonksiyonunu çağırma
// };

//////////////////////////////////////////////////////////////////////
////////////// SEARCH BTN PART //////////////////
//////////////////////////////////////////////////////////////////////

///// SEARCH BTN 2 /////
////1) deneme
// btnId.addEventListener("click", function () {
//   character();
// });

// function character() {
//   let name = document.getElementById("input-box").value;

//   if (name !== null && name !== "") {
//     form.addEventListener("submit", function (event) {
//       event.preventDefault();
//       showCharacters(name);
//     });
//   } else {
//     console.error("Type Name & Press ENTER to get the result....");
//   }
// }

////2) deneme
// function character() {
//   let name = document.getElementById("input-box").value;

//   if (name !== null && name.trim() !== "") {
//     showCharacters(name);
//   } else {
//     console.error("Type Name & Press ENTER to get the result....");
//   }
// }

///// SEARCH BTN 1 /////

searchBtnClass.addEventListener("click", async function (event) {
  event.preventDefault();

  const inputVal = inputBox.value;
  const searchData = await showCharacters(inputVal);
});
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

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
      // `${apiBaseURL}/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hashVal}&name=${"iron man"}`
      // `${apiBaseURL}/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hashVal}&id=${1009664}`
      `${apiBaseURL}/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hashVal}&name=${query}`
    );
    // id-thor = 1009664;
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

//////////////////// DENEMELER ///////////////////////////////////
// document
//   .querySelector(".search__btn")
//   .addEventListener("click", async function (event) {
//     event.preventDefault();

//     const query = document.getElementById("input-box").value;

//     return query;
//     // const res = await fetch(
//     //   `${apiBaseURL}/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hashVal}&name=${query}`
//     // );

//     // const data = await res.json();
//     // console.log(data);
//   });
//////////////////// DENEMELER ///////////////////////////////////
// searchResults;
// inputBox;

// inputBox.addEventListener("input", async function () {
//   const inputValue = this.value.trim();

//   if (inputValue !== "") {
//     const res = await fetch(
//       `${apiBaseURL}/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hashVal}&name=${query}`
//     );
//   }
// });

//////////////////////// AUTO COMPLETE DENEME //////////////////////////////////////////
//////////////////// DENEME 1 ///////////////////////////////////

function removeElements() {
  resultsContainer.innerHTML = "";
}

// inputBox.addEventListener("keyup", async function () {
//   removeElements();
//   if (inputBox.value.length < 2) {
//     return false;
//   }

//   const url = `${apiBaseURL}/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hashVal}&nameStartsWith=${input.value}`;

//   const response = await fetch(url);
//   const jsonData = await response.json();

//   jsonData.data["results"].forEach((result) => {
//     let name = result.name;
//     let div = document.createElement("div");
//     div.style.cursor = "pointer";
//     div.classList.add("autocomplete-items");
//     div.setAttribute("onclick", "displayWords('" + name + "')");
//     let word = "<b>" + name.substr(0, input.value.length) + "</b>";
//     word += name.substr(input.value.length);
//     div.innerHTML = `<p class="item">${word}</p>`;
//     listContainer.appendChild(div);
//   });
// });

//////////////////// DENEMELER 2 ///////////////////////////////////

// const inputBox = document.getElementById("yourInputBoxID"); // Input alanınızın ID'siyle değiştirin
// const suggestionsDiv = document.getElementById("suggestions"); // Öneri listesini göstereceğiniz div'in ID'siyle değiştirin
// resultsContainer;

// inputBox.addEventListener("keyup", async function (event) {
//   const inputVal = inputBox.value.trim();

//   if (inputVal !== "") {
//     // renderSpinner(characterContainer); // Spinner göster

//     try {
//       const searchData = await showCharacters(inputVal);
//       renderSuggestions(searchData.data.results); // Öneri listesini göstermek için renderSuggestions fonksiyonunu çağırın
//     } catch (error) {
//       console.error(error);
//       // Hata durumunu ele alın
//     }
//   } else {
//     resultsContainer.innerHTML = ""; // Eğer input boşsa, öneri listesini temizle
//   }
// });

// const renderSuggestions = function (results) {
//   resultsContainer.innerHTML = ""; // Öneri listesini temizle

//   // Eğer sonuç varsa, öneri listesini oluştur
//   if (results && results.length > 0) {
//     const ulElement = document.createElement("ul");

//     results.forEach((result) => {
//       const liElement = document.createElement("li");
//       liElement.textContent = result.name; // Örnek olarak, sonuçların isimleri gösterilecek
//       ulElement.appendChild(liElement);
//     });

//     resultsContainer.appendChild(ulElement); // Öneri listesini div içine ekle
//   } else {
//     resultsContainer.textContent = "No results found"; // Eğer sonuç yoksa, bir mesaj göster
//   }
// };

//////////////////// DENEMELER 3 (sonuç alındı ama tıklayınca ismin tamamı yazılmıyor arama yerine) ///////////////////////////////////
// function displayWords(value) {
//   const inputVal = inputBox.value.trim();
//   inputVal = value;
//   // inputBox.value = value;
//   removeElements();
// }

// inputBox.addEventListener("keyup", async function (event) {
//   removeElements();
//   if (inputBox.value.length < 2) {
//     return false;
//   }
//   const inputVal = inputBox.value.trim();
//   console.log(inputVal);

//   const url = `${apiBaseURL}/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hashVal}&nameStartsWith=${inputVal}`;

//   const response = await fetch(url);
//   const jsonData = await response.json();

//   jsonData.data["results"].forEach((result) => {
//     let name = result.name;
//     let div = document.createElement("div");
//     div.style.cursor = "pointer";
//     div.classList.add("autocomplete-items");
//     div.setAttribute("onclick", "displayWords('" + name + "')");
//     let word = "<b>" + name.substr(0, inputVal.length) + "</b>";
//     word += name.substr(inputVal.length);
//     div.innerHTML = `<p class="item">${word}</p>`;
//     resultsContainer.appendChild(div);
//   });
// });

//////////////////// DENEMELER 4 (çalışıyor) ///////////////////////////////////

// //// Results yol 2) (onclick çalışmıyor yine)
// let htmlContent = "";
// jsonData.data["results"].forEach((result) => {
//   let name = result.name;
//   let word =
//     "<b>" +
//     name.substr(0, inputVal.length) +
//     "</b>" +
//     name.substr(inputVal.length);
//   htmlContent += `
//   <div style="cursor: pointer;" class="autocompleteItems">
//     <p class="item" onclick="displayWords('${name}')">${word}</p>
//   </div>
// `;
// });
// resultsContainer.innerHTML = htmlContent;

function displayWords(value) {
  // const inputVal = inputBox.value.trim();
  // inputVal = value;
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

  // Results yol 1)
  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    // div.setAttribute("onclick", "displayWords('" + name + "')");
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

//////////////////// DENEMELER 5  ///////////////////////////////////
/*
function displayWords(value) {
  // const inputVal = inputBox.value.trim();
  // inputVal = value;
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

  // Results yol 1)
  // jsonData.data["results"].forEach((result) => {
  //   let name = result.name;
  //   let div = document.createElement("div");
  //   div.style.cursor = "pointer";
  //   div.classList.add("autocomplete-items");
  //   // div.setAttribute("onclick", "displayWords('" + name + "')");
  //   div.addEventListener("click", function () {
  //     displayWords(name);
  //   });
  //   let word = "<b>" + name.substr(0, inputVal.length) + "</b>";
  //   word += name.substr(inputVal.length);
  //   div.innerHTML = `<p class="item">${word}</p>`;
  //   resultsContainer.appendChild(div);
  // });

  // const resultsPerPage = 8;
  // const totalResult = jsonData.data.results;
  // console.log(jsonData.data);
  // console.log(totalResult);

  // const totalPages = Math.ceil(totalResult / resultsPerPage);

  // function showResults(page = 1) {
  //   const start = (page - 1) * resultsPerPage; // 0
  //   const end = page * resultsPerPage; // 9
  //   console.log(start, end);
  //   return jsonData.data.results.slice(start, end);
  // }
  // const page2results = showResults(2);
  // console.log(page2results);

  // page2results.forEach((result) => {
  //   let name = result.name;
  //   let div = document.createElement("div");
  //   div.style.cursor = "pointer";
  //   div.classList.add("autocomplete-items");
  //   // div.setAttribute("onclick", "displayWords('" + name + "')");
  //   div.addEventListener("click", function () {
  //     displayWords(name);
  //   });
  //   let word = "<b>" + name.substr(0, inputVal.length) + "</b>";
  //   word += name.substr(inputVal.length);
  //   div.innerHTML = `<p class="item">${word}</p>`;
  //   resultsContainer.appendChild(div);
  // });
});
*/
