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
router.get('/get_user_ip', function(req, res, next){
    res.end(req.clientIp);
});
router.post('/create_reservation', function(req, res, next){
    const payload = req.body;
    db('reservation')
        .insert({
            theme_id: payload.theme_id,
            start_time: payload.start_time,
            end_time: payload.end_time,
            status: payload.status,
            reserved_time: payload.reserved_time,
            number_of_player: payload.number_of_player,
            phone_number: payload.phone_number,
            booker_name: payload.booker_name,
            booker_ip: payload.booker_ip,
            noshow: 0
        })
        .then(function(result) {
            res.json({success: true, message: 'ok'});
        })
        .catch(error => {
            console.error(error);
        })
})
module.exports = router;