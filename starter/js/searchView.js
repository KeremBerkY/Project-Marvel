// class SearchView {
//   _parentEl = document.querySelector(".input-container");

//   getQuery() {
//     const query = this._parentEl.getElementById("input-box").value;
//     this._clearInput();
//     return query;
//   }

//   _clearInput() {
//     this._parentEl.getElementById("input-box").value = "";
//   }

//   addHandlerSearch(handler) {
//     this._parentEl.addEventListener("submit", function (e) {
//       e.preventDefault();
//       handler();
//     });
//   }
// }

// export default new SearchView();

// class SearchView {
//   _parentEl = document.querySelector(".search");

//   getQuery() {
//     const query = this._parentEl.getElementById("input-box").value;
//     // this._clearInput();
//     console.log(query);
//     return query;
//   }

//   // _clearInput() {
//   //   this._parentEl.getElementById("input-box").value = "";
//   // }

//   addHandlerSearch(handler) {
//     this._parentEl.addEventListener("submit", function (e) {
//       e.preventDefault();
//       handler();
//     });
//   }
// }

// export default new SearchView();
