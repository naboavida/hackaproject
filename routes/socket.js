// module.exports = function(socket) {
// 	socket.on('send:message', function(data) {
// 		socket.broadcast.emit('send:message', {
// 			// user: name,
// 			text: data.message
// 		});
// 	});
// };


module.exports = function (socket) {
  socket.emit('send:name', {
    name: 'Bob'
  });


  socket.on('send:alert', function (data) {
  	console.log(data);
    socket.broadcast.emit('send:alert', {
	    pid: data.pid,
	    iid: data.iid,
	    parmid: data.parmid,
	    pointid: data.pointid,
	    value: data.value,
	    alarm: data.alarm,
	    title: data.title,
	    min: data.min,
	    max: data.max
    });
  });


  
  socket.on('send:value', function (data) {
  	console.log(data);
    socket.broadcast.emit('send:value', {
	    pid: data.pid,
	    iid: data.iid,
	    parmid: data.parmid,
	    pointid: data.pointid,
	    value: data.value
    });
  });

  // setInterval(function () {
  //   socket.emit('send:time', {
  //     time: (new Date()).toString()
  //   });
  // }, 5000);
};