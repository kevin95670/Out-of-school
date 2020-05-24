var express = require('express');
var passport = require('passport'); 
var Auteur = require('../models/Auteur');

var router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/user/login');
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', 'Connexion réussie !');
      return res.redirect('/');
    });

  })(req, res, next);
});

router.get('/login',(req, res) => {
  if ( req.user != null ) {
    res.redirect('/');
  } 
  else {
    res.render('users/login.html',{
      endpoint : '/user/login'
    });
  }
});

router.get('/register', (req, res) => {
  if ( req.user != null ) {
    res.redirect('/');
  } else {
      res.render('users/register.html', {
      endpoint : '/user/register'
    });
  }
});

router.post('/register', function(req, res, next) {
  const author = { username: req.body.username };
  Auteur.register(author, req.body.password, function(err, user) {
    if (err) {
      return res.render('users/register.html', { error : err.message });
    }
    passport.authenticate('local')(req, res, function () {
      req.session.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});

router.get('/logout', function(req, res){
  if(req.user != null){
    req.logout();
    req.flash('success', 'Vous êtes déconnecté');
    res.redirect('/');
  }
  else{
    req.flash('error', 'vous n\'êtes pas connecté');
    res.redirect('/');
  }
});

module.exports = router;