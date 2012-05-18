var socket = io.connect();
socket.on('welcome', function (data) {
  var displayDay = document.getElementById('day')
    , displayMonth = document.getElementById('month')
    , displayDate = document.getElementById('date')
    , displayTime = document.getElementById('time');
  
  // Beg for the current time every second
  socket.emit('time');  
  // When begging is successful, grab the time and display it to the hacker
  socket.on('current-time', function(data) {
    var fullTimeDisplay = data.time.split(', ');
    var day = fullTimeDisplay[0]
      , month = fullTimeDisplay[1]
      , date = fullTimeDisplay[2]
      , time = fullTimeDisplay[4];
      displayDay.innerHTML = day;
      displayMonth.innerHTML = month;
      displayDate.innerHTML = date;
      displayTime.innerHTML = time;
  });
});