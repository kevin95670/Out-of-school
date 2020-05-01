var mongoose = require('mongoose');

var auteurSchema = new mongoose.Schema({
	prenom: { type: String, default: "Kevin"},
	nom: { type: String, default: "Léonard"},
	articles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article'
		}
	],
});

auteurSchema.virtual('fullname').get(function() {
	return this.prenom + ' ' + this.nom;
});

var Auteur = mongoose.model('Auteur', auteurSchema);
module.exports = Auteur;