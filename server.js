const express = require('express');
const path = require('path');
const datamuse = require('datamuse');
require('dotenv').config();

const lyricController = require("./controllers/lyricController.js");
const modeController = require("./controllers/modeController.js");

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/lyricTitles', lyricController.getLyricTitles);

app.get('/lyric', lyricController.getLyric);

app.post('/lyric', lyricController.postLyric);

app.get('/rhyme', function(req, res){
	var word = req.query.word;
	datamuse.request('words?rel_rhy=' + word)
	.then((json) => {
		console.log(json);
		res.send(json);
	});
});
app.get('/keys', modeController.getKeys)

app.get('/moods', modeController.getMoods)

app.get('/modeInfo', modeController.getModeInfo)

app.get('/keyInfo', modeController.getKeyInfo)

app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});