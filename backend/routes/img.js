var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', (req, res, next)=>{
    const imgName = req.query.imgName;
    fs.readFile('./assets/'+imgName, function(err, data){
        if(err){
            console.error(err);
        }else{
            res.status(200);
            res.write(data);
            res.end();
        }
    });
});
router.get('/branch', (req, res, next)=>{
    const imgName = req.query.imgName;
    fs.readFile('./assets/branch/'+imgName, function(err, data){
        if(err){
            console.error(err);
        }else{
            res.status(200);
            res.write(data);
            res.end();
        }
    });
});
router.get('/theme', (req, res, next)=>{
    const imgName = req.query.imgName;
    fs.readFile('./assets/theme/'+imgName, function(err, data){
        if(err){
            console.error(err);
        }else{
            res.status(200);
            res.write(data);
            res.end();
        }
    });
});
module.exports = router;
