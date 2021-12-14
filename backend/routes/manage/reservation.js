const express = require('express');
const db = require('../../dbconn');
const router = express.Router();

router.get('/fetchReservationList', async function(req, res, next){
    const bid = req.query.bid;
    let theme_info = [];
    let reservations = [];
    await db('theme')
    .select('id', 'title')
    .where({branch_id: bid})
    .then(rows=>{
        theme_info = JSON.parse(JSON.stringify(rows));
    })
    .catch(error=> {
        console.error(error);
    })
    let tids = [];
    for(var i in theme_info){
        tids.push(theme_info[i].id);
    }
    await db('reservation')
    .whereNot({status: 3})
    .whereIn('theme_id', tids)
    .then(rows => {
        reservations = JSON.parse(JSON.stringify(rows));
    })
    .catch(error=> {
        console.error(error);
    })
    for(var i in reservations){
        reservations[i].title = theme_info.find(arr=>arr.id===reservations[i].theme_id).title;
        delete reservations[i].branch_id;
        reservations[i].status = statusString[reservations[i].status];
    }
    res.json(JSON.stringify(reservations));
});
router.get('/fetchCanceledReservationList', async function(req, res, next){
    const bid = req.query.bid;
    let theme_info = [];
    let reservations = [];
    await db('theme')
    .select('id', 'title')
    .where({branch_id: bid})
    .then(rows=>{
        theme_info = JSON.parse(JSON.stringify(rows));
    })
    .catch(error=> {
        console.error(error);
    })
    let tids = [];
    for(var i in theme_info){
        tids.push(theme_info[i].id);
    }
    await db('reservation')
    .where({status: 3})
    .whereIn('theme_id', tids)
    .then(rows => {
        reservations = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        console.error(error);
    })
    
    for(var i in reservations){
        reservations[i].title = theme_info.find(arr=>arr.id===reservations[i].theme_id).title;
        delete reservations[i].branch_id;
        reservations[i].status = statusString[reservations[i].status];
    }
    res.json(JSON.stringify(reservations));
})
router.get('/fetchTodayReservationList', async function(req, res, next){
    const bid = req.query.bid;
    let theme_info = [];
    await db('theme')
    .select('id', 'title')
    .where({branch_id: bid})
    .then(rows=>{
        theme_info = JSON.parse(JSON.stringify(rows));
    })
    .catch(error=> {
        console.error(error);
    })
    let tids = [];
    for(var i in theme_info){
        tids.push(theme_info[i].id);
    }
    let time_table = [];
    await db('time_table')
    .whereIn('theme_id', tids)
    .then(rows=>{
        time_table = JSON.parse(JSON.stringify(rows));
    })
    .catch(error=>{
        console.error(error);
    })
    let querydate = req.query.date;
    querydate = querydate.replace('+', ' ');
    let startdate = new Date(querydate);
    startdate.setHours(startdate.getHours()+9);
    let enddate = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate()+1);
    startdate = startdate.toISOString().slice(0, 19).replace('T', ' ');
    enddate = enddate.toISOString().slice(0,19).replace('T',' ');
    let reservations = [];
    await db('reservation')
    .where('start_time', '>=', startdate)
    .where('start_time', '<', enddate)
    .whereIn('theme_id', tids)
    .whereNot({status: 3})
    .then((rows)=>{
        reservations = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        console.error(error);
    });
    for(var i in theme_info){
        theme_info[i].time_table=[];
    }
    for(var i in time_table){
        time_table[i].reservation=null;
        theme_info.find(arr=>arr.id===time_table[i].theme_id).time_table.push(time_table[i]);
    }
    for(var i in reservations){
        reservations[i].start_datetime = reservations[i].start_time;
        reservations[i].start_time = DateToTime(reservations[i].start_time);
        reservations[i].end_datetime = reservations[i].end_time;
        reservations[i].end_time = DateToTime(reservations[i].end_time);
        reservations[i].reserved_datetime = reservations[i].reserved_time;
        reservations[i].reserved_time = DateToString(reservations[i].reserved_time);
        time_table.find(arr=>arr.start_time===reservations[i].start_time && arr.theme_id===reservations[i].theme_id).reservation=reservations[i];
    }   
    res.json(JSON.stringify(theme_info));
});
const Days=['일', '월', '화', '수', '목', '금', '토'];
const statusString = ['플레이 이전', '플레이 완료', '노쇼', '취소된 예약'];
function DateToString(tzString){
    let time = new Date(tzString.slice(0,-1));
    time.setHours(time.getHours()+9);
    return time.getFullYear()+"년 "+ (time.getMonth()+1)+"월 "+time.getDate()+"일 "+ Days[time.getDay()]+"요일 "+((time.getHours()<10)?'0'+time.getHours():time.getHours())+":"+((time.getMinutes()<10)?'0'+time.getMinutes():time.getMinutes());
};
function DateToTime(tzString){
    let time = new Date(tzString.slice(0,-1));
    time.setHours(time.getHours()+9);
    return ((time.getHours()<10)?'0'+time.getHours():time.getHours())+":"+((time.getMinutes()<10)?'0'+time.getMinutes():time.getMinutes());
}
module.exports = router;