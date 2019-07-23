const lyricModel = require("../models/lyricModel.js");

function getLyricTitles(req, res) {
	// get a list of all the lyrics
	console.log("Getting all lyric titles...")

	lyricModel.getAllLyricTitles(function(error, results) {
		res.json(results);
	});
}

function getLyric(req, res) {
	var id = req.query.id;

	// get a specific lyric
	console.log("Getting lyric with id: " + id);

	lyricModel.getLyricById(id, function(error, results) {
		res.json(results);
	});
}

function postLyric(req, res){
	var title = req.body.title;
	var lyrics = req.body.lyrics;

	console.log("Creating a new lyric with title: " + title);
	console.log("...and lyrics: " + lyrics);

	lyricModel.insertNewLyric(title, lyrics, function(error, results) {
		res.json(results);
	});	
}

module.exports = {
	getLyricTitles: getLyricTitles,
	getLyric: getLyric,
	postLyric: postLyric
};