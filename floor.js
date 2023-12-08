var doors;
var player;
var level = 1;
var currRooms = 1;
var maxRooms = Math.floor(level * 5.5);
var currRoom;
var volume;
var context;
var up;
var down;
var left;
var right;
var fire;

class Floor extends Phaser.Scene{



	constructor(){
		super("playGame");
	}



	create(data){
				 try{
					 this.cursorKeys = this.input.keyboard.createCursorKeys();
					 up = this.input.keyboard.addKey(data.upKey.keyCode);
					 down =  this.input.keyboard.addKey(data.downKey.keyCode);
					 left = this.input.keyboard.addKey(data.leftKey.keyCode);
					 right = this.input.keyboard.addKey(data.rightKey.keyCode);
					 fire = this.input.keyboard.addKey(data.fireKey.keyCode);
				 }catch(TypeError){

				 }
        //Loads the first room
        currRoom = new Room(currRooms, maxRooms);
				context = this;

        if(currRoom.left == null && currRoom.right == null && currRoom.up == null && currRoom.down == null){
          currRoom.up = new Room(currRooms, maxRooms);
        }

		    this.physics.world.setBounds(32,32,this.game.config.width - 64, this.game.config.height -64);
        this.background = this.add.image(0,0,"room");
        this.background.setOrigin(0,0);

        this.doors = this.physics.add.staticGroup();

        if(currRoom.left != null){
          this.doors.create(20, this.game.config.height/2, "door90");
        }
        if(currRoom.right != null){
          this.doors.create(this.game.config.width - 20, this.game.config.height/2, "door90");
        }
        if(currRoom.up != null){
          this.doors.create(this.game.config.width/2, this.game.config.height-20, "door");
        }
        if(currRoom.down != null){
          this.doors.create(this.game.config.width/2, 20, "door");
        }

				svV2(data, context);

        this.enemyspeed = 150;

        this.player = this.physics.add.sprite(this.game.config.width/2 - 8, this.game.config.height -64, "character_left");

        //Door collisions
        this.physics.add.collider(this.player, this.doors, this.loadNewRoom, null, this);

        this.enemy1 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2, "enemy_right");
        this.enemy2 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/4, "enemy_right");
        this.enemy3 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/1.33, "enemy_right");

        console.log(this.enemyspeed);


        this.player.setCollideWorldBounds(true);
        this.physics.setCollideWorldBounds
        //this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.projectiles = this.add.group();

		this.direction = "left";
		this.enemies = this.physics.add.group();
         this.enemies.add(this.enemy1);
         this.enemies.add(this.enemy2);
         this.enemies.add(this.enemy3);

         this.enemy1.setVelocity(this.enemyspeed, 0);
        this.enemy2.setVelocity(this.enemyspeed, 0);
        this.enemy3.setVelocity(this.enemyspeed, 0);

         this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
         this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

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
         this.health = 10000;

          this.beamSound = this.sound.add("audio_beam");
         this.explosionSound = this.sound.add("audio_explosion");

         this.music = this.sound.add("music");
        var musicConfig={
          mute: false,
          volume:volume,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: false,
          delay: 0
        }
        this.music.play(musicConfig);
	}

	update(){
    // this.moveShip(this.ship1, 1);
    // this.moveShip(this.ship2, 2);
    // this.moveShip(this.ship3, 3);

      this.movePlayerManager();


    for (var i = 0; i < this.enemies.getChildren().length; i++)
    {
      if (this.enemies.getChildren()[i].x > this.game.config.width-50){
        this.enemies.getChildren()[i].setTexture("enemy_left");
        this.enemies.getChildren()[i].setVelocity(-this.enemyspeed, 0);
      }

      if (this.enemies.getChildren()[i].x < this.game.config.width/2){
        this.enemies.getChildren()[i].setTexture("enemy_right");
        this.enemies.getChildren()[i].setVelocity(this.enemyspeed, 0);
      }
    }

     if (Phaser.Input.Keyboard.JustDown(fire)){
       if (this.player.active){
         this.shootBeam();
       }
     }
    //
     for(var j = 0;
       j < this.projectiles.getChildren().length;
       j++)
     {
       var beam = this.projectiles.getChildren()[j];
       beam.update();
     }

  }

  movePlayerManager(){
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

  // moveShip(ship, speed)
  // {
  //   ship.y += speed;
  //
  //   if (ship.y > this.game.config.height)
  //   {
  //     this.resetShipPos(ship);
  //   }
  // }
  //
  // resetShipPos(ship){
  //   ship.y = 0;
  //   var randomX = Phaser.Math.Between(0, this.game.config.width);
  //   ship.x = randomX;
  // }
  //
  // destroyShip(pointer, gameObject){
  //   // gameObject.setTexture("explosion");
  //   // gameObject.play("explode");
  //   //gameObject.destroy();
  //   var explosion = new Explosion(this, gameObject.x, gameObject.y);
  //   gameObject.destroy();
  //
  //
  // }
  //
   shootBeam(){
     var beam = new Beam(this);
     this.beamSound.play();
   }

  // pickPowerUp(player, powerUp){
  //   powerUp.disableBody(true, true);
  //   this.pickupSound.play();
  // }
  //
  hurtPlayer(player, enemy){
    //this.resetShipPos(enemy);

    this.health -= 100;
    //this.player.anims.play("explode");
    this.healthLabel.text = "HEALTH    " + this.health;
    var explosion = new Explosion(this, player.x, player.y);

    this.explosionSound.play();

    if (this.health < 1) {

      var explosion = new Explosion(this, player.x, player.y);

      //this.explosionSound.play();
      //this.player.destroy();
      this.scene.start("menuGame");

    }

    //console.log(this.health);
    //this.player.anims.stop(null, true);
    //this.player.setTexture("character_left");

    // if (this.player.alpha < 1) {
    //   return;
    // }
    //
    // var explosion = new Explosion(this, player.x, player.y);
    //
    //
    // player.disableBody(true, true);
    //
    // this.time.addEvent({
    //   delay:1000,
    //   callback: this.resetPlayer(),
    //   callbackScope: this,
    //   loop: false
    // });
    //
    // player.x = this.game.config.width / 2 - 8;
    // player.y = this.game.config.height / 2 - 64;
  }
  // resetPlayer(){
  //   var x = this.game.config.width / 2 - 8;
  //   var y = this.game.config.height +64;
  //   this.player.enableBody(true, x, y, true, true);
  //
  //   this.player.alpha = 0.5;
  //
  //   var tween = this.tweens.add({
  //     targets: this.player,
  //     y: this.game.config.height - 64,
  //     ease: 'Power1',
  //     duration: 1500,
  //     repeat: 0,
  //     onComplete: function(){
  //       this.player.alpha = 1;
  //     },
  //     callbackScope: this
  //   });
  //
  //
  // }

  // zeroPad(number, size){
  //   var stringNumber = String(number);
  //   while (stringNumber.length < (size || 2)){
  //     stringNumber = "0"+ stringNumber;
  //   }
  //   return stringNumber;
  // }
  //
  hitEnemy(projectile, enemy){

    var explosion = new Explosion(this, enemy.x, enemy.y);

    projectile.destroy();
    enemy.destroy();
    //this.score += 15;
    //var scoreFormated = this.zeroPad(this.score, 6);
    //this.text = "SCORE " + scoreFormated;

    this.explosionSound.play();
  }

  /*if(currRoom.left != null){
          this.doors.create(20, this.game.config.height/2, "door90");
        }
        if(currRoom.right != null){
          this.doors.create(this.game.config.width - 20, this.game.config.height/2, "door90");
        }
        if(currRoom.up != null){
          this.doors.create(this.game.config.width/2, this.game.config.height-20, "door");
        }
        if(currRoom.down != null){
          this.doors.create(this.game.config.width/2, 20, "door");
        }
        */

//need a way to check which door it is
  loadNewRoom(door){
      //entered a left door
      console.log("X coord:" + door.x);
      console.log ("Y coord:" + door.y);
      if(door.x == 20 && door.y == this.game.config.height/2){
        currRoom = currRoom.left;
        this.player.x = this.game.config.width/2 - 8;
      }
  }



}

function newRoom(){
    this.player.x = this.game.config.width/2 - 8;
    this.player.y = this.game.config.height/2 - 8;
  }
function svV2(data, context){
	volume = data.vol;
	var gamevol = volume * 4; // scales up master sound to work for game sound
	context.sound.volume = gamevol/2.5; // game sound is really loud so this serves as an artifical limit
}


class Room{

	constructor(currRooms, maxRooms){
		var randLeft = Math.floor(Math.random() * 2);
		var randRight = Math.floor(Math.random() * 2);
		var randUp = Math.floor(Math.random() * 2);
		var randDown = Math.floor(Math.random() * 2);

		this.left = null;
		this.right = null;
		this.up = null;
		this.down = null;

		if(randLeft == 1 && currRooms < maxRooms){
			this.left = new Room(currRooms, maxRooms);
      		currRooms+=1;
		}

		if(randRight == 1 && currRooms < maxRooms){
			this.right = new Room(currRooms, maxRooms);
      		currRooms+=1;
		}

		if(randUp == 1 && currRooms < maxRooms){
			this.up = new Room(currRooms, maxRooms);
      		currRooms+=1;
		}

		if(randDown == 1 && currRooms < maxRooms){
			this.down = new Room(currRooms, maxRooms);
      		currRooms+=1;
		}


	}


}
