const express = require('express');
const db = require('../../dbconn');
const router = express.Router();

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
module.exports = router;