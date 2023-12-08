var characters;
var start;
var volume;

class SceneCharacterSelect extends Phaser.Scene {
    constructor() {
        super("characterSelect");
    }


    create(data){


        characters = this.physics.add.staticGroup();

        characters.create(this.game.config.width/13 * 2, this.game.config.height/2.4, "character_fighter");
        characters.create(this.game.config.width/13 * 5, this.game.config.height/2.4, "character_paladin");
        characters.create(this.game.config.width/13 * 8, this.game.config.height/2.4, "character_necromancer");
        characters.create(this.game.config.width/13 * 11, this.game.config.height/2.4, "character_ranger");
        svV(data);
        start = this.add.text(this.game.config.width/2, this.game.config.height/1.2, "Start Game");
        start.setInteractive();
        start.on("pointerdown", () => this.startGame());


    }

    startGame(){
        this.scene.start("playGame", {vol: volume, upKey: up, downKey: down, leftKey: left, rightKey: right, fireKey: fire});
    }

}

function svV(data){
      volume = data.vol;
    }
