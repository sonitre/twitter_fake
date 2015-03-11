var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by '+ name, tweets: list } );
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

module.exports = router;