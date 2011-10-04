var Class = require('klass')
  , Vector = require('./vector')
  , Rect = require('./rect');

var Dynamic = module.exports = Class({
  initialize: function(options) {
    var options = options || {};
    
    this.map = options.map;


    this.pos = options.pos || new Vector(0, 0);
    this.dim = options.dim || new Vector(0, 0);
    this.vel = options.vel || new Vector(0, 0);
    this.acc = options.acc || new Vector(0, 0);
    this.damp = options.damp || new Vector(0.95, 1);
    this.grav = options.grav || new Vector(0, 0.1);

  },

  getAABB: function() {
    return new Rect(this.pos, this.dim);
  },

  update: function() {


    this.acc.add(this.grav);
    this.vel.add(this.acc).multiply(this.damp);
    
    this.pos.add(this.vel);
    
    var offset = this.collideMap();
    if (offset) {
      if (offset.x) {
        this.pos.x += (this.vel.x > 0) ? -offset.x : offset.x;
        this.vel.x = 0;
      }
      if (offset.y) {
        this.pos.y += (this.vel.y > 0) ? -offset.y : offset.y;
        this.vel.y = 0;
      }
    }

    
    this.acc.zero();
    return this;
  },

  collideMap: function() {
    var rel = new Vector(this.pos).divide(this.map.tilesize).round().subtract(new Vector(1, 1))
      , aabb = this.getAABB();

    var tiles = {
        x: [ this.map.getTile(rel.x, rel.y), this.map.getTile(rel.x + 1, rel.y) ]
      , y: [ this.map.getTile(rel.x, rel.y + 1), this.map.getTile(rel.x + 1, rel.y + 1) ]
    };

    var offset = new Vector();
    
    Object.keys(tiles).forEach(function(xy) {
      tiles[xy].forEach(function(tile) {
        if (tile.solid) {
          var col = aabb.intersection(tile.aabb);
          if (col) {
            offset[xy] = col.dim[xy];
          }
        }
      });
    });


    return (offset.x || offset.y) ? offset : false;
  }

});
