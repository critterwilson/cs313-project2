const lyricModel = require("../models/lyricModel.js");
/*****************************************************
* GET LYRIC TITLES
* Gets a list of all of the titles of previously 
* written songs in the DB
*****************************************************/
function getLyricTitles(req, res) {
	// get a list of all the titles
	console.log("Getting all lyric titles...")

	lyricModel.getAllLyricTitles(function(error, results) {
		res.json(results);
	});
}

/*****************************************************
* GET LYRIC
* Retrieves a lyrics and title from a prieviously
* written song in the DB
*****************************************************/
function getLyric(req, res) {
	// parse get for data
	var id = req.query.id;

	// log it
	// console.log("Getting lyric with id: " + id);

	lyricModel.getLyricById(id, function(error, results) {
		res.json(results);
	});
}

/*****************************************************
* POST LYRIC
* Posts a new set of lyrics and title to the DB
*****************************************************/
function postLyric(req, res){
	// parse post for data
	var title = req.body.title;
	var lyrics = req.body.lyrics;

	// log it
	// console.log("Creating a new lyric with title: " + title);
	// console.log("...and lyrics: " + lyrics);

	lyricModel.insertNewLyric(title, lyrics, function(error, results) {
		res.json(results);
	});	
}

module.exports = {
	getLyricTitles: getLyricTitles,
	getLyric: getLyric,
	postLyric: postLyric
};