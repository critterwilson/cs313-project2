const { Pool } = require("pg");

const db_url = process.env.DATABASE_URL;

const pool = new Pool({connectionString: db_url});

function getAllLyricTitles(callback) {
	// Get all the titles from the DB
	var sql = "SELECT id, title FROM lyrics";

	pool.query(sql, function(error, db_results) {

		if (error) {
			throw err;
		} else {
			console.log("Back from DB with:");
			console.log(db_results);
			
			var results = {
				lyrics:db_results.rows
			};
			callback(null, results);
		}
	});	
}

function getLyricById(id, callback) {
	// get the lyric from the DB that matches that id
	var sql = "SELECT id, title, lyrics FROM lyrics WHERE id = $1";
	var params = [id];
	console.log(sql);

	pool.query(sql, params, function(error, db_results) {

		if (error) {
			throw error;
		} else {
			console.log("Back from DB with:");
			console.log(db_results);
			
			var results = {
				lyrics:db_results.rows
			};
			callback(null, results);
		}
	});
}

function insertNewLyric(title, lyrics, callback) {
	// create the new topic in the DB with the provided title
	var sql = "INSERT INTO lyrics (title, lyrics) VALUES ($1, $2) ON CONFLICT (title) DO UPDATE SET lyrics = $2";
	var params = [title, lyrics];
	console.log(sql);
	console.log(params);

	pool.query(sql, params, function(error, db_results) {

		if (error) {
			console.log("There was an ERROR IN POSTING");
			throw error;
		} else {
			console.log("Back from DB with:");
			console.log(db_results);
			
			var results = {success:true};

			callback(null, results);
		}
	});
}

module.exports = {
	getAllLyricTitles: getAllLyricTitles,
	getLyricById: getLyricById,
	insertNewLyric: insertNewLyric
};