'use strict';

var configurer = require('./lib/configurer.js');

var config_path = (process.argv[2] ? '/' + process.argv[2] : '/conf/');

// ----------------------------------------------------------------------
configurer.startup(config_path, function(){

	// Startup the web server
	var server = require('./lib/server.js');
	
	server.listen(CONFIG['port'], function(){
		console.log("Application is listening on port " + CONFIG['port']);
	});

	server.on('close', function(){
		configurer.shutdown(function(){
			console.log("Application is no longer listening on port " + CONFIG['port']);
		});
	})

	server.on('error', function(err){
		console.log("Application has encountered an error: ", err);
	});
});

// ----------------------------------------------------------------------
process.on( 'SIGINT', function() {
  console.log( "Gracefully shutting down from SIGINT (Ctrl-C)" );

	configurer.shutdown(function(){
		console.log("Application is no longer listening on port " + CONFIG['port']);
	
		// Delay for a bit to allow all processes to finish terminating
		setTimeout(function(){
			process.exit( );
		}, 5000);
	});
});

