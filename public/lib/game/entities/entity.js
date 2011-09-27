ig.module('game.entities.entity').requires(
    'impact.game'
  , 'impact.font'
).defines(function() {

Entity = ig.Entity.extend({
  collides: ig.Entity.COLLIDES.NEVER,

});

});
