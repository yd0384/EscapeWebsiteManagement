var express = require('express');
var db = require('../../dbconn');
var router = express.Router();

router.get('/get_branch_info', async function(req, res, next){
    await db('branch')
        .then(async function(rows){
            res.json(JSON.stringify(rows));
        })
        .catch(error => {
            console.error(error);
        })
})

module.exports = router;