var socket = io.connect();
socket.on('welcome', function (data) {
  alert(data.greeting);
  socket.emit('thanks', { thanks: 'thank you for welcoming me' });
});