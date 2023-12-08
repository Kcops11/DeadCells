class Beam extends Phaser.GameObjects.Sprite{
  constructor(scene){

    var x = scene.player.x;
    var y = scene.player.y;
    super(scene, x, y, "beam");
    scene.add.existing(this);
    scene.projectiles.add(this);
    this.play("beam_anim");
    scene.physics.world.enableBody(this);
	if (scene.direction=="left"){
    this.body.velocity.x = -1000;
	}
	else
	{
		this.body.velocity.x = 1000;
	}
  }

  update(){
    if (this.x < 32 || this.x > 400){
      this.destroy();
      //console.log("beam destroyed");
    }
  }

}
