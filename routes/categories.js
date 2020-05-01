var router = require('express').Router();

var Categorie = require('./../models/Categorie');

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

module.exports = router;