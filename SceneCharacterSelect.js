var characters;
var select;
var fighter;
var paladin;
var necromancer;
var ranger;
var text;
var play;

class SceneCharacterSelect extends Phaser.Scene {
    constructor() {
        super("characterSelect");
    }

    create(){
        this.text = this.add.bitmapText(30, 175, "pixelFont", "", 16);
        //this.play = this.add.bitmapText(180, 250, "pixelFont","", 20);


        select = this.add.text(this.game.config.width/3.1, this.game.config.height/6,"Select Character:", {font: '20px pixelFont'});

        // name = this.add.text(this.game.config.width/13 * 2 - 30, this.game.config.height/2.4, "Fighter");
        // name = this.add.text(this.game.config.width/13 * 5 - 30, this.game.config.height/2.4, "Paladin");
        // name = this.add.text(this.game.config.width/13 * 8 - 40, this.game.config.height/2.4, "Necromancer");
        // name = this.add.text(this.game.config.width/13 * 11 - 25, this.game.config.height/2.4, "Ranger");

        //svV(data);
        
        characters = this.physics.add.staticGroup();

        fighter = characters.create(this.game.config.width/13 * 2, this.game.config.height/2.4, "character_fighter");
        fighter.setScale(2);
        fighter.setInteractive();
        fighter.on("pointerdown", () => this.showTextF());



        paladin = characters.create(this.game.config.width/13 * 5, this.game.config.height/2.4, "character_paladin");
        paladin.setScale(2);
        paladin.setInteractive();
        paladin.on("pointerdown", () => this.showTextP());


        necromancer = characters.create(this.game.config.width/13 * 8, this.game.config.height/2.4, "character_necromancer");
        necromancer.setScale(2);
        necromancer.setInteractive();
        necromancer.on("pointerdown", () => this.showTextN());

        ranger = characters.create(this.game.config.width/13 * 11, this.game.config.height/2.4, "character_ranger");
        ranger.setScale(2);
        ranger.setInteractive();
        ranger.on("pointerdown", () => this.showTextR());



    }
    showTextF(){
        this.text.text = "Fighter: \n" +
            "Brian is a fierce warrior. His only goal is to punch as many  \nthings as possible. Also, the occasional chick he picks up \nis always a plus.";
        play = this.add.text(180, 250, "Play", {font: '20px pixelFont'});
        play.setInteractive();
        play.on("pointerdown", () => this.startGameF());
    }
    showTextP(){
        this.text.text = "Paladin: \n" +
            "Artemis is a strong warrior who has a mission of cleansing \nthe world of plague. She is a strong willed person, but \nunderneath the act, all she really wants is a girlfriend.";
        play = this.add.text(180, 250, "Play", {font: '20px pixelFont'});
        play.setInteractive();
        play.on("pointerdown", () => this.startGameP());
    }
    showTextN(){
        this.text.text = "Necromancer: \n" +
            "Zack started learning necromancy at the age of 5 when he  \nfound a book in the forest. Since then, he has become a \nwalking war crime generator and wishes to cause more \nchaos throughout the land.";
        play = this.add.text(180, 250, "Play", {font: '20px pixelFont'});
        play.setInteractive();
        play.on("pointerdown", () => this.startGameN());
    }
    showTextR(){
        this.text.text = "Ranger: \n" +
            "Chloe hates nature. She wears plants out of spite and is a \nvegan not because she wants to save animals but because \nshe wishes to kill as many plants as possible.";
        play = this.add.text(180, 250, "Play", {font: '20px pixelFont'});
        play.setInteractive();
        play.on("pointerdown", () => this.startGameR());
    }

    startGameF(){
        this.scene.start("playGame", {character_left: "fighter_left", character_right: "fighter_right"});
        //this.scene.start("playGame", {character_left: "ranger_left", character_right: "ranger_right", vol: volume, upKey: up, downKey: down, leftKey: left, rightKey: right, fireKey: fire}); // need this data passed in
    }
    startGameP(){
        this.scene.start("playGame", {character_left: "paladin_left", character_right: "paladin_right"});
        //this.scene.start("playGame", {character_left: "ranger_left", character_right: "ranger_right", vol: volume, upKey: up, downKey: down, leftKey: left, rightKey: right, fireKey: fire});
    }
    startGameN(){
        this.scene.start("playGame", {character_left: "necromancer_left", character_right: "necromancer_right"});
        //this.scene.start("playGame", {character_left: "ranger_left", character_right: "ranger_right", vol: volume, upKey: up, downKey: down, leftKey: left, rightKey: right, fireKey: fire});
    }
    startGameR(){
        this.scene.start("playGame", {character_left: "ranger_left", character_right: "ranger_right", });
        //this.scene.start("playGame", {character_left: "ranger_left", character_right: "ranger_right", vol: volume, upKey: up, downKey: down, leftKey: left, rightKey: right, fireKey: fire});
    }
}

// function svV(data){                // need this function for volume, may be redundant in character select
//       volume = data.vol;
//     }
