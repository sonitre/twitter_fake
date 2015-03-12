var express = require( 'express' );
var morgan = require( 'morgan' );
var swig = require('swig');
var app = express();
var routes = require('./routes/');
var bodyParser = require('body-parser');
var socketio = require('socket.io');


//Middleware
var server = app.listen(3000);
var io = socketio.listen(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes(io));
app.use(morgan('dev'));





//Render with swig
swig.setDefaults({ cache: false });

app.use(express.static(__dirname + '/public'));

//Declare data
var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

//Render templates with swig
app.engine("html", swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


