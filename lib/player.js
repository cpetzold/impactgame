var Vector = require('./vector');

var Player = module.exports = function(client, o) {
  this.client = client;
  this.nick = o.nick || 'Guest';
  
  this.pos = o.pos || new Vector(0, 0);
  this.vel = o.vel || new Vector(0, 0);
  this.acc = o.acc || new Vector(0, 0);
  
  this.damp = 0.8;
  
  this.actions = {};
  
  this.client.on('update', this.onUpdate.bind(this));
};

Player.prototype = {
  
  onUpdate: function(actions) {
    var self = this;
    actions.forEach(function(action) {
      var state = Object.keys(action)[0];
      self.actions[action[state]] = (state == 'down');
    });
  },
  
  update: function() {
    this.acc.x = this.acc.y = 0;
    
    if (this.actions.right) {
      this.acc.x = 1;
    }
    if (this.actions.left) {
      this.acc.x = -1;
    }
    if (this.actions.up) {
      this.acc.y = -1;
    }
    if (this.actions.down) {
      this.acc.y = 1;
    }
    
    this.vel.add(this.acc).scale(this.damp);
    this.pos.add(this.vel);
    
    return this.toObject();
  },
  
  toObject: function() {
    return {
      p: this.pos.toObject()
    };
  }
  
};
