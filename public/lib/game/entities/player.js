ig.module('game.entities.player').requires(
    'impact.game'
  , 'impact.font'
  , 'game.entities.entity'
).defines(function() {

Player = Entity.extend({
  size: {x: 16, y: 24},
  
  animSheet: new ig.AnimationSheet('media/player.png', 16, 24),
  
  init: function( x, y, settings ) {
    this.addAnim('idle', .1, [0]);
    this.parent( x, y, settings );
  },
  
  update: function(o) {
    this.pos.x = o.p.x;
    this.pos.y = o.p.y;
  }
});

});
