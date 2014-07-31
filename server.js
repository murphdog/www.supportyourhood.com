var express = require('express');
var jade = require('jade');
var cfg = require('envigor')();

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/static'));
app.get('/', function(req,res){
  res.render('index',{neighborhood:'Eastlake'});
});

app.listen(cfg.port || 5000, process.env.IP || '0.0.0.0');
