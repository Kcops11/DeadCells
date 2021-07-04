/*room designs here: 10x7 grids in the form of strings

	'.' means empty space
	'$' means rock
	's' means slime

*/

var design1 = "..$$......" +
			  ".$........" +
			  "..$......." +
			  ".........." +
			  ".....d...." +
			  ".........." +
			  ".......$$.";


var design2 = "..$$$....." +
			  "..$....s.." +
			  "....s....." +
			  "....s...s." +
			  "$...s..s.." +
			  "....$...g.";

	var design3 = "..$$......" +
				  ".$........" +
				  "..$......." +
				  ".........." +
				  "....o....." +
				  ".........." +
				  ".......$$.";

	var design4 = "..$$......" +
				  ".$........" +
				  "..$......." +
				  ".........." +
				  ".....D...." +
				  ".........." +
				  ".......$$.";


	var design5 = "..$$$....." +
				  ".$$......." +
				  "..$......." +
				  ".......S.." +
				  "....S...S." +
				  "$......S.." +
				  "....$.....";

		var design6 = "..$$......" +
					  "..$......." +
					  ".........." +
					  "....O....." +
					  ".........." +
					  ".b.....$$.";


var rooms = new Array();

rooms.push(design1);
rooms.push(design2);
rooms.push(design3);
rooms.push(design4);
rooms.push(design5);
rooms.push(design6);


var roomDesign;
var renderRock;
var rocksRendered;
var enemiesRendered;
var sceneHolder;
var chestsRenered;

class Room extends Phaser.GameObjects.Sprite{



	constructor(scene){
		super(scene, "room");
		//rocksRendered = scene.physics.add.staticGroup();
		//enemiesRendered = scene.physics.add.group();
		enemiesRendered = scene.enemies;
		rocksRendered = scene.rocks;
		chestsRenered = scene.chests;
	}

	drawRoom(roomIndex){
		var lowfrequency = 30;
		var highfrequency = 18;
		roomDesign = rooms[roomIndex];
		console.log(roomDesign);
		for(var y = 0; y < 6; y++){
			for(var x = 0; x < 10; x++){
				var currTile = roomDesign[y * 10 + x];
				console.log(currTile);
				switch(currTile){
					case '$':
						rocksRendered.create((x+1.5) * 32,(y+1.3) * 40, "rock_2");
						break;
					case 's':
						var enemy = enemiesRendered.create((x+1.5) * 32,(y+1.3) * 40, "slime_right");
						enemy.setVelocity(150, 0);
						enemy.direction = "right";
						enemy.body.collideWorldBounds = true;
						enemy.enableBody();
						enemy.body.immovable = true;
						enemy.setFriction(1);
						enemy.shootCounter = 0;
						enemy.shootUpper = lowfrequency;
						enemy.class = 0;
						enemy.left = (x-1.5) * 32;
						enemy.right = (x+1.5) * 32;

						break;

					case 'o':
						var enemy = enemiesRendered.create((x+1.5) * 32,(y+1.3) * 40, "cat_right");
						//enemy.setVelocity(150, 0);
						//enemy.direction = "right";
						enemy.body.collideWorldBounds = true;
						enemy.enableBody();
						enemy.body.immovable = true;
						enemy.setFriction(1);
						enemy.shootCounter = 0;
						enemy.shootUpper = lowfrequency;
						enemy.class = 1;
						enemy.left = (x-1.5) * 32;
						enemy.right = (x+1.5) * 32;
						break;

					case 'd':
						var enemy = enemiesRendered.create((x+1.5) * 32,(y+1.3) * 40, "snake_right");
						enemy.setVelocity(150, 0);
						enemy.direction = "right";
						enemy.body.collideWorldBounds = true;
						this.shootcount = 0;
						enemy.enableBody();
						enemy.body.immovable = true;
						enemy.setFriction(1);
						enemy.shootCounter = 0;
						enemy.shootUpper = lowfrequency;
						enemy.class = 2;
						enemy.left = (x-1.5) * 32;
						enemy.right = (x+1.5) * 32;
						break;

						case 'S':
							var enemy = enemiesRendered.create((x+1.5) * 32,(y+1.3) * 40, "slime_right");
							enemy.setVelocity(150, 0);
							enemy.direction = "right";
							enemy.body.collideWorldBounds = true;
							enemy.enableBody();
							enemy.body.immovable = true;
							enemy.setFriction(1);
							enemy.shootCounter = 0;
							enemy.shootUpper = highfrequency;
							enemy.class = 0;
							enemy.left = (x-1.5) * 32;
							enemy.right = (x+1.5) * 32;

							break;

						case 'O':
							var enemy = enemiesRendered.create((x+1.5) * 32,(y+1.3) * 40, "cat_right");
							//enemy.setVelocity(150, 0);
							//enemy.direction = "right";
							enemy.body.collideWorldBounds = true;
							enemy.enableBody();
							enemy.body.immovable = true;
							enemy.setFriction(1);
							enemy.shootCounter = 0;
							enemy.shootUpper = highfrequency;
							enemy.class = 1;
							enemy.left = (x-1.5) * 32;
							enemy.right = (x+1.5) * 32;
							break;

						case 'D':
							var enemy = enemiesRendered.create((x+1.5) * 32,(y+1.3) * 40, "snake_right");
							enemy.setVelocity(150, 0);
							enemy.direction = "right";
							enemy.body.collideWorldBounds = true;
							this.shootcount = 0;
							enemy.enableBody();
							enemy.body.immovable = true;
							enemy.setFriction(1);
							enemy.shootCounter = 0;
							enemy.shootUpper = highfrequency;
							enemy.class = 2;
							enemy.left = (x-1.5) * 32;
							enemy.right = (x+1.5) * 32;
							break;

						case 'b':
								var chest = chestsRenered.create((x+1.5) * 32,(y+1.3) * 40, "black_chest");
								chest.powerUp = 0b01;
								break;

						case 'g':
								var chest = chestsRenered.create((x+1.5) * 32,(y+1.3) * 40, "green_chest");
								chest.powerUp = 0b10;
								break;

					case '.':
						break;
				}
			}
		}
		//this.scene.enemies = enemiesRendered;
		this.scene.physics.add.collider(this.scene.player, rocksRendered);
		this.scene.physics.add.collider(this.scene.player, enemiesRendered);

	}

	destroyRoom(){
		rocksRendered.getChildren().map(child => child.destroy());
		rocksRendered.remove(rocksRendered.getLast(true),true);
		rocksRendered.remove(rocksRendered.getLast(true),true);
	}

	// getEnemies(){
	// 	return slimesRendered;
	// }

}
