ig.module( 
  'game.main' 
)
.requires(
  'impact.game',
  'impact.font'
)
.defines(function(){

MyGame = ig.Game.extend({
  
  font: new ig.Font( 'media/04b03.font.png' ),
  
  
  init: function() {
  },
  
  update: function() {
    this.parent();
    
  },
  
  draw: function() {
    this.parent();
    
    this.font.draw(ig.system.fps + ' FPS', 10, 10);
  }
});

ig.main('#canvas', MyGame, 60, window.innerWidth, window.innerHeight);
});
