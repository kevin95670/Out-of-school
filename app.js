var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer({
	dest: __dirname + '/uploads'
})

mongoose.connect('mongodb://localhost/blog', 
	{ 
		useNewUrlParser: true,
		useUnifiedTopology: true
 	})
	.then(() => console.log("Successfully connect to MongoDB."))
  	.catch(err => console.error("Connection error", err));

require('./models/Article');
require('./models/Auteur');
require('./models/Categorie');

var app = express();

app.use(bodyParser.urlencoded());
app.use(upload.single('file'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/', require('./routes/articles'));
app.use('/categorie', require('./routes/categories'));

app.use('/uploads', express.static(__dirname + '/uploads'));

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

console.log('Out of school est lancée sur le port 3000');
app.listen(3000);