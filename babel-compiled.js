"use strict";

document.querySelector(".api-search").addEventListener("click", getResult);

function getResult(e) {
  var searchQuery = document.getElementById("search-query").value;

  var request = new XMLHttpRequest();

  request.open(
    "GET",
    "https://api.publicapis.org/entries?title=" + searchQuery,
    true
  );
  request.onload = function() {
    if (this.status === 200) {
      var response = JSON.parse(this.responseText);
      console.log(response);
      var output = "";
      if (response.count > 0) {
        response.entries.forEach(function(api) {
          output +=
            '\n                <article class="search-result grow">\n                <h2>' +
            api.API +
            "</h2>\n                <p>" +
            api.Description +
            "</p\n                <ul>\n                <li>Auth: " +
            api.Auth +
            "</li>\n                <li>HTTPS: " +
            api.HTTPS +
            "</li>\n                <li>CORS: " +
            api.Cors +
            "</li>\n                </ul>\n                <button onclick=\"location.href='" +
            api.Link +
            "'\" class='fade'>Go to API</button>\n                </article>\n                ";
        });
      } else {
        output += "<h3>No Results</h3>";
      }
      document.querySelector(".result-container").innerHTML = output;
    }
  };
  request.send();
  e.preventDefault();
}
