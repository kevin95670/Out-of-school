/*
Import
*/
// NodeJS
var router = require('express').Router();

// Inner
var Categorie = require('./../models/Categorie');

// GET method route
router.get('/:categorie', (req,res) => {
	Categorie.findOne({
		nom : req.params.categorie
	}).populate('articles')
	.then(categorie =>{
		if(!categorie) return res.status(404).send('catégorie introuvable');
		res.render('categories/show.html', {
			categorie: categorie,
			articles: categorie.articles
		})
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