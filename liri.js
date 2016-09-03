var fs = require("fs");

// command line arguments
var inputString = process.argv;

fs.readFile("liri.js",'utf8', function(error, data) {
	var keysOutput = data.split("");
});

var inquire = require('inquirer');

// questions as a list
inquire.prompt([
{
  type: "list",
  message: "Pick from the list below?",
  choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
  name: "pickCase"
  }

]).then(function (user) {

  console.log(user.pickCase);

  //Twitter
  switch(user.pickCase) {
    case "my-tweets":
    var keys = require("./keys.js");
    var Twitter = require('twitter');
    var params = {screen_name: 'Wmunro1',count: 20};
    var client = new Twitter({
      consumer_key: keys.twitterKeys.consumer_key,
      consumer_secret: keys.twitterKeys.consumer_secret,
      access_token_key: keys.twitterKeys.access_token_key,
      access_token_secret: keys.twitterKeys.access_token_secret
    }); 


    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (var i = 0; i <= 18; i++) {
          console.log(tweets[i].text);   
        }
      }
    });

    break;
 
  //Spotify
    case "spotify-this-song":
    var spotify = require('spotify');
      inquire.prompt([
        {
          type: "input",
          message: "What song would you like to choose?",
          name: "songChoice"
        }

        ]).then(function(song) {

          spotify.search({ type: 'track', query: title || song.songChoice }, function(err, data) 
          {
          		if ( err ) 
          {
            console.log('Error occurred: ' + err);
            return;
          } 
          		else 
          {
            var songInfo = data.tracks.items[0];

            var artist = songInfo.artists[0].name;

            console.log("Artist Name: " + artist);

            var song = songInfo.name;

            console.log("Song Name: " + song);

            var preview = songInfo.preview_url;

            console.log("Preview: " + preview);

            var album = songInfo.album.name;

            console.log("Album Name: " + album);
          }

        });

          
        }); 

    break;

  //OMBD
    case "movie-this":
    inquire.prompt([
    {
      type: "ipnut",
      message: "What movie would you like to choose?",
      name: "movieChoice"
      }
      ]).then(function (movies) {
      var queryUrl = 'http://www.omdbapi.com/?t=' + movies.movieChoice + '&y=&plot=full&tomatoes=true&r=json'; 
      console.log("The user typed: " + movies.movieChoice);

      var request = require('request');
      request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        console.log("The Title of the movie is: " + JSON.parse(body)["Title"]);
        console.log("The Year the movie was released: " + JSON.parse(body)["Year"]);
        console.log("The IMDB Rating is: " + JSON.parse(body)["imdbRating"]);
        console.log("The country the movie was made is: " + JSON.parse(body)["Country"]);
        console.log("The language is done in: " + JSON.parse(body)["Language"]);
        console.log("The Plot is: " + JSON.parse(body)["Plot"]);
        console.log("The actors staring in this movie: " + JSON.parse(body)["Actors"]);
        console.log("The IMDB Rating is: " + JSON.parse(body)["imdbRating"]);
        console.log("The Rotten Tomatoes rating is: " + JSON.parse(body)["tomatoMeter"]);
        console.log("The Rotten Tomatoes url is: " + JSON.parse(body)["tomatoURL"]);
        }
      });    
    });
    break;
    //do-what-it-says
    case "do-what-it-says":
	
    var random = require("./random.txt");
	var spotify = require('spotify');
	console.log("random");
    
  }; 
}); //end of app

