const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../../dbconn');
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
});

router.put('/change_password', async function(req, res, next){
    const uid = req.body.id;
    const curr_password = req.body.curr_password;
    const new_password = req.body.new_password;
    const new_password_valid = req.body.new_password_valid;

    var user = await db('user').where({id: uid});
    user = await JSON.parse(JSON.stringify(user))[0];
    const same = await bcrypt.compare(curr_password, user.password);
    if(new_password != new_password_valid){
        return res.json({message: '새로운 패스워드와 패스워드 확인이 다릅니다.'});
    }
    else if(same!==true){
        return res.json({message: '정확한 현재 비밀번호를 입력해주세요.'});
    }
    else{
        bcrypt.hash(new_password, 10, (err, encryptedPassword)=>{
            db('user')
            .where({id: uid})
            .update({password: encryptedPassword})
            .then(rows => {
                if(!rows){
                    return res.status(404).json({message: '변경 실패'});
                }
                else{
                    return res.status(200).json({success: true});
                }
            })
            .catch(error=>{
                console.error(error)
            });
            if(err){
                console.error(err);
            }
        })
        
    }
});
router.get('/fetchL1UserList', async function(req, res, next){
    const bid = req.query.bid;
    await db('user')
    .where({branch_id: bid})
    .where({level: 1})
    .then(rows=>{
        res.json(JSON.stringify(rows));
    })
    .catch(error=>{
        console.error(error);
    })
});
router.put('/issueRandomPassword', async function(req, res, next){
    res.json({success: true, message: '1234'});
})
module.exports = router;