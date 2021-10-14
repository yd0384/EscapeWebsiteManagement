var express = require('express');
var db = require('../../dbconn');
var router = express.Router();
var branches = [];
var themes = [];
var tid;
var genres = [];
db
    .select('id','name', 'reservable_date')
    .from('branch')
    .where({'active': true})
    .then((rows)=>{
      branches= JSON.stringify(rows);  
    })
    .catch(error => {
        console.error(error);
    });
router.get('/', function(req, res, next){
    res.json(branches);
});
router.get('/get_themes', async function(req, res, next){
    await db
        .select('id', 'title', 'content', 'difficulty', 'length', 'device_importance', 'image_path', 'length')
        .from('theme')
        .where({'branch_id': req.query.branch_id, 'active': true})
        .then(async function(rows){
            themes = JSON.parse(JSON.stringify(rows))
            for(var i in themes){
                tid = themes[i].id;
                await db
                    .select('genre')
                    .from('genre')
                    .where('theme_id', tid)
                    .then(rows => {
                        genres=JSON.parse(JSON.stringify(rows));
                        str = ''
                        for(var j in genres){
                            str += genres[j].genre+', ';
                        }
                        str=str.slice(0,-2);
                        themes[i].genres=str;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
            res.json(JSON.stringify(themes));
        })
        .catch(error => {
            console.error(error);
        });
});
module.exports = router;