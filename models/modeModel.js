const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
//console.log(connectionString);
const pool = new Pool({connectionString: connectionString});

function getAllTones(callback) {
	
	var sql = "SELECT * FROM descriptions;";

	pool.query(sql, function(err, resDb) {
		if (err) {
			throw err;
		} else {
			console.log("Back from the DB with: ");
			console.log(resDb);
		
			var results = {
				success:true,
				list:resDb.rows
			}

			callback(null, results);
		}
	});


}

module.exports = {
	getAllTones: getAllTones
};