'use strict';

var path = require('path'),
		http = require('http'),
		express = require('express'),
		bodyParser = require('body-parser');

var router = require('./router.js'),
		Writer = require('./writer.js');

var app = express(),
		dl  = require('delivery'),
		fs  = require('fs');

app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('bower_components'));
app.use('/', router);

var server = http.createServer(app),
		io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
  var delivery = dl.listen(socket);
	
  delivery.on('receive.success',function(file){
    var params = file.params;
		
    fs.writeFile(file.name, file.buffer, function(err){
      if(err){
        console.log(file.name + ' - could not be saved.');
      }else{
				var writer = new Writer();
				
				/*var params = {'Region': CONFIG['projects'][project]['aws']['region'],
											'Bucket': CONFIG['projects'][project]['aws']['bucket'],
											'Key': CONFIG['projects'][project]['aws']['key_prefix'] + file_name,
											'ContentLength': parseInt(resp.headers['content-length'], 10)};*/
				
				writer.write(file_name, self._tmp_file_path, function(){
					console.log(file.name + ' - saved.');
				});
      };
    });
  });
});

module.exports = server;
