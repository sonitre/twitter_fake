var express = require( 'express' );
var morgan = require( 'morgan' );
var swig = require('swig');
var app = express();
var routes = require('./routes/');


app.use('/', routes);

//Listen on port 3000, turn off caching
app.use(morgan('dev'));

app.listen(3000);

swig.setDefaults({ cache: false });

app.use(express.static(__dirname + '/public'));

//Declare data
var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

//Render templates with swig
app.engine("html", swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


