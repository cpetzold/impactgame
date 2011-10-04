var Class = require('klass')
  , Vector = require('./vector');

var Rect = module.exports = Class({

  initialize: function(pos, dim) {
    this.pos = pos;
    this.dim = dim;
    
    this.set();
  },

  set: function() {
    this.top = this.pos.y;
    this.bottom = this.pos.y + this.dim.y;
    this.left = this.pos.x;
    this.right = this.pos.x + this.dim.x;

    this.topleft = this.pos;
    this.topright = new Vector(this.right, this.top);
    this.bottomleft = new Vector(this.left, this.bottom);
    this.bottomright = new Vector(this.right, this.bottom)
  },

  contains: function(x, y) {
    console.log(typeof x, x.constructor);
    return (x >= this.left &&
            x <= this.right &&
            y >= this.top &&
            y <= this.bottom);
  },

  containsVector: function(v) {
    return this.contains(v.x, v.y);
  },

  containsRect: function(r) {
    return this.contains(r.topleft) && this.contains(r.bottomright);
  },

  intersection: function(r) {
    var x0 = Math.max(this.left, r.left)
      , x1 = Math.min(this.right, r.right);

    if (x0 <= x1) {
      var y0 = Math.max(this.top, r.top)
        , y1 = Math.min(this.bottom, r.bottom);

      if (y0 <= y1) {
        return new Rect(new Vector(x0, y0), new Vector(x1 - x0, y1 - y0));
      }
    }
    return false;
  }

});
