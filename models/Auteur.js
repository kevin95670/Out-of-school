var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var auteurSchema = new mongoose.Schema({
	username: String,
    password: String
});

auteurSchema.plugin(passportLocalMongoose);

auteurSchema.virtual('articles',{
	ref: 'Article',
	localField: '_id',
	foreignField: 'auteur'
});

var Auteur = mongoose.model('Auteur', auteurSchema);
module.exports = Auteur;