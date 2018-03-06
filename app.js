var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('127.0.0.1');

var Schema = mongoose.Schema;
var beatleSchema = new Schema({
  firstname: String,
  lastname: String,
  address: String
});

var Beatle = mongoose.model('Beatle', beatleSchema);

var yoko = Beatle({
  firstname: 'Yoko',
  lastname: 'Ono',
  address: 'NYC'
});

yoko.save(function(err) {
  if (err) throw err;
  console.log('saved');
});

var port = process.env.PORT || 3000;
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var jsonParser = bodyParser.json();

app.use('/assets', express.static(__dirname + '/public'));

//template ejs
app.set('view engine', 'ejs');

//middleware example
app.use('/', function(req, res, next) {
  console.log('Request Url: ' + req.url);
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/beatle/:id', function(req, res) {
  res.render('beatles', { ID: req.params.id, Qstr: req.query.qstr })
})

app.post('/beatle', urlencodedParser, function(req, res) {
  res.send('We hope you enjoyed the show');
  console.log('Sugarplum fairy');
  console.log(req.body.firstname);
  console.log(req.body.lastname);
})

//post json data
app.post('/beatlejson', jsonParser, function(req, res) {
    res.send('Thank you for the JSON data, George!');
    console.log(req.body.firstname);
    console.log(req.body.lastname);
});

//routing example
// app.get('/beatle/:id', function(req, res) {
//   res.send('<html><head></head><body><h1>Beatle: ' +
//   req.params.id + '</h1></body></html>')
// });

app.get('/api', function(req, res) {
  res.json({ firstname: 'John', lastname: 'Lennon'});
})


app.listen(port);
