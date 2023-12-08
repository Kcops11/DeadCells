class Scene1 extends Phaser.Scene{
  constructor(){
    super("bootGame");
  }

  preload(){
    this.load.image("room", "assets/images/room.png");
    this.load.image("door", "assets/images/door.png");
    this.load.image("door90", "assets/images/door90.png");
    
    this.load.image("Menu_frame_1", "assets/images/MenuFrames/Menu_frame_1.png");
    this.load.image("Menu_frame_2", "assets/images/MenuFrames/Menu_frame_2.png");
    this.load.image("Menu_frame_3", "assets/images/MenuFrames/Menu_frame_3.png");
    this.load.image("Menu_frame_4", "assets/images/MenuFrames/Menu_frame_4.png");
    this.load.image("Menu_frame_5", "assets/images/MenuFrames/Menu_frame_5.png");
    this.load.image("Menu_frame_6", "assets/images/MenuFrames/Menu_frame_6.png");
    this.load.image("Menu_frame_9", "assets/images/MenuFrames/Menu_frame_9.png");
    this.load.image("Menu_frame_10", "assets/images/MenuFrames/Menu_frame_10.png");
    this.load.image("Menu_frame_11", "assets/images/MenuFrames/Menu_frame_11.png");
    this.load.image("Menu_frame_12", "assets/images/MenuFrames/Menu_frame_12.png");
    this.load.image("Menu_frame_13", "assets/images/MenuFrames/Menu_frame_13.png");
    this.load.image("Menu_frame_14", "assets/images/MenuFrames/Menu_frame_14.png");
    this.load.image("Menu_frame_15", "assets/images/MenuFrames/Menu_frame_15.png");
    this.load.image("Menu_frame_16", "assets/images/MenuFrames/Menu_frame_16.png");
    this.load.image("Menu_frame_17", "assets/images/MenuFrames/Menu_frame_17.png");
    this.load.image("Menu_frame_18", "assets/images/MenuFrames/Menu_frame_18.png");
    this.load.image("Menu_frame_19", "assets/images/MenuFrames/Menu_frame_19.png");
    this.load.image("Menu_frame_20", "assets/images/MenuFrames/Menu_frame_20.png");
    this.load.image("Menu_frame_21", "assets/images/MenuFrames/Menu_frame_21.png");
    this.load.image("Menu_frame_22", "assets/images/MenuFrames/Menu_frame_22.png");
    this.load.image("Menu_frame_23", "assets/images/MenuFrames/Menu_frame_23.png");
    this.load.image("Menu_frame_24", "assets/images/MenuFrames/Menu_frame_24.png");
    this.load.image("Menu_frame_25", "assets/images/MenuFrames/Menu_frame_25.png");
    this.load.image("Menu_frame_26", "assets/images/MenuFrames/Menu_frame_26.png");
    this.load.image("Menu_frame_27", "assets/images/MenuFrames/Menu_frame_27.png");
    this.load.image("Menu_frame_28", "assets/images/MenuFrames/Menu_frame_28.png");
    this.load.image("Menu_frame_29", "assets/images/MenuFrames/Menu_frame_29.png");
    this.load.image("Menu_frame_30", "assets/images/MenuFrames/Menu_frame_30.png");
    this.load.image("Menu_frame_31", "assets/images/MenuFrames/Menu_frame_31.png");
    this.load.image("Menu_frame_32", "assets/images/MenuFrames/Menu_frame_32.png");
    this.load.image("Menu_frame_33", "assets/images/MenuFrames/Menu_frame_33.png");
    this.load.image("settings_menu", "assets/images/MenuFrames/settings_menu.png");
    this.load.image("exitbutt", "assets/images/MenuFrames/exit_button.png");
    this.load.image("sbh1", "assets/images/MenuFrames/settingsborder_highlight1.png");
    this.load.image("sbh2", "assets/images/MenuFrames/settingsborder_highlight2.png");
    this.load.image("Vempty","assets/images/MenuFrames/Volumeframe.png");
    this.load.image("V1","assets/images/MenuFrames/Volumeframe1.png");
    this.load.image("V2","assets/images/MenuFrames/Volumeframe2.png");
    this.load.image("V3","assets/images/MenuFrames/Volumeframe3.png");
    this.load.image("V4","assets/images/MenuFrames/Volumeframe4.png");
    this.load.image("V5","assets/images/MenuFrames/Volumeframe5.png");
    this.load.image("V6","assets/images/MenuFrames/Volumeframe6.png");
    this.load.image("V7","assets/images/MenuFrames/Volumeframe7.png");
    this.load.image("V8","assets/images/MenuFrames/Volumeframe8.png");
    this.load.image("V9","assets/images/MenuFrames/Volumeframe9.png");
    this.load.image("V10","assets/images/MenuFrames/Volumeframe10.png");
    this.load.image("minus","assets/images/MenuFrames/decr.png");
    this.load.image("plus","assets/images/MenuFrames/incr.png");
    this.load.image("no_check","assets/images/MenuFrames/fullscreen_empty.png");
    this.load.image("check","assets/images/MenuFrames/fullscreen_checked.png");
    this.load.image("keysbox", "assets/images/MenuFrames/boxforkeys.png");

    this.load.image("character_fighter", "assets/characters/fighter_right.png");
    this.load.image("character_paladin", "assets/characters/paladin_right.png");
    this.load.image("character_necromancer", "assets/characters/necromancer_right.png");
    this.load.image("character_ranger", "assets/characters/ranger_right.png");


    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    //
    // this.load.spritesheet("power-up", "assets/spritesheets/power-up.png",{
    //   frameWidth: 16,
    //   frameHeight: 16
    // });

    this.load.spritesheet("enemy_left", "assets/enemies/slime_left.png",{
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("enemy_right", "assets/enemies/slime_right.png",{
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("player", "assets/spritesheets/player.png",{
      frameWidth: 16,
      frameHeight: 24
    });
    this.load.spritesheet("character_right" , "assets/characters/fighter_right.png",{
        frameWidth: 32,
        frameHeight: 32
    });
	this.load.spritesheet("character_left" , "assets/characters/fighter_left.png",{
        frameWidth: 32,
        frameHeight: 32
    });
    //
     this.load.spritesheet("beam", "assets/spritesheets/beam.png",{
       frameWidth: 16,
       frameHeight: 16
     });



    //
     this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

     this.load.audio("audio_beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);
     this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
    // this.load.audio("audio_pickup", ["assets/sounds/pickup.ogg", "assets/sounds/pickup.mp3"]);
    this.load.audio("music", ["assets/sounds/sci-fi_platformer12.ogg", "assets/sounds/fi_platformer12.mp3"]);
  }

  create(){

    this.add.text(20,20,"Loading game...");
    this.scene.start("menuGame");
    //this.scene.start("playGame");


    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    })
    //
    //
    //
    // this.anims.create({
    //   key: "red",
    //   frames: this.anims.generateFrameNumbers("power-up",{
    //     start:0,
    //     end: 1
    //   }),
    //   frameRate: 20,
    //   repeat:-1
    // });
    //
    // this.anims.create({
    //   key: "gray",
    //   frames: this.anims.generateFrameNumbers("power-up",{
    //     start:2,
    //     end: 3
    //   }),
    //   frameRate: 20,
    //   repeat:-1
    // });
    //
    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    });
    //
    //
     this.anims.create({
       key: "beam_anim",
       frames: this.anims.generateFrameNumbers("beam"),
       frameRate:20,
       repeat: -1
     });

     this.anims.create({
       key: 'menu_start' ,
       frames: [
         {key: 'Menu_frame_1'},
         {key: 'Menu_frame_2'},
         {key: 'Menu_frame_3'},
         {key: 'Menu_frame_4'},
         {key: 'Menu_frame_5'},
         {key: 'Menu_frame_6', duration: 50},
       ],
       frameRate: 10,
       repeat: -1
     });
     this.anims.create({
       key: 'menu_agitate' ,
       frames: [
         {key: 'Menu_frame_9'},
         {key: 'Menu_frame_10'},
         {key: 'Menu_frame_11'},
         {key: 'Menu_frame_12'},
         {key: 'Menu_frame_13'},
         {key: 'Menu_frame_14'},
         {key: 'Menu_frame_15'},
         {key: 'Menu_frame_16'},
         {key: 'Menu_frame_17'},
         {key: 'Menu_frame_18'},
         {key: 'Menu_frame_19'},
         {key: 'Menu_frame_20'},
         {key: 'Menu_frame_21'},
         {key: 'Menu_frame_22'},
         {key: 'Menu_frame_23'},
         {key: 'Menu_frame_24'},
         {key: 'Menu_frame_25'},
         {key: 'Menu_frame_26'},
         {key: 'Menu_frame_27'},
         {key: 'Menu_frame_28'},
         {key: 'Menu_frame_29'},
         {key: 'Menu_frame_30'},
         {key: 'Menu_frame_31'},
         {key: 'Menu_frame_32'},
         {key: 'Menu_frame_33', duration: 3},
       ],
       frameRate: 10,
       repeat: 0
     });
  }
}
