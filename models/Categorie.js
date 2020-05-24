var mongoose = require('mongoose');

var categorieSchema = new mongoose.Schema({
	nom: String,
});

categorieSchema.virtual('articles',{
	ref: 'Article',
	localField: '_id',
	foreignField: 'categories'
});

var Categorie = mongoose.model('Categorie', categorieSchema);
module.exports = Categorie;