const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
//console.log(connectionString);
const pool = new Pool({connectionString: connectionString});

function getAllModes(callback) {
	// Get all modes from the DB
	var results = {
		tones: [
		{id:1, tone:"neutral"},
		{id:2, tone:"good time"}
		]
	}

	callback(results);
}

module.exports = {
	getAllModes: getAllModes
};