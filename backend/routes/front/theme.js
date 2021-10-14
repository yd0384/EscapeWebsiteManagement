var express = require('express');
var db = require('../../dbconn');
var router = express.Router();
var branches = [];
db
    .select('id','name')
    .from('branch')
    .then(rows => {
      branches=JSON.stringify(rows);  
    })
    .catch(error => {
        console.log(error);
    });
router.get('/', function(req, res, next){
    res.json(branches);
});
router.get('/get_themes', function(req, res, next){
    db
        .select('id', 'title', 'content')
        .from('theme')
        .where({'branch_id': req.query.branch_id})
        .then(rows => {
            res.json(JSON.stringify(rows));
        })
        .catch(error => {
            console.log(error);
        });
});
module.exports = router;