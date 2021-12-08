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
router.put('/put_reservable_date', function(req, res, next){
    const curr_rdate = req.body.curr_rdate;
    const rdate = req.body.rdate;
    const bid = req.body.bid;
    if(!Number.isInteger(Number(rdate)) || Number(rdate)<=0){
        return res.json({message: '0보다 큰 정수값을 입력해주세요.'});
    }
    else if(rdate == curr_rdate){
        return res.json({message: '현재 예약가능 일수와 다른 값을 입력해주세요.'});
    }
    else{
        db('branch')
        .where({id: bid})
        .update({reservable_date: rdate})
        .then(rows => {
            if(!rows){
                return res.status(404).json({message: '변경 실패'});
            }
            else{
                return res.json({rdate: rdate, bid: bid});
            }
        })
        .catch(error=>{
            console.error(error);
        })
    }
    
})
module.exports = router;