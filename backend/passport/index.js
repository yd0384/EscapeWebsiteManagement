const { Strategy: LocalStrategy } = require('passport-local');
var conn = require('../dbconn');


exports.config = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((user , done) => {
        done(null, user.id);
    });
    passport.use(new LocalStrategy({
        usernameField: 'id',
        levelField: 'level',
        passwordField: 'password',
        session: true,
        passReqToCallback: false,
    }, (id, level, password, done) => {
        var sql = "SELECT * FROM Users WHERE user_name = ? AND user_level = ?";
        var values = [id, level];
        conn.connect();
        conn.query(sql, values, function(err, results){
            if(err){
                return done(null, false, {message: "가입되지 않은 회원"});
            }
            else{
                user = result[0];
                db_password = user['user_password'];
                if (password === db_password) {
                    return done(null, user);
                }
                else{
                    return done(null, false, {message: "비밀번호 틀림"});
                }
                conn.end();
            }    
        })
    }));
}