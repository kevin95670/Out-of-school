/*
Import
*/
// NodeJS
var passport = require('passport'); 
var router = require('express').Router();

// Inner
var Auteur = require('../models/Auteur');

//Post Method route
//Passport authentification
router.post('/login', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            req.flash('error', 'Mauvais identifiants !');
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

//Get method route for login form
router.get('/login',(req, res) => {
    if ( req.user != null ) {
        req.flash('error', 'Vous êtes déjà connecté !');
        res.redirect('/');
    } 
    else {
        res.render('users/login.html',{
            endpoint : '/user/login',
            error: req.flash('error'),
            success: req.flash('success')
        });
    }
});

//Get method route for register form
router.get('/register', (req, res) => {
    if ( req.user != null ) {
        req.flash('error', 'Vous êtes déjà connecté !');
        res.redirect('/');
    } else {
        res.render('users/register.html', {
            endpoint : '/user/register',
            error: req.flash('error'),
            success: req.flash('success')
        });
    }
});

//post method route for register a user
router.post('/register', function(req, res, next) {
    const author = { username: req.body.username };
    Auteur.register(author, req.body.password, function(err, user) {
        if (err) {
            req.flash('error', err);
            return res.render('users/register.html', { 
            error: req.flash('error'),
            });
        }
        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
            req.flash('success', 'Inscription complétée !');
            res.redirect('/');
            });
        });
    });
});

//Get method route for logout a user
router.get('/logout', function(req, res){
    if(req.user != null){
        req.logout();
        req.flash('success', 'Déconnexion réussie !');
        res.redirect('/');
    }
    else{
        req.flash('error', 'vous n\'êtes pas connecté');
        res.redirect('/');
    }
});

/*
Export
*/
module.exports = router;