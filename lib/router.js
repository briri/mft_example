'use strict';

var express = require('express'),
		router = express.Router();

router.use(function(req, res, next){
	console.log("Request Time: " + Date.now());
	next();
});

router.get('/upload', function(req, res){
	res.render('upload', {appName: CONFIG['application_name']});
});

module.exports = router;