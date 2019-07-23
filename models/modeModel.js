// consts to keep our app running
const { Pool } = require("pg");
const db_url = process.env.DATABASE_URL;
const pool = new Pool({connectionString: db_url});

/*****************************************************
* GET ALL KEYS
* Gets all 15 keys and their ids
*****************************************************/
function getAllKeys(callback) {
	// Get all the ids and firsts from the DB
	var sql = "SELECT id, first FROM key";

	pool.query(sql, function(error, db_results) {

		if (error) {
			throw err;
		} else {
			// log it
			// console.log("Back from DB with:");
			// console.log(db_results);
			
			var results = {
				keys:db_results.rows
			};
			callback(null, results);
		}
	});	
}

/*****************************************************
* GET ALL MOODS
* Gets all 15 keys and their ids
*****************************************************/
function getAllMoods(callback) {
	// Get all the descriptive moods and their IDs from the DB
	var sql = "SELECT tone, mode_id FROM descriptions";

	pool.query(sql, function(error, db_results) {

		if (error) {
			throw err;
		} else {
			// log it
			// console.log("Back from DB with:");
			// console.log(db_results);
			
			var results = {
				tones:db_results.rows
			};
			callback(null, results);
		}
	});	
}

/*****************************************************
* GET MODE BY ID
* Get all the information for one mode
*****************************************************/
function getModeById(mode_id, callback) {
	var sql = "select mode.name, alterations.* from mode join alterations on alterations.mode_id = mode.id where mode.id = $1;";
	// bind parameters
	var params = [mode_id];
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
				keyAlterations:db_results.rows
			};
			callback(null, results);
		}
	});
}

/*****************************************************
* GET KEY BY ID
* Get all the information for one key
*****************************************************/
function getKeyById(key_id, callback) {
	var sql = "select * from key where id = $1";
	// bind the parameters
	var params = [key_id];
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
				key:db_results.rows
			};
			callback(null, results);
		}
	});
}

module.exports = {
	getAllKeys: getAllKeys,
	getAllMoods: getAllMoods,
	getModeById: getModeById,
	getKeyById: getKeyById
};