/*
Import
*/
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

/*
Definition
*/
var auteurSchema = new mongoose.Schema({
	username: String,
    password: String
});

//plugin passportLocalMongoose into auteurSchema
auteurSchema.plugin(passportLocalMongoose);

// Create a virtual property 'articles'
auteurSchema.virtual('articles',{
	ref: 'Article',
	localField: '_id',
	foreignField: 'auteur'
});

/*
Export
*/
var Auteur = mongoose.model('Auteur', auteurSchema);
module.exports = Auteur;