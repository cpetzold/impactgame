var express = require('express')
  , log = require('logging').from(__filename)
  , io = require('socket.io') 
  , impact = require('impact')
  , Game = require('./lib/game');

var server = express.createServer()
  , io = io.listen(server)
  , games = {};

games['test'] = new Game(io, {
    room: 'test'
  , map: 'map'
});

server.configure(function() {
  server.set('views', __dirname + '/views');
  server.use(express.methodOverride());
  server.use(express.bodyParser());
  server.use(server.router);
  server.use(express.static(__dirname + '/public'));
  
  io.set('log level', 1);
});

var im = impact.listen(server, { root: __dirname + '/public' });

server.get('/', function(req, res) {
  res.render('index.jade', {
    locals: { title: 'Game' }
  });
});

server.get('/wm', function(req, res) {
  res.sendfile(__dirname + '/weltmeister.html');
});

server.post('/create', function(req, res) {
  log(req.body);
  res.send(200);
});

server.get('/:room', function(req, res) {
  var room = req.param('room');
  
  if (!games[room]) {
    throw new Error('Room \'' + room + '\' not found');
  }
  
  res.render('game.jade', {
      title: room
  });
});

server.error(function(e, req, res) {
  res.send(e.message, 400);
});

server.listen(8080, function() {
  log('server started', server.address());
});
