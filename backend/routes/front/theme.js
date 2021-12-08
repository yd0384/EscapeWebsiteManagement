var express = require('express');
var db = require('../../dbconn');
var router = express.Router();
var branches = [];
var themes = [];
var tid;
var genres = [];
router.get('/', function(req, res, next){
    db
    .select('id','name', 'reservable_date', 'image_path', 'address', 'tel_number')
    .from('branch')
    .where({'active': true})
    .then((rows)=>{
      branches= JSON.stringify(rows);  
    })
    .catch(error => {
        console.error(error);
    });
    res.json(branches);
});
router.get('/get_themes', async function(req, res, next){
    await db
        .select('id', 'branch_id', 'title', 'content', 'difficulty', 'length', 'device_importance', 'image_path')
        .from('theme')
        .where({'active': true})
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
                        str = '';
                        for(var j in genres){
                            str += genres[j].genre+', ';
                        }
                        str=str.slice(0,-2);
                        themes[i].genres=str;
                    })
                    .catch(error => {
                        console.error(error);
                    });
                await db('cost')
                    .min({minnum : 'number_of_player'})
                    .max({maxnum : 'number_of_player'})
                    .where('theme_id', tid)
                    .then(rows => {
                        recommended_number=JSON.parse(JSON.stringify(rows));
                        str=recommended_number[0].minnum+'명~'+recommended_number[0].maxnum+'명';
                        themes[i].recommended_number=str;
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }
            res.json(JSON.stringify(themes));
        })
        .catch(error => {
            console.error(error);
        });
});
router.get('/get_timetables', function(req, res, next){
    db('time_table')
        .then(rows => {
            res.json(JSON.stringify(rows));
        })
        .catch(error=>{
            console.error(error);
        });
});
router.get('/get_costinfo', function(req, res, next){
    db('cost')
        .select('number_of_player', 'price')
        .where('theme_id', req.query.tid)
        .then(rows => {
            res.json(JSON.stringify(rows));
        })
        .catch(error=> {
            console.error(error);
        })
})
module.exports = router;