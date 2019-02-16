const apiKey = '5d576382955ff5829fc3844390db4427';
const baseAPIUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;

$(function () {
  // After the DOM has loaded, call afterGoClicked after any time the button is clicked
  $('#findThatFilm').click(afterGoClicked);
})

function afterGoClicked() {
  // Read the selected genre id from the select boxes and save it to a variable
  // Hint: use the JQuery .val() function on the element
  // Documentation: http://api.jquery.com/val/
  var genreSelect = $('#genre').val();
  // Read the entered year from the text box and save it to a variable
  var yearInput = $('#year').val();
  // Call buildQueryString to handle building a completeUrl
  var completeUrl = buildQueryString(baseAPIUrl, genreSelect, yearInput);
  // Load the JSON from the API with completeUrl, and then call the afterDataLoaded function
  $.getJSON(completeUrl, afterDataLoaded);

}

function afterViewMoreClicked() {
  window.open('http://www.google.com/search?q=' + this.dataset.title + " " + this.dataset.release_date.substring(0,4), '_blank');
}

function afterAmazonSearchClicked() {
  window.open('http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=' + this.dataset.title + " " + this.dataset.release_date.substring(0,4), '_blank');
}

/* Combine the baseUrl, genre, and year together to create a complete url with the
  right query parameters. Then return the url.

  Check out examples query params at https://www.themoviedb.org/documentation/api/discover
*/
function buildQueryString(baseUrl, genre, year){
  var completedUrl = baseUrl + '&' + "with_genres" + "=" + genre + "&" + "primary_release_year" + "=" + year;
  return completedUrl;
}

// Call this function with the data object that comes back from getJSON
function afterDataLoaded(dataObject){
  // All images have this base URL
  var posterBaseUrl = "https://image.tmdb.org/t/p/w500";
  var movieResults = dataObject.results;

  /* Loop over the results in the dataObject. 
    HINT: use your debugger to find the name
    of the property that includes the array of results. 
  */
  for (var i = 0; i < 9; i++){   //Maybe changing movieResults.length to 9
    
    $("#movieName" + i).html(movieResults[i].title);//Find the attribute to name within the movie object
    $("#movieOverview" + i).html(movieResults[i].overview); 
    $("#movieImg" + i).attr("src", posterBaseUrl + movieResults[i].poster_path);
    $("#movieVote" + i).text("Vote Rating:" + " " + movieResults[i].vote_average);
    $('#googleSearch' + i).attr("data-title", movieResults[i].title);
    $('#googleSearch' + i).attr("data-release_date", movieResults[i].release_date); 
    $('#googleSearch' + i).click(afterViewMoreClicked);
    $('#amazonSearch' + i).attr("data-title", movieResults[i].title);
    $('#amazonSearch' + i).attr("data-release_date", movieResults[i].release_date);
    $('#amazonSearch' + i).click(afterAmazonSearchClicked);  
  };

  
  
  /* For each result:
    - Look up a corresponding img element (in order)
    - Set the img element's src tag to posterBaseUrl + the poster_path from the result movie
   */
  

  //This code executes i = 19, which shows Way of The Gun
  //Ask how to loop over and capture each index for every movieImg element
}