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
    let querydate = req.query.date;
    querydate = querydate.replace('+', ' ');
    let startdate = new Date(querydate);
    let enddate = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate()+1);
    enddate.setHours(enddate.getHours()+9);
    enddate = enddate.toISOString().slice(0,19).replace('T',' ');
    db('reservation')
        .select('id', 'theme_id', 'start_time')
        .where('start_time', '>=', querydate)
        .where('start_time', '<', enddate)
        .where('status', 0)
        .then((rows)=>{
            res.json(JSON.stringify(rows));
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
});
router.post('/get_reservation_by_user', function(req, res, next){
    const payload = req.body;
    db('reservation')
        .select('id', 'theme_id', 'start_time', 'reserved_time', 'end_time', 'status', 'booker_name')
        .where({booker_name: payload.booker_name, phone_number: payload.phone_number})
        .whereIn('status', [0, 1, 2])
        .then((rows)=>{
            let result = JSON.parse(JSON.stringify(rows));
            if(result.length==0){
                res.end('empty');
            }
            else{
                res.json(JSON.stringify(result));
            }
        })
        .catch(error=>{
            console.error(error);
        })
});
router.get('/delete_reservation', function(req, res, next){
    const rid = req.query.rid;
    db('reservation')
        .where({ id: rid })
        .update({status: 3})
        .then(function(result) {
            res.end('success');
        })
        .catch(error=> {
            console.error(error);
        })
});
module.exports = router;