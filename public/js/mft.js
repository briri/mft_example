$(function(){	
	var socket = io.connect('http://0.0.0.0:5001');
  
  socket.on('connect', function(){
    var delivery = new Delivery(socket);
 
    delivery.on('delivery.connect',function(delivery){
      
			$('#uploader').on('change', function(evt) {
		    var input = $(this),
		        numFiles = input.get(0).files ? input.get(0).files.length : 1,
		        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		
				for(var i = 0; i < numFiles; i++){
					var file = input[0].files[i];
					var params = {foo: "bar"};
					
					alert(file);
					
					delivery.send(file, params);
					evt.preventDefault();
				}
			});
			
    });
 
    delivery.on('send.success',function(fileUID){
      console.log("file was successfully sent.");
    });
  });
	
	$(window).on('beforeunload', function(){
	  socket.close();
	});
});