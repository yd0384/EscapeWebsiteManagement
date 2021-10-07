var express = require('express');
var db = require('../../dbconn');
var router = express.Router();
var branches = [];
db
    .select('branch_id','branch_name')
    .from('branches')
    .then(rows => {
      branches=JSON.stringify(rows);  
    });
router.get('/', function(req, res, next){
    res.json(branches);
});
router.get('/get_themes', function(req, res, next){
    db
        .select('theme_id', 'theme_name', 'theme_detail')
        .from('themes')
        .where({'branch_id': req.query.branch_id})
        .then(rows => {
            res.json(JSON.stringify(rows));
        }) 
});
module.exports = router;