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
	else if (scene.direction=="right")
	{
		this.body.velocity.x = 1000;
	}
  else if (scene.direction=="up")
	{
		this.body.velocity.y = -1000;
	}
  else if (scene.direction=="down")
	{
		this.body.velocity.y = 1000;
	}

  }

  update(){
    if (this.x < 32 || this.x > 400 || this.y < 20 || this.y > 300){
      this.destroy();
      //console.log("beam destroyed");
    }
  }

}
