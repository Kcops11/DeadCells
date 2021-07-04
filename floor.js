var doors;
var player;
var selectedCharacter_right;
var selectedCharacter_left;
var level = 1;
var isGod;
var health;
var currRoom;
var roomIndex;
// var context;
// var volume;
// var up;             // these keys are programmed upon every load up and can be changed to use any key
// var down;
// var left;
// var right;
// var fire;

class Floor extends Phaser.Scene{



	constructor(){
		super("playGame");
	}

	init(data){
	    this.selectedCharacter_left = data.character_left;
        this.selectedCharacter_right = data.character_right;
				// this.cursorKeys = this.input.keyboard.createCursorKeys();            // create keys here and then map them out
				// up = this.input.keyboard.addKey(data.upKey.keyCode);
				// down =  this.input.keyboard.addKey(data.downKey.keyCode);
				// left = this.input.keyboard.addKey(data.leftKey.keyCode);
				// right = this.input.keyboard.addKey(data.rightKey.keyCode);
				// fire = this.input.keyboard.addKey(data.fireKey.keyCode);             // fire instead of space, can be space but fire has more clarity
    }

	create(){

    isGod = false;
    health = 10000;
    roomIndex = 0;

				//context = this;             // allows me to pass in "this" to svV2, doing this may be redundant and or a security risk and so if you want to adjust svv2 to fix this thats fine

				this.physics.world.setBounds(32,32,this.game.config.width - 64, this.game.config.height -64);
        this.background = this.add.image(0,0,"room");
        this.background.setOrigin(0,0);

        this.doors = this.physics.add.staticGroup();
        this.collapsedDoors = this.physics.add.staticGroup();

        //always only create a left door
        this.doors.create(20, 52, "door90");
        this.collapsedDoors.create(this.game.config.width - 15, this.game.config.height - 52, "collapsedDoor");
        this.finished = 0;


        this.enemyspeed = 150;

				//svV2(data, context);

        this.player = this.physics.add.sprite(this.game.config.width - 32, this.game.config.height -32, this.selectedCharacter_left);

        //Door collisions
        this.physics.add.collider(this.player, this.doors,this.newRoom, null, this);
				this.physics.add.collider(this.player, this.collapsedDoors, this.newRoom, null, this);



        console.log(this.enemyspeed);

        this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);
        this.physics.setCollideWorldBounds
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.projectiles = this.add.group();
				this.eprojectiles = this.add.group();

				this.direction = "left";
				this.enemies = this.physics.add.group();
				this.rocks = this.physics.add.staticGroup();
				this.chests = this.physics.add.staticGroup();

				this.powerUp = 0;

        this.enemyCollider = this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
				this.physics.add.overlap(this.player, this.eprojectiles, this.hurtPlayer, null, this);
				this.physics.add.overlap(this.rocks, this.projectiles, this.hitRock, null, this);
				this.physics.add.overlap(this.player, this.chests, this.powerPC, null, this);

        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(this.game.config.width, 0);
        graphics.lineTo(this.game.config.width, 10);
        graphics.lineTo(0, 10);
        graphics.lineTo(0, 0);
        graphics.closePath();
        graphics.fillPath();

        this.healthLabel = this.add.bitmapText(10, 0, "pixelFont", "HEALTH  010000", 16);

        this.beamSound = this.sound.add("audio_beam");
        this.explosionSound = this.sound.add("audio_explosion");

        this.music = this.sound.add("music");
        var musicConfig={
          mute: false,
          volume:0.02,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: false,
          delay: 0
        }
				// var musicConfig={                 // music config is now using volume here
        //   mute: false,
        //   volume: volume,
        //   rate: 1,
        //   detune: 0,
        //   seek: 0,
        //   loop: false,
        //   delay: 0
        // }

        this.music.play(musicConfig);

        currRoom = new Room(this,0);
        currRoom.drawRoom(roomIndex);
        if(isGod){
          this.enemyCollider.active = false;
        }else{
          this.enemyCollider.active = true;
        }
	}

	update(){


      this.movePlayerManager();

			if (this.enemies.getChildren().length == 0)
			{
				this.finished = 1;
			}
			else
			{

	    for (var i = 0; i < this.enemies.getChildren().length; i++)
	    {
				var enemy = this.enemies.getChildren()[i]
				enemy.shootCounter += 1;
	      if (this.enemies.getChildren()[i].shootCounter > this.enemies.getChildren()[i].shootUpper)
	      {
	        this.enemies.getChildren()[i].shootCounter = 0;
	        this.eshootBeam(this.enemies.getChildren()[i]);
	      }


	      if (this.enemies.getChildren()[i].x > enemy.right){
	        if (enemy.class == 0 || enemy.class == 3) this.enemies.getChildren()[i].setTexture("slime_left");
					if (enemy.class == 1 || enemy.class == 4) this.enemies.getChildren()[i].setTexture("cat_left");
					if (enemy.class == 2 || enemy.class == 5) this.enemies.getChildren()[i].setTexture("snake_left");
	        // this.enemies.getChildren()[i].setVelocity(-this.enemyspeed, 0);
					this.enemies.getChildren()[i].direction = "left";
	      }



	      if (this.enemies.getChildren()[i].x < enemy.left){
	        if (enemy.class == 0 || enemy.class == 3) this.enemies.getChildren()[i].setTexture("slime_right");
					if (enemy.class == 1 || enemy.class == 4) this.enemies.getChildren()[i].setTexture("cat_right");
					if (enemy.class == 2 || enemy.class == 5) this.enemies.getChildren()[i].setTexture("snake_right");
	        // this.enemies.getChildren()[i].setVelocity(this.enemyspeed, 0);
					this.enemies.getChildren()[i].direction = "right";
	      }

				if (this.enemies.getChildren()[i].direction == "right") this.enemies.getChildren()[i].setVelocity(this.enemyspeed, 0);
	      else if (this.enemies.getChildren()[i].direction == "left") this.enemies.getChildren()[i].setVelocity(-this.enemyspeed, 0);
	    }
		}

     if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
       if (this.player.active){
         this.shootBeam();
       }
     }

		 // if (Phaser.Input.Keyboard.JustDown(fire)){  // updated fire method, should replace what is above
			//  if (this.player.active){
			// 	 this.shootBeam();
			//  }
		 // }
    //
     for(var j = 0;
       j < this.projectiles.getChildren().length;
       j++)
     {
       var beam = this.projectiles.getChildren()[j];
       beam.update();
     }


     //god mode for development since the enemy collisions are so loud
     if(Phaser.Input.Keyboard.JustDown(this.W)){
        if(!isGod){
          this.enemyCollider.active = false;
          isGod =true;
        }else{
          this.enemyCollider.active = true;
          isGod = false;
        }
     }

  }

  // movePlayerManager(){
  //   let playerSpeed = 200;
	//
  //   if(this.cursorKeys.left.isDown){
	// 	this.direction = "left"
	// 	this.player.setTexture(this.selectedCharacter_left);
  //     this.player.setVelocityX(-playerSpeed);
  //   }else if(this.cursorKeys.right.isDown){
	// 	this.direction= "right";
	// 	this.player.setTexture(this.selectedCharacter_right);
  //     this.player.setVelocityX(playerSpeed);
  //   }else{this.player.setVelocityX(0);}
	//
  //   if(this.cursorKeys.up.isDown){
  //     this.player.setVelocityY(-playerSpeed);
	// 		this.direction="up";
  //   }else if(this.cursorKeys.down.isDown){
  //     this.player.setVelocityY(playerSpeed);
	// 		this.direction="down";
  //   } else{this.player.setVelocityY(0);}
	//
  // }

	movePlayerManager(){                                      // pretty similar to what is above, conditionals now check key variables directly for isDown, this allows flexibility in terms of binding
		let playerSpeed = 200;

		if(left.isDown){
		this.direction = "left"
		this.player.setTexture("character_left");
			this.player.setVelocityX(-playerSpeed);
		}else if(right.isDown){
		this.direction="right";
		this.player.setTexture("character_right");
			this.player.setVelocityX(playerSpeed);
		}else{this.player.setVelocityX(0);}

		if(up.isDown){
			this.player.setVelocityY(-playerSpeed);
		}else if(down.isDown){
			this.player.setVelocityY(playerSpeed);
		} else{this.player.setVelocityY(0);}

	}

   shootBeam(){
     var beam = new Beam(this);
     this.beamSound.play();
   }
	 eshootBeam(e){
		var beam = new EBeam(e, this);
		this.beamSound.play();
	}


  hurtPlayer(player, enemy){


    health -= 100;
    this.healthLabel.text = "HEALTH    " + health;
    var explosion = new Explosion(this, player.x, player.y);

    this.explosionSound.play();

    if (health < 1) {

      var explosion = new Explosion(this, player.x, player.y);

      this.scene.start("menuGame");
    }


  }

	powerPC(player, chest){
		if ( (this.powerUp & chest.powerUp) == 0)
		{this.powerUp += chest.powerUp;}
		chest.destroy();

		if ((this.powerUp & 0b10) == 0b10){
			this.powerUp -= 0b10;
			console.log("adding health");
			health += 2000;
			  this.healthLabel.text = "HEALTH    " + health;
		}

	}

  hitEnemy(projectile, enemy){
    var explosion = new Explosion(this, enemy.x, enemy.y);

    projectile.destroy();
    enemy.destroy();


    this.explosionSound.play();
  }

	hitRock(projectile, rock){
    var explosion = new Explosion(this, rock.x, rock.y);

    projectile.destroy();
    // rock.destroy();
		if (this.powerUp & 0b01)
		{
    	this.explosionSound.play();
			rock.destroy();
		}
  }



  loadNewRoom(room){

  }

  newRoom(){
		if (this.finished==1)
		{
			this.finished = 0;
	    console.log(roomIndex);
	    if(roomIndex == 5){
	      this.scene.start("menuGame");
	      roomIndex = 0;
	      return;
	    }
	    currRoom.destroyRoom();
	    roomIndex +=1;
	    currRoom.drawRoom(roomIndex);
	    this.player.x = this.game.config.width - 32;
	    this.player.y = this.game.config.height - 32;
	  }
	}

}

// function svV2(data, context){              //this function allows for volume control
// 	volume = data.vol;
// 	var gamevol = volume * 4; // scales up master sound to work for game sound
// 	context.sound.volume = gamevol/2.5; // game sound is really loud so this serves as an artifical limit
// }
