const modeModel = require("../models/modeModel.js");

/*****************************************************
* GET KEYS
* Retrieves a selected keysigniature from the DB
*****************************************************/
function getKeys(req, res) {
	// log it
	// console.log("Getting all keys...")

	modeModel.getAllKeys(function(error, results) {
		res.json(results);
	});
}

/*****************************************************
* GET MOODS
* Retrieves a list of Moods that are linked to modes
* in the DB
*****************************************************/
function getMoods(req, res) {
	// log it
	// console.log("Getting all tones...")

	modeModel.getAllMoods(function(error, results) {
		res.json(results);
	});
}

/*****************************************************
* GET MODE INFO
* Retrieves all alter data for a mode from the DB
*****************************************************/
function getModeInfo(req, res) {
	// parse get for data
	var mode_id = req.query.mood;

	// log it
	// console.log("Getting mode with id: " + mode_id);

	modeModel.getModeById(mode_id, function(error, results) {
		res.json(results);
	});
}

/*****************************************************
* GET KEY INFO
* Gets the major and minor key info for a selected key
*****************************************************/
function getKeyInfo(req, res) {
	// parse get for data
	var key_id = req.query.key;

	// log it
	// console.log("Getting key with id: " + key_id);

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