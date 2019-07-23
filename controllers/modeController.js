const modeModel = require("../models/modeModel.js");

function getKeys(req, res) {
	// get a list of all the lyrics
	console.log("Getting all keys...")

	modeModel.getAllKeys(function(error, results) {
		res.json(results);
	});
}

function getMoods(req, res) {
	// get a list of all the lyrics
	console.log("Getting all tones...")

	modeModel.getAllMoods(function(error, results) {
		res.json(results);
	});
}

function getModeInfo(req, res) {
	var mode_id = req.query.mood;

	// get a specific lyric
	console.log("Getting mode with id: " + mode_id);

	modeModel.getModeById(mode_id, function(error, results) {
		res.json(results);
	});
}

function getKeyInfo(req, res) {
	var key_id = req.query.key;

	// get a specific lyric
	console.log("Getting key with id: " + key_id);

	modeModel.getKeyById(key_id, function(error, results) {
		res.json(results);
	});
}


module.exports = {
	getKeys: getKeys,
	getMoods: getMoods,
	getModeInfo: getModeInfo,
	getKeyInfo: getKeyInfo
};