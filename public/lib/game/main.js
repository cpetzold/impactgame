ig.module( 
  'game.main' 
)
.requires(
    'impact.game'
  , 'impact.font'
)
.defines(function(){

MyGame = ig.Game.extend({
  
  font: new ig.Font( 'media/04b03.font.png' ),
  
  init: function() {
    this.socket = io.connect(window.location.href);
    
    this.actions = {};
    this.bindActions({
        'left': ig.KEY.LEFT_ARROW
      , 'right': ig.KEY.RIGHT_ARROW
      , 'jump': ig.KEY.SPACE
      , 'esc': ig.KEY.ESCAPE
    });
    
    this.socket.on('connection', $.proxy(this.onConnection, this));
    this.socket.on('loadLevel', $.proxy(this.loadLevel, this));
    
    $(window).resize($.proxy(this.onResize, this));
  },
  
  bindActions: function(mapping) {
    var self = this;
    Object.keys(mapping).forEach(function(key) {
      self.actions[key] = false;
      ig.input.bind(mapping[key], key);
    });
  },
  
  onConnection: function(data) {
    console.log('connection', data);
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
  
  update: function() {
    var self = this;
    self.parent();
    
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
      console.log(actions, self.actions);
      self.socket.emit('update', actions);
    }
    
  },
  
  draw: function() {
    this.parent();
    
    this.font.draw(ig.system.fps + ' FPS', 10, 10);
  },
  
});

ig.main('#canvas', MyGame, 60, window.innerWidth, window.innerHeight);

});
