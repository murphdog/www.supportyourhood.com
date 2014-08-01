var express = require('express');
var jade = require('jade');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var twilio = require('twilio');
var cfg = require('envigor')();

var notifyNumber = process.env.NOTIFY_NUMBER;

var twiClient = twilio(cfg.twilio.accountSid, cfg.twilio.authToken);

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:false}));
//app.use(cookieParser());
app.get('/', function(req,res){
  res.render('index',{neighborhood:'Eastlake'});
});
app.post('/subscribe', function(req,res,next){
  twiClient.sendMessage({
    to: notifyNumber,
    from: cfg.twilio.number,
    body: 'New Subscriber: ' + req.body.email
  }, function(err, responseData) {
    if (err) return next(err);
    res.redirect('/subscribed');
  });
});
app.get('/subscribed', function(req,res){
  res.render('subscribed',{neighborhood:'Eastlake'});
});

app.listen(cfg.port || 5000, process.env.IP || '0.0.0.0');
