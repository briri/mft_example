'use strict';

// -----------------------------------------------------------------------------------
exports.startup = function(config_path, callback){
  // Load the app configuration
	// ---------------------------------------------------------------------
	var config = require(process.cwd() + config_path + "app.json");
	config['root'] = process.cwd() + config_path;

	module.exports = global.CONFIG = config;
	
	callback();
}

// -----------------------------------------------------------------------------------
exports.shutdown = function(callback){
	callback();
}
