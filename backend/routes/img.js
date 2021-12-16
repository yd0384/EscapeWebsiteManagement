var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
const upload = multer({ storage: multer.diskStorage
    ({
        destination: function(req, file, cb) {
            cb(null, './assets/theme/');
        },
        filename: function(req, file, cb){
            cb(null, String(new Date().valueOf()) + file.originalname);
        }
    })
});
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
router.post('/uploadThemeImage', upload.single('img'), function(req, res, next){
    res.status(201).json({img_path:req.file.filename});
});
router.post('/changeThemeImage', upload.single('img'), function(req, res, next){
    const existImg = req.query.imgName;
    console.log('./assets/theme/'+existImg);
    fs.rm('./assets/theme/'+existImg, (err)=>{
        res.status(302).end();
    });
    res.status(200).json({img_path:req.file.filename});

})
module.exports = router;
