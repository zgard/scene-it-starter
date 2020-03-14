document.addEventListener('DOMContentLoaded',function(){
    
    function renderMovies(movieArray) {
        var moviesHTML = movieArray.map(function(currentMovie){
            return `
            <div class="movie card col-2" style="width: 18rem; padding: 10px; margin: 5px; flex-wrap: wrap;">
            <img class="image card-img-top" src="${currentMovie.Poster}"/>
						<div class="card-body">
							<h1 class="movie-title card-title" style="width: 100%;">${currentMovie.Title}</h1>
							<h2 class="movie-release-date card-text">${currentMovie.Year}</h2>
							<button class="addButton" onclick="saveToWatchlist('${currentMovie.imdbID}')">Add</button>
                        </div>
            </div>
            `
        }).join('');
    return moviesHTML;
    }
    var moviesContainer = document.getElementById('movies-container');

    moviesContainer.innerHTML = renderMovies(movieData);

    document.getElementById("input").addEventListener("input", function(e){
        e.preventDefault()
        var searchString = e.target.value.toLowerCase();
        let urlEncodedSearchString = encodeURIComponent(searchString);
        axios.get("http://www.omdbapi.com/?apikey=3430a78&s=" + urlEncodedSearchString)
            .then(function(response){
                console.log(response.data);
            });
		var filteredData = movieData.filter(function (movie) {
			var foundInTitle = movie.Title.toLowerCase().indexOf(searchString) > -1;
			var foundInDate = movie.Year.toLowerCase().indexOf(searchString) > -1;
			return foundInTitle || foundInDate;
        });
        document.getElementById('movies-container').innerHTML = renderMovies(filteredData);
    });
    
});

function saveToWatchlist(imdbID){
    var movie = movieData.find(function(currentMovie){
        return currentMovie.imdbID == imdbID;
    });
    var watchlistJSON = localStorage.getItem("watchlist");
    var watchlist = JSON.parse(watchlistJSON);
    if (watchlistJSON == null){
        watchlist = [];
    }
        watchlist.push(movie);
        watchlistJSON = JSON.stringify(watchlist);
        localStorage.setItem("watchlist", watchlistJSON);
    }