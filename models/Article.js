var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
	titre: String,
	contenu: String,
	image: String,
	date: { type: Date, default: Date.now },
	categories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Categorie'
		}
	],
	auteur: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Auteur'
	}
});

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;