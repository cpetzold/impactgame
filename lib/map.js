var Class = require('klass')
  , Vector = require('./vector')
  , Rect = require('./rect');

var Map = module.exports = Class({

  initialize: function(o) {
    var self = this;
    self.json = o;
    self.entities = o.entities;
    
    o.layer.forEach(function(layer) {
      if (layer.name == 'collision') {
        self.collision = layer;
        self.tilesize = layer.tilesize;
        return;
      }
    });
  },

  getTile: function(x, y) {
    var solid = (y >= 0) && (x >= 0) && (y < this.collision.data.length) && (x < this.collision.data[y].length) && (this.collision.data[y][x] > 0)
      , pos = new Vector(x * this.tilesize, y * this.tilesize)
      , aabb = new Rect(pos, new Vector(this.tilesize, this.tilesize));

    return {
        solid: solid
      , pos: pos
      , aabb: aabb
    };
  }

});


