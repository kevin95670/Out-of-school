var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

// Load Auteur model
var Auteur = require('../models/Auteur');

passport.use(new LocalStrategy(Auteur.authenticate()));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Auteur.findById(id, function(err, user) {
    done(err, user);
  });
});