var fs = require('fs')
  , Class = require('klass')
  , Vector = require('./vector')
  , Map = require('./map')
  , Player = require('./player');

var Game = module.exports = Class({

  initialize: function(io, options) {
    this.options = {
        room: options.room || 'room'
      , map: options.map || 'test'
      , mapsPath: options.mapsPath || __dirname + '/../public/lib/game/levels/'
      , maxPlayers: options.maxPlayers || 12
      , fps: options.fps || 60
    };
    
    this.players = {};
    this.loadLevel(this.options.map);
    
    this.socket = io.of('/' + this.options.room);
    this.socket.on('connection', this.onConnection.bind(this));
    
    this._interval = setInterval(this.update.bind(this), 1000 / this.options.fps);
  },
  
  update: function() {
    var self = this;

    Object.keys(self.players).forEach(function(nickname) {
      self.players[nickname].update();
    });
    
    self.socket.emit('update', self.getState());
  },
  
  getState: function() {
    var self = this
      , state = {
        players: {}
    };

    Object.keys(self.players).forEach(function(nickname) {
      var player = self.players[nickname];
      state.players[player.nick] = player.toObject();
    });
    
    return state;
  },
  
  onConnection: function(client) {
    var self = this;
    client.on('join', function(data) {
      var nickname = data.nickname;
      self.players[nickname] = new Player(self.socket, client, { nick: nickname, map: self.map });
      client.on('disconnect', function() {
        delete self.players[nickname];
      });
      client.emit('init', { map: self.map.json, state: self.getState() });
    });
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

});
