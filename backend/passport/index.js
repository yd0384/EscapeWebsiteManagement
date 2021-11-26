const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
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
    passport.use(new LocalStrategy(
        async function(username, password, done) {
            try{
                var user = await db('user').where('username', username);
                user = await JSON.parse(JSON.stringify(user))[0];
                if(user){
                    const password_key = await bcrypt.compare(password, user.password);
                    if(username===user.username && password_key === true){
                        return done(null, user);
                    }
                    else{
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                }
                else{
                    return done(null, false, { message: 'Incorrect username.'});
                }
            }catch(error){
                return done(null, false, {message: "Incorrect username."});
            }
        }
    ));
};