

var Vector = module.exports = function(x, y) {
  if (typeof x == 'object') {
    this.x = x.x;
    this.y = x.y;
  } else {
    this.x = x;
    this.y = y;
  }
  
};

Vector.prototype.add = function(v) {
  this.x += v.x;
  this.y += v.y;
  return this;
};

Vector.add = function(v1, v2) {
  return new Vector(v1).add(v2);
};
  
Vector.prototype.subtract = function(v) {
  this.x -= v.x;
  this.y -= v.y;
  return this;
};

Vector.subtract = function(v1, v2) {
  return new Vector(v1).subtract(v2);
};

Vector.prototype.multiply = function(v) {
  this.x *= v.x;
  this.y *= v.y;
  return this;
};

Vector.multiply = function(v1, v2) {
  return new Vector(v1).multiply(v2);
};

Vector.prototype.divide = function(v) {
  this.x /= v.x;
  this.y /= v.y;
  return this;
};

Vector.divide = function(v1, v2) {
  return new Vector(v1).divide(v2);
};

Vector.prototype.scale = function(s) {
  this.x *= s;
  this.y *= s;
  return this;
};
