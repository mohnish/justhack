
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , app = module.exports = express.createServer()
  , io = require('socket.io').listen(app)
  , moment = require('moment');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'idonthaveanysecretsbr0' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

io.sockets.on('connection', function (socket) {
  socket.emit('welcome', { message: 'Welcome Hacker. Start hacking...now!' });
  socket.on('time', function(data) {
    setInterval(function() {
      socket.emit('current-time', {time: moment().format('dddd, MMMM, Do, YYYY, h:mm:ss a')});
    }, 1000);    
  });
  socket.on('disconnect', function (data) {
    console.log('Hacker has disconnected!');
  });
});

// Routes

app.get('/', routes.index);

app.listen(3001, function(){
  console.log("JustHack fired up on port %d in %s mode", app.address().port, app.settings.env);
});
