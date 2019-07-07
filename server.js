const express = require('express');
const path = require('path');
require('dotenv').config();

const modeController = require("./controllers/modeController.js");

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/modeInfo', modeController.getModeInfo);

app.get('/tones', modeController.getTones);

app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});