/*
Import
*/
var mongoose = require('mongoose');

/*
Definition
*/
var categorieSchema = new mongoose.Schema({
	nom: String,
});

// Create a virtual property 'articles'
categorieSchema.virtual('articles',{
	ref: 'Article',
	localField: '_id',
	foreignField: 'categories'
});

/*
Export
*/
var Categorie = mongoose.model('Categorie', categorieSchema);
module.exports = Categorie;