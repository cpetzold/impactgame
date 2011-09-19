var log = require('logging').from(__filename);

var Map = module.exports = function(o) {
  var self = this;
  self.json = o;
  self.entities = o.entities;
  
  o.layer.forEach(function(layer) {
    if (layer.name == 'collision') {
      self.collision = layer;
      return;
    }
  });
};

