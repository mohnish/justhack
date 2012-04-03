var socket = io.connect();
socket.on('welcome', function (data) {
  alert(data.message);
  // Beg for the current time
  socket.emit('time');
  // When begging is successful, grab the time and display it to the hacker
  socket.on('current-time', function(data) {
    console.log(data.time);
  });
});