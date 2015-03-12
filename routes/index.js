var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');



module.exports = function (io) {

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by '+ name, name: name, tweets: list, showForm: true } );
});

router.get('/users/:name/tweets/:id', function(req, res) {
	var name = req.params.name;
	var id = req.params.id;
	console.log("this is the id " + typeof id);
	console.log("this is the name " + name);
	var singleTweet = tweetBank.find( {id: Number(id) });
	console.log("the singleTweet is: " + singleTweet);
	res.render('index', { title: 'Twitter.js - Posts by '+ name, tweets: singleTweet } );
});

//Submit a tweet
router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  io.sockets.emit('new_tweet', { name:name, tweets: text });
  // res.redirect('/');
});

router.post('/users/:name/submit', function(req, res) {
  var name = req.params.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});


  return router;
};


