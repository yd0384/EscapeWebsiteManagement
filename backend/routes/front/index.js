var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
  //res.render('index', { title: 'Express' });
});
module.exports = router;
/*
var db_config = require('../data/db_config.json')
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : db_config.host,
  user : db_config.user,
  password : db_config.password,
  database : db_config.database,
  port : db_config.port
});

connection.connect();

connection.query('SELECT * from theme', (error, rows, fields)=>{
  if (error) throw error;
  console.log('Theme info is: ', rows);
});

connection.end();
*/
