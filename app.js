var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');

var upload = multer({
	dest: __dirname + '/uploads'
})

mongoose.connect('mongodb://localhost/blog', 
	{ 
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
 	})
	.then(() => console.log("Successfully connect to MongoDB."))
	.catch(err => console.error("Connection error", err));

require('./models/Article');
var Auteur = require('./models/Auteur');
require('./models/Categorie');

var app = express();

app.use(cookieParser()); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(upload.single('file'));

app.use(session({
				  secret: 'secret',
				  resave: false,
				  saveUninitialized: false,
				}));

app.use(flash());
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

//require('./config/passport-config');

passport.use(Auteur.createStrategy());
passport.serializeUser(Auteur.serializeUser());
passport.deserializeUser(Auteur.deserializeUser());

app.use('/boostrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/styles/css'));
app.use('/images', express.static(__dirname + '/images'));

app.use('/', require('./routes/articles'));
app.use('/user', require('./routes/user'));

app.use('/categorie', require('./routes/categories'));

app.use('/uploads', express.static(__dirname + '/uploads'));

nunjucks.configure('views', {
	autoescape: false,
	express: app
});

/* Lancement de l'application */
console.log('Out of school est lancée sur le port 3000');
app.listen(3000);