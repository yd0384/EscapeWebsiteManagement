const LocalStrategy = require('passport-local').Strategy;
var db = require('../dbconn');
exports.config = (passport) => {
    passport.serializeUser((user, done)=>{
        return done(null, user.id);
    });
    passport.deserializeUser(async (id, done)=> {
        try {
            var user = await db('user').where('id', id);
            user = await JSON.parse(JSON.stringify(user))[0];
            return done(null, user);
        }
        catch(error){
            console.error(error);
            return done(error);
        }
    });
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    },  function(username, password, done) {
            db('user')
                .where('username', username)
                .then((row) => {
                    if(row.length===0) {
                        return done(null, false, { message: 'Incorrect username.'});
                    }
                    var user = JSON.parse(JSON.stringify(row))[0];
                    if(user.password!=password){
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                })
                .catch((error)=>{
                    return done(error);
                })
        }
    ));
};