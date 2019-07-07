const modeModels = require("../models/modeModel.js");

function getTones(req, res) {
	console.log("Getting all tones...");

	modeModels.getAllModes(function(results) {
		res.json(results);
	});
}

module.exports = {
	getTones: getTones
};