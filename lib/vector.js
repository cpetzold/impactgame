var Class = require('klass');

var Vector = module.exports = Class({

  initialize: function(x, y) {
    if (typeof x == 'object') {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
    
  },

  add: function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  },

  subtract: function(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  },

  multiply: function(v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  },

  divide: function(v) {
    if (!v.x) {
      v = { x: v, y: v };
    }

    this.x /= v.x;
    this.y /= v.y;
    return this;
  },

  scale: function(s) {
    this.x *= s;
    this.y *= s;
    return this;
  },

  round: function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  },

  zero: function() {
    this.x = this.y = 0;
    return this;
  },

  toObject: function() {
    return { x: this.x, y: this.y };
  }

});
