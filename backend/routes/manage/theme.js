const express = require('express');
const db = require('../../dbconn');
const router = express.Router();
var fs = require('fs');

router.get('/fetchThemeInfo', async function(req, res, next){
    const tid = req.query.tid;
    var theme_info = [];
    await db('theme')
    .where({id: tid})
    .then(async function(rows){
        theme_info = JSON.parse(JSON.stringify(rows))[0];
        await db('genre')
        .select('genre')
        .where({'theme_id': tid})
        .then(rows=>{
            var tmp = JSON.parse(JSON.stringify(rows));
            theme_info.genres=[];
            for(var i in tmp){
                theme_info.genres.push(tmp[i].genre);
            }
        })
        .catch(error=>{console.error(error);})
        await db('cost')
        .where({theme_id: tid})
        .then(rows=>{
            theme_info.cost = JSON.parse(JSON.stringify(rows));
        })
        .catch(error=>{console.error(error);})
        await db('time_table')
        .where({theme_id: tid})
        .then(rows=>{
            theme_info.time_table = JSON.parse(JSON.stringify(rows));
        })
        .catch(error=>{console.error(error);})
        res.status(200).json(JSON.stringify(await theme_info));
    })
    .catch(error=>{
        console.error(error);
    })
})
router.get('/fetchThemeList', async function(req, res, next){
    const bid = req.query.bid;
    var themeList = [];
    var genres = [];
    var recommended_number = [];
    var str = '';
    await db('theme')
    .where({branch_id: bid})
    .then(async function(rows){
        themeList = JSON.parse(JSON.stringify(rows));
        for(var i in themeList){
            await db('genre')
            .select('genre')
            .where('theme_id', themeList[i].id)
            .then(async function(rows){
                genres = JSON.parse(JSON.stringify(rows));
                str = '';
                for(var j in genres){
                    str+=genres[j].genre+', ';
                }
                str = str.slice(0,-2);
                themeList[i].genres = str;
            })
            .catch(error=>{
                console.error(error);
            })
            await db('cost')
            .min({minnum : 'number_of_player'})
            .max({maxnum : 'number_of_player'})
            .where('theme_id', themeList[i].id)
            .then(async function(rows){
                recommended_number=JSON.parse(JSON.stringify(rows));
                str=recommended_number[0].minnum+'명~'+recommended_number[0].maxnum+'명';
                themeList[i].recommended_number=str;
            })
            .catch(error => {
                console.error(error);
            })
        }
        res.json(JSON.stringify(themeList));
    })
    .catch(error=>{
        console.error(error);
    })
});
router.post('/createTheme', async function(req, res, next){
    await db('theme')
    .insert({
        branch_id: req.body.branch_id,
        active: req.body.active,
        title: req.body.title,
        content: req.body.content,
        difficulty: req.body.difficulty,
        length: req.body.length,
        device_importance: req.body.device_importance,
        image_path: req.body.image_path
    })
    .then(async function(){
        let new_tid=0;
        await db.raw('SELECT LAST_INSERT_ID() as id;')
        .then(async function(rows){
            new_tid = JSON.parse(JSON.stringify(rows))[0][0].id;
            for(var i in req.body.genres){
                await db('genre')
                .insert({
                    theme_id: new_tid,
                    genre: req.body.genres[i]
                })
            }
            for(var j in req.body.time_table){
                await db('time_table')
                .insert({
                    theme_id: new_tid,
                    start_time: req.body.time_table[j].start_time,
                    end_time: req.body.time_table[j].end_time
                })
            }
            for(var k in req.body.cost){
                await db('cost')
                .insert({
                    theme_id: new_tid,
                    number_of_player: req.body.cost.number_of_player,
                    price: req.body.cost.price
                })
            }
            res.status(201).end();
        })
        .catch(error=>console.error(error))

    })
    .catch(error=>{
        console.error(error);
    })
})
module.exports = router;