const express = require('express');
const db = require('../../dbconn');
const router = express.Router();

router.get('/fetchReservationList', async function(req, res, next){
    db('reservation')
    .then(rows => {
        res.json(JSON.stringify(rows));
    })
    .catch(error=> {
        console.error(error);
    })
});

module.exports = router;