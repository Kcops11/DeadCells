class EBeam extends Phaser.GameObjects.Sprite{
  constructor(e, scene)
  {

      var x = e.x;
      var y = e.y;
      super(scene, x, y, "beam");
      scene.add.existing(this);
      scene.eprojectiles.add(this);
      this.play("beam_anim");
      scene.physics.world.enableBody(this);

      var speed = 1000;

      if (e.class==0||e.class==3)
      {
        if (e.direction=="left")
        {
          this.body.velocity.x = -speed;
          //this.body.velocity.y = speed;
      	}
      	else
      	{
      		this.body.velocity.x = speed;
          //this.body.velocity.y = speed;
      	}
      }
      else if (e.class == 1||e.class==4)
      {
        let xlen = scene.player.x - x;
        let xab = (xlen>0) ? xlen : -xlen;
        let ylen = scene.player.y - y;
        let yab = (ylen>0) ? ylen : -ylen;
        // let base = ((xlen^2) + (ylen^2))^0.5;
        // base = (base < 0) ? -base : base;
        // console.log("xlen: "+ xlen + "  ylen:  " + ylen + "  base:  "+ base);
        // let xgrad = (xlen>0) ? (xlen/base)^2 : -((xlen/base)^2);
        // let ygrad = (ylen>0) ? (ylen/base)^2 : -((ylen/base)^2);
        let xgrad = xlen / (xab + yab);
        let ygrad = ylen / (xab + yab);
        let xspeed = xgrad*speed/4;
        let yspeed = ygrad*speed/4;
        console.log("X: "+ xspeed + "  Y:  " + yspeed);
        this.body.velocity.x = xspeed;
        this.body.velocity.y = yspeed;
      }
      else if (e.class == 2||e.class==5)
      {
        if (e.shootcount==0)  this.body.velocity.x = -speed;
        else if (e.shootcount==1)  this.body.velocity.y = -speed;
        else if (e.shootcount==2)  this.body.velocity.y = speed;
        else //count = 3
        { this.body.velocity.x = speed;
          e.shootcount=-1;
        }


        e.shootcount++;

      }
  }

  update()
  {
    if (this.x < 32 || this.x > 400 || this.y < 20 || this.y > 300)
    {
      this.destroy();
      //console.log("beam destroyed");
    }
  }

}
