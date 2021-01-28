const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Trazer o User Model
let User = require('../models/user');

// Formulário de Cadastro
router.get('/register', function(req, res){
    res.render('register_user');
});

// Processo de Cadastro
router.post('/register', function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'O nome é necessário!').notEmpty();
    req.checkBody('email', 'O email é necessário!').notEmpty();
    req.checkBody('email', 'O email não é válido!').isEmail();
    req.checkBody('username', 'O usuário é necessário!').notEmpty();
    req.checkBody('password', 'A senha é necessária!').notEmpty();
    req.checkBody('password2', 'As senhas não combinam!').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){
        res.render('register_user', {
            errors:errors
        });
    } else {
        let newUser = new User({
            name:name,
            email:email,
            username:username,
            password:password
        });

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt, function(err, hash){
                if(err){
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    } else {
                        req.flash('success','Sua conta foi criada!');
                        res.redirect('/users/login');
                    }
                });
            });
        });
    }
});

// Formulário de Login
router.get('/login', function(req, res){
    res.render('login');
});

// Processo de Login
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect:'/',
        failureRedirect:'/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'Você saiu de sua conta!');
    res.redirect('/users/login');
});

module.exports = router;