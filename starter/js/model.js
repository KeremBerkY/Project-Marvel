import { async } from "regenerator-runtime";
import { PUBLIC_KEY, PRIVATE_KEY, apiBaseURL, hashVal, TS } from "./config";
import searchView from "./searchView";

////// DENEME 1 //////
// Creates a URL for searching Marvel API for comics with titles starting with a given search term
// export const createURL = function () {
//   // Get the current timestamp
//   const ts = Date.now();
//   console.log(ts);

//   // Create a new URLSearchParams object and set the necessary query parameters
//   const params = new URLSearchParams({
//     ts: ts,
//     apikey: PUBLIC_KEY,
//     hash: md5(ts + PRIVATE_KEY + PUBLIC_KEY), // Generate hash for authentication
//   });
//   // Construct the endpoint URL for searching comics with the query parameters
//   const endpoint = `${apiBaseURL}/characters?`; // Notice the question mark to start the query parameters.

//   // Combine the endpoint URL with the query parameters to form the complete API request URL
//   const url = endpoint + params;

//   // Return the complete API request URL
//   return url;
// };
// const url = createURL();

// fetch(url)
//   .then((response) => response.json())
//   .then((data) => {
//     // Handle the API response here
//     console.log(data);
//   })
//   .catch((error) => {
//     // Handle any errors that occur during the API request
//     console.error(error);
//   });

//////////////////////////////////////////////////////
////// DENEME 2 //////
// export const loadRecipe = async function (id) {
//   try {
//     const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
//     state.recipe = createRecipeObject(data);

//     if (state.bookmarks.some((bookmark) => bookmark.id === id))
//       state.recipe.bookmarked = true;
//     else state.recipe.bookmarked = false;

//     console.log(state.recipe);
//   } catch (err) {
//     // Temp error handling
//     console.error(`${err} 💥💥💥💥`);
//     throw err;
//   }
// };

//////////////////////////////////////////////////////
////// DENEME 3 //////

// let input = document.getElementById("input-box");
// let button = document.getElementById("submit-button");
// let showContainer = document.getElementById("show-container");
// let listContainer = document.querySelector(".list");

// let date = new Date();

// console.log(date.getTime());

// const [timestamp, apiKey, hashValue] = [TS, PUBLIC_KEY, hashVal];

// function displayWords(value) {
//   input.value = value;
//   removeElements();
// }

// function removeElements() {
//   listContainer.innerHTML = "";
// }

// input.addEventListener("keyup", async () => {
//   removeElements();
//   if (input.value.length < 4) {
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

// button.addEventListener(
//   "click",
//   (getRsult = async () => {
//     // if (input.value.trim().length < 1) {
//     //   alert("Input cannot be blank");
//     // }
//     showContainer.innerHTML = "";
//     const url = `${apiBaseURL}/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hashVal}&name=${input.value}`;

//     const response = await fetch(url);
//     const jsonData = await response.json();
//     console.log(response, jsonData);

// jsonData.data["results"].forEach((element) => {
//   showContainer.innerHTML = `
//     <div class="card-container">
//       <div class="container-character-image">
//         <img src="${
//           element.thumbnail["path"] + "." + element.thumbnail["extension"] // kod resmin tam yolunu oluşturur: "/images/pictures/pic1.jpg"
//         }"/></div>
//       <div class="character-name">${element.name}</div>
//       <div class="character-description">${element.description}</div>
//     </div>`;
// });
//   })
// );
// window.onload = () => {
//   getRsult();
// };

//////////////////////////////////////////////////////
////// DENEME 3 //////

/////// devam... //////////
// const button = document.getElementById("submit-button");

// const showCharacters = async function (query) {
//   try {
//     console.log(query);
//     const res = await fetch(
//       `${apiBaseURL}/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hashVal}&name=${query}`
//     );
//     const data = await res.json();
//     console.log(res, data);

//     if (!res.ok)
//       throw Error(
//         `💥💥there is no character found with that name! (${res.status})`
//       );
//   } catch (err) {
//     alert(err);
//   }
// };

/////////////////////////////////////////////////////

// const showCharacters = async function () {
//   try {
//     // console.log(query);
//     const res = await fetch(
//       `${apiBaseURL}/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hashVal}&name=${"iron man"}`
//     );
//     const data = await res.json();
//     console.log(res, data);

//     if (!res.ok)
//       throw Error(
//         `💥💥there is no character found with that name! (${res.status})`
//       );
//   } catch (err) {
//     alert(err);
//   }
// };
// showCharacters();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// export const state = {
//   results: {},
// };

// export const loadCharacter = async function () {
//   // const res = await fetch(
//   //   // `${apiBaseURL}/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hashVal}&name=${"iron man"}`
//   //   `${apiBaseURL}/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hashVal}&id=${1009664}`
//   // );
//   // // id-thor = 1009664;
//   // const data = await res.json();
//   // console.log(res, data);
//   // console.log(data.data.results);
//   // if (data.data.count === 0)
//   //   throw Error(`💥💥there is no character found with that name!`);
//   // let results = data.data.results[0];
//   // console.log(results);
//   // state.results = {
//   //   comics: results.comics,
//   //   description: results.description,
//   //   events: results.events,
//   //   id: results.id,
//   //   modified: results.modified,
//   //   name: results.name,
//   //   resourceURI: results.resourceURI,
//   //   series: results.series,
//   //   resources: results.resources,
//   //   thumbnail: results.thumbnail,
//   //   urls: results.urls,
//   // };
//   // console.log(results);
//   // console.log(state.results);
// };
// loadCharacter();

// export const loadSearchResults = async function (query) {
//   const res = await fetch(`
//   ${apiBaseURL}/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hashVal}&name=${query}
//   `);
//   console.log(res);
// };
// loadSearchResults("hulk");
