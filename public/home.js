// Global variable that stores our table info as it is updated from the DB
var keyInfo = {
	first:"0", alter_1:"Natural", mood_1:"0",
	second:"", alter_2:"", mood_2:"",
	third:"", alter_3:"", mood_3:"",
	fourth:"", alter_4:"", mood_4:"",
	fifth:"", alter_5:"", mood_5:"",
	sixth:"", alter_6:"", mood_6:"",
	seventh:"", alter_7:"", mood_7:""
};

/*****************************************************
* GET WRITTEN LYRICS
* Adds to our hidden #table from the keyInfo object
* then displays the table
*****************************************************/
function getWrittenLyrics() {
	$.get("/lyricTitles", function(data) {
		console.log("/lyricTitles is back from server with:");
		console.log(data);
		// create a <select> with previously written songs
		var str = "<select id=\"writtenSongs\" onchange=\"fillInLyrics()\">";
		str += "<option disabled selected hidden value=\"\">Selct a Song to work on</option>";
		for (var i = 0; i < data.lyrics.length; i++) {
			var song = data.lyrics[i];
			str += "<option value=\"" + song.id + "\">" + song.title + "</option>";
		}
		str += "</select>"

		// hide the load button since we've already loaded
		$("#btnLoad").hide();
		// fill in the empty div with our <select>
		$("#writtenOptions").html(str);
	});
}

/*****************************************************
* FILL IN LYRICS
* Fills in the lyrics in the textarea so they can be 
* edited and/or updated
*****************************************************/
function fillInLyrics() {
	$.get("/lyric?id=" + $("#writtenSongs").val(), function(data) {
		console.log("/lyric is back from server with:");
		console.log(data);
		// store data for jquery
		var title = data.lyrics[0].title;
		var lyrics = data.lyrics[0].lyrics;
		// put data into working area for user
		$("#lyricTitle").val(title);
		$("#lyricNotes").val(lyrics);
	});
}

/*****************************************************
* GET RHYME
* Fills in the lyrics in the textarea so they can be 
* edited and/or updated
*****************************************************/
function getRhyme() {
	$.get("/rhyme?word=" + $("#rhymeInput").val(), function(data) {
		console.log("/rhyme is back from server with:");
		console.log(data);
		// log all of the rhymes with the given word
		var str = "";
		for (var i = 0; i < data.length; i++) {
			console.log(data[i]);
			str += "Word: " + data[i].word + " | Rhyme Score: " + data[i].score + "\n";
		}
		// put them into the read-only text-box
		$("#rhymeReturn").val(str);
	});
}

/*****************************************************
* SAVE LYRICS
* Saves the lyrics and title into the database, updates
* if the title is the same
*****************************************************/
function saveLyrics() {
	// We must have a title to post, alert if title is empty
	if ($("#lyricTitle").val() == "") {
		alert("You must have a title to save this writing session!");
	}
	else{
		// store parameters
		var params = {
			title: $("#lyricTitle").val(),
			lyrics: $("#lyricNotes").val()
		};
		// log it
		// console.log(params);
	}
	
	// log the success of the post
	$.post("/lyric", params, function(data) {
		console.log(data);
	});
}

/*****************************************************
* SELECT NOTE
* Picks the key that the writer wants to write in
*****************************************************/
function selectNote() {
	$.get('/keys', function(data) {
		console.log("/keys is back from server with:");
		console.log(data);
		// create a <select> to chose a key
		var str = "<select id=\"keySelect\" onchange=\"loadMoods()\" class=\"selectMain\">";
		str += "<option disabled selected hidden value=\"\">Selct a Key to Write in</option>";
		for (var i = 0; i < data.keys.length; i++) {
			var key = data.keys[i];
			// log it
			// console.log(data.keys[i]);
			str += "<option value=\"" + key.id + "\">" + key.first + "</option>";
		}
		str += "</select>"

		// hide the get started button
		$("#btnGetStarted").hide();
		// add our <select> to an empty div
		$("#selectNote").html(str);
	});
}

/*****************************************************
* LOAD MOODS
* Loads examples of moods that a song can be written in
* for the writer to choose from
*****************************************************/
function loadMoods(key) {
	$.get('/moods', function(data) {
		console.log("/moods is back from server with:");
		console.log(data);
		// create a <select> for all of the moods
		var str = "<select id=\"moodSelect\" onchange=\"recordModeInfo();\" class=\"selectMain\">";
		str += "<option disabled selected hidden value=\"\">Selct a Mood to Write in</option>";
		for (var i = 0; i < data.tones.length; i++) {
			var mood = data.tones[i];
			// log it
			// console.log(data.tones[i]);
			str += "<option value=\"" + mood.mode_id + "\">" + mood.tone + "</option>";
		}
		str += "</select>"

		// put our <select> in an empty div
		$("#selectTone").html(str);
	});
}




/*****************************************************
* DISPLAY MODE INFO
* Adds to our hidden #table from the keyInfo object
* then displays the table
*****************************************************/
function displayModeInfo() {
	var table = document.getElementById("table");
	table.rows[1].cells[1].innerHTML = keyInfo.first;
	table.rows[1].cells[2].innerHTML = keyInfo.second;
	table.rows[1].cells[3].innerHTML = keyInfo.third;
	table.rows[1].cells[4].innerHTML = keyInfo.fourth;
	table.rows[1].cells[5].innerHTML = keyInfo.fifth;
	table.rows[1].cells[6].innerHTML = keyInfo.sixth;
	table.rows[1].cells[7].innerHTML = keyInfo.seventh;

	table.rows[2].cells[1].innerHTML = keyInfo.alter_1;
	table.rows[2].cells[2].innerHTML = keyInfo.alter_2;
	table.rows[2].cells[3].innerHTML = keyInfo.alter_3;
	table.rows[2].cells[4].innerHTML = keyInfo.alter_4;
	table.rows[2].cells[5].innerHTML = keyInfo.alter_5;
	table.rows[2].cells[6].innerHTML = keyInfo.alter_6;
	table.rows[2].cells[7].innerHTML = keyInfo.alter_7;

	table.rows[3].cells[1].innerHTML = keyInfo.mood_1;
	table.rows[3].cells[2].innerHTML = keyInfo.mood_2;
	table.rows[3].cells[3].innerHTML = keyInfo.mood_3;
	table.rows[3].cells[4].innerHTML = keyInfo.mood_4;
	table.rows[3].cells[5].innerHTML = keyInfo.mood_5;
	table.rows[3].cells[6].innerHTML = keyInfo.mood_6;
	table.rows[3].cells[7].innerHTML = keyInfo.mood_7;

	$("#table").show();
};

/*****************************************************
* RECORD MODE INFO
* Converts our alteration DB codes to readable, usable info for the user
*****************************************************/
function recordModeInfo() {
	// get our mood and log it into parameters
	var mood = $("#moodSelect").val();
	var params = {mood:mood};
	// log it
	// console.log("Displaying the mode info for the specified tone...");
	// convert all the data to readable info and store it in our global variable
	$.get('/modeInfo', params, function(data) {
		console.log("Back from server with:");
		console.log(data);
		keyInfo.alter_2 = alterConvert(data.keyAlterations[0].alter_2);
		keyInfo.alter_3 = alterConvert(data.keyAlterations[0].alter_3);
		keyInfo.alter_4 = alterConvert(data.keyAlterations[0].alter_4);
		keyInfo.alter_5 = alterConvert(data.keyAlterations[0].alter_5);
		keyInfo.alter_6 = alterConvert(data.keyAlterations[0].alter_6);
		keyInfo.alter_7 = alterConvert(data.keyAlterations[0].alter_7);
		keyInfo.mood_1 = moodConvert(data.keyAlterations[0].mood_1);
		keyInfo.mood_2 = moodConvert(data.keyAlterations[0].mood_2);
		keyInfo.mood_3 = moodConvert(data.keyAlterations[0].mood_3);
		keyInfo.mood_4 = moodConvert(data.keyAlterations[0].mood_4);
		keyInfo.mood_5 = moodConvert(data.keyAlterations[0].mood_5);
		keyInfo.mood_6 = moodConvert(data.keyAlterations[0].mood_6);
		keyInfo.mood_7 = moodConvert(data.keyAlterations[0].mood_7);
		// log it
		// console.log(keyInfo);
		// do the same for the notes of the scale
		recordKeyInfo();
	});
}

/*****************************************************
* RECORD KEY INFO
* Place the necessary info into the global variable
*****************************************************/
function recordKeyInfo() {
	var key = $("#keySelect").val();
	// log parameters
	var params = {key:key};
	// log it
	// console.log("Displaying the key info for the specified tone...");
	$.get('/keyInfo', params, function(data) {
		console.log("/keyInfo is back from server with:");
		console.log(data);
		// its painful to look at, I know...
		keyInfo.first = data.key[0].first;
		keyInfo.second = data.key[0].second;
		keyInfo.third = data.key[0].third;
		keyInfo.fourth = data.key[0].fourth;
		keyInfo.fifth = data.key[0].fifth;
		keyInfo.sixth = data.key[0].sixth;
		keyInfo.seventh = data.key[0].seventh;
		// log it
		// console.log(keyInfo);
		// place a button so we can put the info into the table
		var str = "<button id=\"btnDisplay\" onclick=\"displayTable()\" class=\"button\">Display Table</button>";
		$("#displayTable").html(table);	
		displayModeInfo();
	});

}

/*****************************************************
* ALTER CONVERT
* Converts our alteration DB codes to readable, usable info for the user
*****************************************************/
function alterConvert(num) {
	switch (num) {
		case 0:
			return 'Natural';
			break;
		case 1:
			return 'Sharp(#)';
			break;
		case -1:
			return 'Flat(b)';
			break;
	}
}

/*****************************************************
* MOOD CONVERT
* Converts our mood DB codes to readable, usable info for the user
*****************************************************/
function moodConvert(num) {
	switch (num) {
		case 0:
			return 'Minor';
			break;
		case 1:
			return 'Major';
			break;
		case 2:
			return 'Dimin.';
			break;
	}
}
