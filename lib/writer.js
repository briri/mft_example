"use strict"

var fs = require('fs');
var AWS = require('aws-sdk');

// ---------------------------------------------------------------------------
function S3Writer(){
	this.region = CONFIG['aws']['region'];
	this.bucket = CONFIG['aws']['bucket'];
	this.key = CONFIG['aws']['key'];
}

// ---------------------------------------------------------------------------
S3Writer.prototype.write = function(file_name, buffer, callback){
	//var stream = fs.createReadStream(file_path + file_name);
	
	AWS.config.region = this.region
	
	var s3 = new AWS.S3({params: {bucket: this.bucket, 
																key: this.key + file_name}});
	
	s3.upload({Body: buffer}, function(err, data){
		if(err){
			console.log('Unable to place ' + this.key + file_name + ' onto ' + this.bucket);
			console.log(err);
			
		}else{
			console.log('Stored ' + this.key + file_name + ' on ' + this.bucket);
		}
		
		callback();
	});
}

module.exports = exports = S3Writer;