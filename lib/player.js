var util = require('util')
  , Dynamic = require('./dynamic')
  , Vector = require('./vector');

var Player = module.exports = Dynamic.extend({
  
  initialize: function(socket, client, options) {
    options.dim = new Vector(16, 24);
    
    this.supr(options);
    
    this.socket = socket;
    this.client = client;
    this.nick = options.nick || 'Guest';
    
    this.actions = {};
    
    this.client.on('update', this.onUpdate.bind(this));
    this.client.on('disconnect', this.onDisconnect.bind(this));
  },

  onDisconnect: function() {
    console.log(this.nick, 'disconnected');
    this.client.broadcast.emit('disconnect', { nickname: this.nick });
  },

  onUpdate: function(actions) {
    var self = this;
    actions.forEach(function(action) {
      var state = Object.keys(action)[0];
      self.actions[action[state]] = (state == 'down');
    });
  },
  
  update: function() {
    
    if (this.actions.right) {
      this.acc.x = 1;
    }
    if (this.actions.left) {
      this.acc.x = -1;
    }
    if (this.actions.up) {
      this.acc.y = -0.2;
    }
    if (this.actions.down) {
      this.acc.y = 0.2;
    }
    
    this.supr();
    
    return this.toObject();
  },
  
  toObject: function() {
    return {
      p: this.pos.toObject()
    };
  }
  
});
