var express = require('express');
var db = require('../../dbconn');
var router = express.Router();

router.get('/get_timetable', function(req, res, next){
    const subquery = 
    db('theme')
        .select('id')
        .where({branch_id: req.query.branch_id})
    db('time_table')
        .select('id', 'theme_id', 'start_time', 'end_time')
        .where('theme_id', 'in', subquery)
        .then(async (rows)=>{ 
            res.json(JSON.stringify(await rows));
        })
        .catch(error => {
            console.error(error);
        });
});
router.get('/get_reservations', function(req, res, next){
    const date = new Date(req.query.date);
    const enddate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1);

    console.log(date, enddate);
    db('reservation')
        .select('id', 'theme_id', start_time)
        .where('start_time', '>=', date)
        .where('start_time', '<', enddate)
        .then(async (rows)=>{
            res.json(JSON.stringify(await rows));
        })
        .catch(error => {
            console.error(error);
        });
});
module.exports = router;