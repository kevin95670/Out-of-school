var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');

mongoose.connect('mongodb://localhost/articles', { useNewUrlParser: true });

var app = express();

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

console.log('Out of school est lancée sur le port 3000');
app.listen(3000);