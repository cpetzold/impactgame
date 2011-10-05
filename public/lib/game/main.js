ig.module( 
  'game.main' 
)
.requires(
    'impact.game'
  , 'impact.font'
  //, 'impact.debug.debug'
  , 'plugins.webgl-2d'
  
  , 'game.entities.player'
)
.defines(function(){

MyGame = ig.Game.extend({
  
  font: new ig.Font( 'media/04b03.font.png' ),
  
  init: function() {
    this.socket = io.connect(window.location.href);
    
    this.players = {};
    
    this.actions = {};
    this.bindActions({
        'left': ig.KEY.LEFT_ARROW
      , 'right': ig.KEY.RIGHT_ARROW
      , 'up': ig.KEY.UP_ARROW
      , 'down': ig.KEY.DOWN_ARROW
      , 'jump': ig.KEY.SPACE
      , 'esc': ig.KEY.ESCAPE
    });

    var nickname = prompt('Enter an alias');
    this.join(nickname);

    this.socket.on('connection', $.proxy(this.onConnection, this));
    this.socket.on('disconnect', $.proxy(this.onDisconnect, this));
    this.socket.on('init', $.proxy(this.onInit, this));
    this.socket.on('update', $.proxy(this.onUpdate, this));
    
    $(window).resize($.proxy(this.onResize, this));
  },
  
  join: function(nickname) {
    this.socket.emit('join', { nickname: nickname });
  },
  
  bindActions: function(mapping) {
    var self = this;
    Object.keys(mapping).forEach(function(key) {
      self.actions[key] = false;
      ig.input.bind(mapping[key], key);
    });
  },
  
  onInit: function(data) {
    var self = this
      , map = data.map
      , players = data.state.players;

    self.loadLevel(map);

    self.backgroundMaps.forEach(function(bg) {
      bg.preRender = true;
      bg.debugChunks = true;
      bg.chunkSize = 1024;
    });

    console.log(self.collisionMap);

    Object.keys(players).forEach(function(nickname) {
      var p = players[nickname];
      self.spawnEntity(Player, p.x, p.y, { name: nickname });
    });

    console.log(self.namedEntities);

  },
  
  onDisconnect: function(data) {
    var player = this.namedEntites[data.nickname];
    if (player) {
      player.kill();
    }
  },
  
  onConnection: function(data) {
  },
  
  onResize: function() {
    this.resize();
  },
  
  resize: function(w, h) {
    var $w = $(window)
      , w = w || $w.width()
      , h = h || $w.height();
    ig.system.resize(w, h);
  },
  
  onUpdate: function(data) {
    var self = this
      , players = data.players;
    
    Object.keys(players).forEach(function(nickname) {
      if (self.namedEntities[nickname]) {
        self.namedEntities[nickname].update(players[nickname]);
      }
    });

    //self.update();
    //self.draw();
    
  },
  
  //run: function() {
  //  this.draw();
  //},
  
  update: function() {
    var self = this;
    
    var actions = [];
    Object.keys(self.actions).forEach(function(action) {
      var state = ig.input.state(action);
      if (state && !self.actions[action]) {
        actions.push({ 'down': action });
      } else if (!state && self.actions[action]) {
        actions.push({ 'up': action });
      }
      
      self.actions[action] = state;
    });
    
    if (actions.length) {
      self.socket.emit('update', actions);
    }

  },
  
  draw: function() {
    var self = this;
    self.parent();
  }
  
});

ig.main('#canvas', MyGame, 60, window.innerWidth, window.innerHeight, 2);

});
