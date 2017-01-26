// Initialize Firebase
var config = {
    apiKey: "AIzaSyB8IWqUnT6A5vzhrGOm56wUNMZvNBNjEIs",
    authDomain: "movieq-d9325.firebaseapp.com",
    databaseURL: "https://movieq-d9325.firebaseio.com",
    storageBucket: "movieq-d9325.appspot.com",
    messagingSenderId: "139642987985"
};
firebase.initializeApp(config);

//API variables (base URL, image, and ApiKey) for fight room.
var baseUrl = "https://api.themoviedb.org/3/";
var imageUrl = "https://image.tmdb.org/t/p/w300"
var movieApiKey = "api_key=9f7c638352a37a88f16032189ac08772";
var and = "&";

// Example of api request // https://api.themoviedb.org/3/movie/550?api_key=9f7c638352a37a88f16032189ac08772 // Gets movie fight club
$.ajax({
    url: 'https://api.themoviedb.org/3/movie/550',
    type: 'GET',
    data: 'api_key=9f7c638352a37a88f16032189ac08772', // or $('#myform').serializeArray()
    success: function (data) { /*console.log(data);*/ }
});

//So in this one we're getting all the favorite movies.
$.ajax({
    url: baseUrl + 'discover/movie',
    type: 'GET',
    data: 'sort_by=popularity.desc&' + movieApiKey, // or $('#myform').serializeArray()
    success: function (data) {
        // console.log(data); 
        //FUNCTION 
        processPopularMovies(data);
    }
});

//Process JSON for list of popular movies.........
function processPopularMovies(data) {
    // Returns 20 popular movies
    var movies = data.results;
    for (i = 0; i < movies.length; i++) {
        // console.log(movies[i]);
        // Make panel then add to grid
        $('#movieList').append(makePanel(movies[i]));
    }
}

function getImage(data) {
    if (data.poster_path == null) {
        return "";
    }
    else {
        return imageUrl + data.poster_path;
    }
}

function makePanel(movie) {
    // Take information here and convert into an html object
    var trimmedString = movie.overview.substring(0, 140);
    if (trimmedString.length < movie.overview.length) trimmedString += "...";
    $('#movieList').text = '';
    var panel = '<div class="col-sm-4">' +
        '<div class="panel panel-success">' +
        ' <div class="panel-heading">' + movie.title + '</div>' +
        '<div class="panel-body">' +
        '<img src="' + getImage(movie) + '" class="img-responsive" style="width:100%" alt="Image"></div>' +
        '<div class="panel-footer">' + trimmedString + '</div>' +
        '</div></div>';
    // console.log(baseUrl + "movie?" + movie.poster_path + and + movieApiKey);
    return panel;
}


/*ALL MY SEARCH CODE. At this point, Most of these could be combined with the popular movie functions, 
but I wrote them separately just in case they need to be different*/

//SEARCH BAR RESULTS

// var prefix = document.getElementById("prefix");
$('#prefix').keyup(function (data) {
    // console.log(data.key);
    $('#searchResultList').children().remove();
    console.log($('#prefix').val());
    searchMovies();
});
// prefix.addEventListener("keyup", searchMovies());

//get Search results
//https://api.themoviedb.org/3/search/movie?api_key=9f7c638352a37a88f16032189ac08772&query=la+la+land
function searchMovies() {
    $.ajax({
        url: baseUrl + 'search/movie?',
        type: 'GET',
        data: movieApiKey + and + 'query=' + $('#prefix').val(), // or $('#myform').serializeArray()
        success: function (data) {
            processSearchMovies(data);
        }
    });
}

function processSearchMovies(data) {
    var movies = data.results;
    console.log(movies);
    for (i = 0; i < movies.length; i++) {
        $('#searchResultList').append(makeSearchPanel(movies[i]));
    }
}

function makeSearchPanel(movie) {
    var trimmedString = movie.overview.substring(0, 140);
    if (trimmedString.length < movie.overview.length) trimmedString += "...";
    $('#searchResultList').text = '';
    var panel = '<div class="col-sm-4">' +
        '<div class="panel panel-success">' +
        ' <div class="panel-heading">' + movie.title + '</div>' +
        '<div class="panel-body">' +
        '<img src="' + getImage(movie) + '" class="img-responsive" style="width:100%" alt="Image"></div>' +
        '<div class="panel-footer">' + trimmedString + '</div>' +
        '</div></div>';
    console.log(baseUrl + "movie?" + movie.poster_path + and + movieApiKey);
    return panel;
}
