/* 
Import
*/

// NodeJS
var express = require('express');
var nunjucks = require('nunjucks');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var passport = require('passport');

//Inner
require('./config/db-config');

//Uploader configuration 
var upload = multer({
	dest: __dirname + '/uploads'
})


require('./models/Article');
var Auteur = require('./models/Auteur');
require('./models/Categorie');


var app = express();

/* Server configuration */

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
app.use(passport.initialize());
app.use(passport.session());

/* Nunjucks configuration */
nunjucks.configure('views', {
	autoescape: false,
	express: app
});

/* Passport configuration */
passport.use(Auteur.createStrategy());
passport.serializeUser(Auteur.serializeUser());
passport.deserializeUser(Auteur.deserializeUser());

/* Style routes */
app.use('/boostrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/styles/css'));

/* Image route */
app.use('/images', express.static(__dirname + '/images'));

/* App routes */
app.use('/', require('./routes/articles'));
app.use('/user', require('./routes/user'));
app.use('/categorie', require('./routes/categories'));
app.use('/uploads', express.static(__dirname + '/uploads'));

/* Launch application */
var port = process.env.PORT || 3000;
console.log('Out of school est lancée sur le port '+ port);
app.listen(port);