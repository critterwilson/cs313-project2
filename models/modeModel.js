const { Pool } = require("pg");

const db_url = process.env.DATABASE_URL;

const pool = new Pool({connectionString: db_url});

function getAllKeys(callback) {
	// Get all the titles from the DB
	var sql = "SELECT id, first FROM key";

	pool.query(sql, function(error, db_results) {

		if (error) {
			throw err;
		} else {
			console.log("Back from DB with:");
			console.log(db_results);
			
			var results = {
				keys:db_results.rows
			};
			callback(null, results);
		}
	});	
}

function getAllMoods(callback) {
	// Get all the titles from the DB
	var sql = "SELECT tone, mode_id FROM descriptions";

	pool.query(sql, function(error, db_results) {

		if (error) {
			throw err;
		} else {
			console.log("Back from DB with:");
			console.log(db_results);
			
			var results = {
				tones:db_results.rows
			};
			callback(null, results);
		}
	});	
}

function getModeById(mode_id, callback) {
	// get the lyric from the DB that matches that id
	var sql = "select mode.name, alterations.* from mode join alterations on alterations.mode_id = mode.id where mode.id = $1;";
	var params = [mode_id];
	console.log(sql);

	pool.query(sql, params, function(error, db_results) {

		if (error) {
			throw error;
		} else {
			console.log("Back from DB with:");
			console.log(db_results);
			
			var results = {
				keyAlterations:db_results.rows
			};
			callback(null, results);
		}
	});
}

function getKeyById(key_id, callback) {
	// get the lyric from the DB that matches that id
	var sql = "select * from key where id = $1";
	var params = [key_id];
	console.log(sql);

	pool.query(sql, params, function(error, db_results) {

		if (error) {
			throw error;
		} else {
			console.log("Back from DB with:");
			console.log(db_results);
			
			var results = {
				key:db_results.rows
			};
			callback(null, results);
		}
	});
}
// function insertNewLyric(title, lyrics, callback) {
// 	// create the new topic in the DB with the provided title
// 	var sql = "INSERT INTO lyrics (title, lyrics) VALUES ($1, $2) ON CONFLICT (title) DO UPDATE SET lyrics = $2";
// 	var params = [title, lyrics];
// 	console.log(sql);
// 	console.log(params);

// 	pool.query(sql, params, function(error, db_results) {

// 		if (error) {
// 			console.log("There was an ERROR IN POSTING");
// 			throw error;
// 		} else {
// 			console.log("Back from DB with:");
// 			console.log(db_results);
			
// 			var results = {success:true};

// 			callback(null, results);
// 		}
// 	});
// }

module.exports = {
	getAllKeys: getAllKeys,
	getAllMoods: getAllMoods,
	getModeById: getModeById,
	getKeyById: getKeyById
};