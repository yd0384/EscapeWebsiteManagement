const express = require('express');
const db = require('../../dbconn');
const router = express.Router();
var fs = require('fs');

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
    console.log(req.body.image);
    let img_path='';
    if(fs.existsSync('./assets/theme/'+req.body.image.name)){
        let i=0;
        while(true){
            if(fs.existsSync('./assets/theme/'+String(i)+req.body.image.name)){
                i+=1;
                continue;
            }
            img_path=String(i)+req.body.image.name;
            break;
        }
    }
    else{
        img_path = req.body.image.name;
    }
    console.log(img_path);
    /*
    db('theme')
    .insert({
        branch_id: req.body.branch_id,
        active: req.body.active,
        title: req.body.title,
        content: req.body.content,
        difficulty: req.body.difficulty,
        length: req.body.length,
        device_importance: req.body.device_importance,
        image_path: img_path
    })
    */
})
module.exports = router;