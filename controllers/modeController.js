const modeModels = require("../models/modeModel.js");

function getTones(req, res) {
	console.log("Getting all tones...");

	modeModels.getAllTones(function(results) {
		res.json(results);
	});
}

function getModeInfo(req, res) {
	console.log("Getting modeInfo...");

	modeModels.getAllTones(function(results) {
		res.json(results);
	});
}

module.exports = {
	getTones: getTones,
	getModeInfo: getModeInfo
};