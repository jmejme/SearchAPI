document.querySelector(".api-search").addEventListener("click", getResult);

function getResult(e) {
  const searchQuery = document.getElementById("search-query").value;

  const request = new XMLHttpRequest();

  request.open(
    "GET",
    `https://api.publicapis.org/entries?description=${searchQuery}`,
    true
  );
  request.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      console.log(response);
      let output = '';
      if (response.count > 0) {
        response.entries.forEach(api => {
            output += 
            `<li><a href="${api.Link}">${api.API}</a>
                <p>${api.Description}</p>
                <p>Auth Type: ${api.Auth}</p>
                <p>Supports HTTPS: ${api.HTTPS}</p>
                <p>Supports CORS: ${api.Cors}</p>
            </li>`             
        });
      } else {
          output += '<h3>No Results</h3>';
      }

      document.querySelector('.search-result').innerHTML = output;
    }
  }

  request.send();

  e.preventDefault();
}
