// consts to keep our app running
const { Pool } = require("pg");
const db_url = process.env.DATABASE_URL;
const pool = new Pool({connectionString: db_url});

/*****************************************************
* GET ALL LYRIC TITLES
* Gets all of the previously written lyric titles
*****************************************************/
function getAllLyricTitles(callback) {
	// Get all the titles from the DB
	var sql = "SELECT id, title FROM lyrics";

	pool.query(sql, function(error, db_results) {

		if (error) {
			throw err;
		} else {
			// log it
			// console.log("Back from DB with:");
			// console.log(db_results);
			
			var results = {
				lyrics:db_results.rows
			};
			callback(null, results);
		}
	});	
}

/*****************************************************
* GET ALL LYRIC BY ID
* Gets one lyric and title from the databse with the 
* given id
*****************************************************/
function getLyricById(id, callback) {
	// get the lyric from the DB that matches that id
	var sql = "SELECT id, title, lyrics FROM lyrics WHERE id = $1";
	// bind the parameters
	var params = [id];
	// log it
	// console.log(sql);

	pool.query(sql, params, function(error, db_results) {

		if (error) {
			throw error;
		} else {
			// log it
			// console.log("Back from DB with:");
			// console.log(db_results);
			
			var results = {
				lyrics:db_results.rows
			};
			callback(null, results);
		}
	});
}

/*****************************************************
* INSERT NEW LYRICS
* Inserts the new lyrics and title in the the db, updates
* current song if titles are the same
*****************************************************/
function insertNewLyric(title, lyrics, callback) {
	// create the new topic in the DB with the provided title
	var sql = "INSERT INTO lyrics (title, lyrics) VALUES ($1, $2) ON CONFLICT (title) DO UPDATE SET lyrics = $2";
	// bind the parameters
	var params = [title, lyrics];
	// log it
	// console.log(sql);
	// console.log(params);

	pool.query(sql, params, function(error, db_results) {

		if (error) {
			throw error;
		} else {
			// log it
			// console.log("Back from DB with:");
			// console.log(db_results);
			
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