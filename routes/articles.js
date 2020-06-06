/* 
Import
*/

// NodeJS
var router = require('express').Router();
var showdown  = require('showdown');
var converter = new showdown.Converter();

// Inner
var Article = require('./../models/Article');
var Categorie = require('./../models/Categorie');
var Auteur = require('../models/Auteur');

//Allowed to access to a route only if a user is logged in
function requireLogin(req, res, next) {
	if (req.user) {
		next(); // allow the next route to run
	} else {
		// require the user to log in
		req.flash('error', 'Vous n\'êtes pas connecté !');
		res.redirect("/user/login"); // or render a form, etc.
	}
}

//Get if the user connected is the author of the article
function isSameAuthor(req, res, next) {
  	if (req.user) {
  		Article.findById(req.params.id)
		.populate('auteur')
		.then(article => {
			if(req.user.id == article.auteur.id){
				next();
			}
			else{
				req.flash('error', 'Vous n\'êtes pas l\'auteur de l\'article !');
				res.redirect('/article/'+req.params.id);
			}
		})
		.catch(err => 
		{
			if (err){
				console.log(err);
			}
		})
  	} 
  	else 
  	{
    	// require the user to log in
    	req.flash('error', 'Vous devez être connecté !');
    	res.redirect("/user/login"); // or render a form, etc.
  	}
}

//GET method route
router.get('/', (req, res) => {
	Categorie.find({}).then(categories => {
		Article.find({})
		.populate('categories')
		.populate('auteur')
		.then(articles => {
			res.render('articles/index.html', {
				articles: articles,
				categories: categories,
				error: req.flash('error'),
				success: req.flash('success')
			});
		})
		.catch(err => {
			if (err){
				console.log(err);
			}
		})
	})
	.catch(err => {
		if (err){
			console.log(err);
		}
	})
});

//Route for created an article
router.get('/article/new', requireLogin,(req,res) => {
	Categorie.find({}).then(categories => {
		var article = new Article();
		res.render('articles/edit.html', {
			article: article,
			categories: categories,
			endpoint: '/'
		})
	})
	.catch(err => {
		if (err){
			console.log(err);
		}
	})
});

//An article can be deleted only if the author = user logged in
router.get('/article/edit/:id', isSameAuthor,(req,res) => {
	Categorie.find({}).then(categories => {
		Article.findById(req.params.id)
		.populate('auteur')
		.then(article => {
			res.render('articles/edit.html', {
				article: article,
				categories: categories,
				endpoint: '/' + article._id.toString()
			})
		})
		.catch(err => {
			if (err){
				console.log(err);
			}
		})
	})
	.catch(err => {
		if (err){
			console.log(err);
		}
	})
});

//An article can be deleted only if the author = user logged in
router.get('/article/delete/:id', isSameAuthor,(req,res) => {
	Article.findOneAndRemove({ _id : req.params.id})
	.then(() => {
		req.flash('success', 'Article supprimé avec succès !');
		res.redirect('/');
	})
})

//Get article
router.get('/article/:id', (req,res) => {
	Article.findById(req.params.id)
	.populate('categories')
	.populate('auteur')
	.then(article => {
		res.render('articles/show.html', {
			article: article
		})
	})
	.catch(err => {
		if (err){
			return res.status(404).send('article introuvable');
			console.log(err);
		}
	})
});

// create new post or edit it
router.post('/:id?', (req,res) => {
	new Promise((resolve, reject) => {
		if(req.params.id) {
			Article.findById(req.params.id).then(resolve, reject);
		}
		else{
			resolve(new Article());
		}
	}).then(article => {
		article.titre = req.body.titre;
		article.contenu = converter.makeHtml(req.body.contenu);
		article.categories = req.body.categories;
		article.auteur = req.user;

		if(req.file){
			article.image = req.file.filename;
		}

		return article.save();

	}).then(() => {
		req.flash('success', 'Article sauvegardé !');
		res.redirect('/');
	})
	.catch(err => {
		if (err){
			console.log(err);
		}
	})
});

/*
Export
*/
module.exports = router;