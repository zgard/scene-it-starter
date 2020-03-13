document.addEventListener('DOMContentLoaded',function(){
    var watchlistJSON = localStorage.getItem("watchlist");
    var watchlist = JSON.parse(watchlistJSON);

    function renderMovies(movieArray) {
        var moviesHTML = movieArray.map(function(currentMovie){
            return `
            <div class="movie card col-2" style="width: 18rem; padding: 10px; margin: 5px; flex-wrap: wrap;">
            <img class="image card-img-top" src="${currentMovie.Poster}"/>
						<div class="card-body">
							<h1 class="movie-title card-title" style="width: 100%;">${currentMovie.Title}</h1>
							<h2 class="movie-release-date card-text">${currentMovie.Year}</h2>
                        </div>
            </div>
            `
        }).join('');
    return moviesHTML;
    }
    var moviesContainer = document.getElementById('movies-container');

    moviesContainer.innerHTML = renderMovies(watchlist);
});