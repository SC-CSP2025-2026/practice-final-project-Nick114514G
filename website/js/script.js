const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultContainer = document.getElementById("resultContainer");

function handleSearch() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    alert("Please enter a movie name!");
    return;
  }

  const url = `https://student-api-proxy.onrender.com/api/movie-database-alternative.p.rapidapi.com/?s=${searchTerm}&r=json&page=1`;
const options = {
  method: "GET",
  headers: {
    "X-API-Key": 
    "4dfd925f2120de95ad48cf3073247831f43a6f948a9f160d492c6f4a56a87f48",
  },
};

fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      console.log("API Response:", result);

      if (result.data && result.data.Search) {
        displayMovies(result.data.Search);
      } else {
    resultContainer.innerHTML = "<p style='color: white;'>No movies found!</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }
  
searchBtn.addEventListener("click", function(event) {
  event.preventDefault();
  handleSearch();
});

searchInput.addEventListener("keypress", function(event) {
  if(event.key === "Enter") {
    event.preventDefault();
    handleSearch();
  }
});

function displayMovies(movieList) {
  resultContainer.innerHTML = "";

  movieList.forEach(function(movie) {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie-card");
    const title = document.createElement("h3");
    title.textContent = movie.Title;
    const Poster = document.createElement("img");
    if (movie.Poster !=="N/A") {
    Poster.src = movie.Poster;
    } else {
      Poster.alt = "No Image";
    }

    movieDiv.appendChild(Poster);
        movieDiv.appendChild(title);
        resultContainer.appendChild(movieDiv);
  });
}

