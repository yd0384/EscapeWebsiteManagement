const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/login', function(req, res, next){
    if(req.isAuthenticated() && req.user) {
        return res.json({user: req.user});
    }
    return res.json({ user: null });
});

router.post('/login', function(req, res, next){
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(info){
            return res.json(info);
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.json({user});
        });
    })(req, res, next);
});

router.get('/logout', function(req, res, next){
    req.logout();
    req.session.save(function(){
        res.redirect('/');
    })
})

module.exports = router;