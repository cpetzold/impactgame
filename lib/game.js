var fs = require('fs')
  , log = require('logging').from(__filename)
  , Vector = require('./vector')
  , Map = require('./map')
  , Player = require('./player');

var Game = module.exports = function(io, options) {
  this.options = {
      room: options.room || 'room'
    , map: options.map || 'map'
    , mapsPath: options.mapsPath || __dirname + '/../public/lib/game/levels/'
    , maxPlayers: options.maxPlayers || 12
    , fps: options.fps || 60
  };
  
  this.players = [];
  this.loadLevel(this.options.map);
  
  this.socket = io.of('/' + this.options.room);
  this.socket.on('connection', this.onConnection.bind(this));
  
  this._interval = setInterval(this.update.bind(this), 1000 / this.options.fps);
};

Game.prototype = {
  
  update: function() {
    this.players.forEach(function(player) {
      player.update();
    });
  },
  
  onConnection: function(client) {
    var player = new Player(client, {
        nick: 'cpetzold'
    });
    log('player connected');
    this.players.push(player);
    client.emit('loadLevel', this.map.json);
  },
  
  loadLevel: function(map, fn) {
    var self = this;
    fs.readFile(self.options.mapsPath + map + '.js', 'utf8', function(e, data) {
      if (e) {
        fn && fn(e);
        return;
      }
      
      var mapObject;
      try {
        mapObject = JSON.parse(data);
      } catch(e) {
        fn && fn(e);
        return;
      }
      
      self.map = new Map(mapObject);
      self.socket.emit('loadLevel', self.map.json);
      fn && fn();
    });
  }

};
