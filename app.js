document.querySelector(".api-search").addEventListener("click", getResult);

function getResult(e) {
  const searchQuery = document.getElementById("search-query").value;

  const request = new XMLHttpRequest();

  request.open("GET",`https://api.publicapis.org/entries?description=${searchQuery}`,true);
  request.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      console.log(response);
      let output = '';
      if (response.count > 0) {
        response.entries.forEach(api => {
            output += 
                `
                <article class="search-result grow">
                <h2>${api.API}</h2>
                <p>${api.Description}</p
                <ul>
                <li>Auth: ${api.Auth}</li>
                <li>HTTPS: ${api.HTTPS}</li>
                <li>CORS: ${api.Cors}</li>
                </ul>
                <button onclick="location.href='${api.Link}'" class='fade'>Go to API</button>
                </article>
                `             
        });
      } else {
          output += '<h3>No Results</h3>';
      }
      document.querySelector('.result-container').innerHTML = output;
    }
  }
  request.send();
  e.preventDefault();
}
