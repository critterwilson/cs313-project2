var keyInfo = {
	first:"0", alter_1:"Natural", mood_1:"0",
	second:"", alter_2:"", mood_2:"",
	third:"", alter_3:"", mood_3:"",
	fourth:"", alter_4:"", mood_4:"",
	fifth:"", alter_5:"", mood_5:"",
	sixth:"", alter_6:"", mood_6:"",
	seventh:"", alter_7:"", mood_7:""
};

function selectNote() {
	$.get('/keys', function(data) {
		console.log("Back from server with:");
		console.log(data);
		var str = "<select id=\"keySelect\" onchange=\"loadMoods()\" class=\"selectMain\">";
		str += "<option disabled selected hidden value=\"\">Selct a Key to Write in</option>";
		for (var i = 0; i < data.keys.length; i++) {
			var key = data.keys[i];
			console.log(data.keys[i]);

			str += "<option value=\"" + key.id + "\">" + key.first + "</option>";
		}
		str += "</select>"

		$("#btnGetStarted").hide();
		$("#selectNote").html(str);
	});
}

function loadMoods(key) {
	console.log("Getting moods from db...");

	$.get('/moods', function(data) {
		console.log("Back from server with:");
		console.log(data);
		var str = "<select id=\"moodSelect\" onchange=\"recordModeInfo();\" class=\"selectMain\">";
		str += "<option disabled selected hidden value=\"\">Selct a Mood to Write in</option>";
		for (var i = 0; i < data.tones.length; i++) {
			var mood = data.tones[i];
			console.log(data.tones[i]);
			str += "<option value=\"" + mood.mode_id + "\">" + mood.tone + "</option>";
		}
		str += "</select>"

		$("#selectTone").html(str);
	});
}

function recordModeInfo() {
	var mood = $("#moodSelect").val();
	var params = {mood:mood};
	console.log("Displaying the mode info for the specified tone...");
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
		console.log(keyInfo);
		recordKeyInfo();
	});
}

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


function recordKeyInfo() {
	var key = $("#keySelect").val();
	var params = {key:key};
	console.log("Displaying the key info for the specified tone...");
	$.get('/keyInfo', params, function(data) {
		console.log("Back from server with:");
		console.log(data);
		keyInfo.first = data.key[0].first;
		keyInfo.second = data.key[0].second;
		keyInfo.third = data.key[0].third;
		keyInfo.fourth = data.key[0].fourth;
		keyInfo.fifth = data.key[0].fifth;
		keyInfo.sixth = data.key[0].sixth;
		keyInfo.seventh = data.key[0].seventh;
		console.log(keyInfo);
		var str = "<button id=\"btnDisplay\" onclick=\"displayTable()\">Display Table</button>";
		$("#displayTable").html(table);	
		displayModeInfo();
	});

}

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

function getWrittenLyrics() {
	console.log("Retrieving written songs...");

	$.get("/lyricTitles", function(data) {
		console.log("Back from server with:");
		console.log(data);

		var str = "<select id=\"writtenSongs\" onchange=\"fillInLyrics()\">";
		str += "<option disabled selected hidden value=\"\">Selct a Song to work on</option>";
		for (var i = 0; i < data.lyrics.length; i++) {
			var song = data.lyrics[i];
			str += "<option value=\"" + song.id + "\">" + song.title + "</option>";
		}
		str += "</select>"

		$("#btnLoad").hide();

		$("#writtenOptions").html(str);
	});
}

function fillInLyrics() {
	console.log("Retrieving old lyrics to edit...");
	$.get("/lyric?id=" + $("#writtenSongs").val(), function(data) {
		console.log("Back from server with:");
		console.log(data);

		var title = data.lyrics[0].title;
		var lyrics = data.lyrics[0].lyrics;

		$("#lyricTitle").val(title);
		$("#lyricNotes").val(lyrics);
	});
}

function getRhyme() {
	$.get("/rhyme?word=" + $("#rhymeInput").val(), function(data) {
		console.log("Back from server with:");
		console.log(data);
		var str = "";
		for (var i = 0; i < data.length; i++) {
			console.log(data[i]);
			str += "Word: " + data[i].word + " | Rhyme Score: " + data[i].score + "\n";
		}
		$("#rhymeReturn").val(str);
	});
}

function saveLyrics() {
	if ($("#lyricTitle").val() == "") {
		alert("You must have a title to save this writing session!");
	}
	else{
		var params = {
			title: $("#lyricTitle").val(),
			lyrics: $("#lyricNotes").val()
		};
		console.log(params);
	}
	
	$.post("/lyric", params, function(data) {
		console.log(data);
	});
}
