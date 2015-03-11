var express = require( 'express' );
var morgan = require( 'morgan' );
var swig = require('swig');
var app = express();


app.use(morgan('dev'));

app.listen(3000);

app.get('/', function(req, res){
	res.send('Hello World');
});

app.get('/news', function(req, res){
	res.send('Bye bye john');
});