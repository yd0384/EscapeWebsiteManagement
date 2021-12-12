const express = require('express');
const db = require('../../dbconn');
const router = express.Router();

router.get('/fetchThemeList', async function(req, res, next){
    const bid = req.query.bid;
    await db('theme')
    .where({branch_id: bid})
    .then(rows=>{
        res.json(JSON.stringify(rows));
    })
    .catch(error=>{
        console.error(error);
    })
})
module.exports = router;