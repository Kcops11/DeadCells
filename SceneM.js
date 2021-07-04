var play;
var settings;
var background1;
var background2;
var settingsWindow;
var exit_button;
var sb;
var sbh1;
var sbh2;
var shtxt1;
var shtxt2;
var sh1e1;
var sh1e2;
var sh1e2_5;
var sh2e1,  sh2e6, sh2e11;
var sh2e2,  sh2e7, sh2e12;
var sh2e3,  sh2e8, sh2e13;
var sh2e4,  sh2e9, sh2e14;
var sh2e5, sh2e10, sh2e15;
var volume;
var decr;
var incr;
var context;
var up;
var down;
var left;
var right;
var fire;
var handler;
var instructions, instructions2, instructions3, instructions4, instructions5;
var defaultControls;


var minitextstyle = {font: "10px pixelFont", fill: "#fff", aling:"center"};
var medtextstyle = {font: "14px pixelFont", fill: "#fff", aling:"center"};

class SceneM extends Phaser.Scene{
  constructor(){
    super("menuGame");
  }

  create(){
    try{
      volume = parseInt(localStorage.getItem("volume")); // update volume sprite after setting it
      up = localStorage.getItem("up") ||  "null";    // check to see if controls have been set, otherwise go with default settings
      down = localStorage.getItem("down") || "null";
      left = localStorage.getItem("left") || "null";
      right = localStorage.getItem("right") || "null";
      fire = localStorage.getItem("fire") || "null";
    }catch(TypeError){
      console.log("error retrieving volume")
    }finally{
      if(!volume){
        volume = .5;
      }
      if(up== NaN || up === "null" || up === "undefined"){ //setting default controls
  			up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        defaultControls = true;
  		}
  		if(down ==NaN || down === "null" || down === "undefined"){
  			down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        defaultControls = true;
  		}
  		if(left == NaN || left === "null" || left === "undefined"){
  			left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        defaultControls = true;
  		}
  		if(right == NaN || right === "null" || right === "undefined"){
  			right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        defaultControls = true;
  		}
  		if(fire==NaN || fire === "null" || fire === "undefined"){
  			fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        defaultControls = true;
  		}
      var bool;
      try{
        bool = Number.isInteger(parseInt(up)); // try to parse settings to see if they have been stored
      }catch(TypeError){

      }
      if(bool){
        localStorage.setItem("up", up);  // on condition that they have been stored properly
        localStorage.setItem("down", down);
        localStorage.setItem("left", left);
        localStorage.setItem("right", right);
        localStorage.setItem("fire", fire);
      }else{
        localStorage.setItem("up", up.keyCode);   // on condition that they are set to default
        localStorage.setItem("down", down.keyCode);
        localStorage.setItem("left", left.keyCode);
        localStorage.setItem("right", right.keyCode);
        localStorage.setItem("fire", fire.keyCode);
      }


    }
     context = this;                                   // begin setting menu variables
     background1 = this.add.sprite(200, 150, 'Menu_frame_1').play('menu_start');
     background2 = this.add.sprite(200, 150, 'Menu_frame_9').play('menu_agitate');
     settingsWindow = this.add.sprite(200,150, 'settings_menu');
     exit_button = this.add.sprite(104, 45, 'exitbutt');
     sbh1 = this.add.sprite(104,45,'sbh1');
     sbh2 = this.add.sprite(104,45,'sbh2');
     shtxt1= this.add.text(160, 40, 'General Settings', minitextstyle);
     shtxt2= this.add.text(236, 40, 'Control bindings', minitextstyle);
     decr = this.add.sprite(102,98,'minus');
     incr = this.add.sprite(298,94, 'plus');
     //if(fullscreen){                                   // check if fullscreen is enabled, use medium style if it is, small otherwise
       //sh1e2_5 = this.add.sprite(181, 130, 'check');
       //sh1e2 = this.add.text(111, 123, "Fullscreen", medtextstyle);
       sh2e1 = this.add.text(111, 80, 'up' ,medtextstyle);
       sh2e2 = this.add.text(111, 120, 'down' ,medtextstyle);
       sh2e3 = this.add.text(111, 160, 'left' ,medtextstyle);
       sh2e4 = this.add.text(111, 200, 'right' ,medtextstyle);
       sh2e5 = this.add.text(111, 240, 'fire/use weapon' ,medtextstyle);
       mapKeycodes(medtextstyle, context);
     // }else{
     //  sh1e2_5 = this.add.sprite(165, 130, 'no_check');
     //  sh1e2 = this.add.text(111, 123, "Fullscreen", minitextstyle);
     //  sh2e1 = this.add.text(111, 80, 'up' ,minitextstyle);
     //  sh2e2 = this.add.text(111, 120, 'down' ,minitextstyle);
     //  sh2e3 = this.add.text(111, 160, 'left' ,minitextstyle);
     //  sh2e4 = this.add.text(111, 200, 'right' ,minitextstyle);
     //  sh2e5 = this.add.text(111, 240, 'fire/use weapon' ,minitextstyle);
     //  mapKeycodes(minitextstyle, context);             // map controls, used for game and for the menu to know what the keys are
     // }
     sh2e6 = this.add.sprite(271, 90, 'keysbox');
     sh2e7 = this.add.sprite(271, 130, 'keysbox');
     sh2e8 = this.add.sprite(271, 170, 'keysbox');
     sh2e9 = this.add.sprite(271, 210, 'keysbox');
     sh2e10= this.add.sprite(271, 250, 'keysbox');
     setVol(context, volume);
     sbh1.setScale(0.598);
     sbh2.setScale(0.598);
     sbh1.setX(200);
     sbh1.setY(107);
     sbh2.setX(200);
     sbh2.setY(107);
     incr.visible = false;
     decr.visible = false;
     sbh1.visible = false;
     sbh2.visible = false;
     sh1e1.visible = false;
     //sh1e2.visible = false;
     //sh1e2_5.visible = false;
     shtxt1.visible = false;
     shtxt2.visible = false;
     sh2e1.visible = false;
     sh2e2.visible = false;
     sh2e3.visible = false;
     sh2e4.visible = false;
     sh2e5.visible = false;
     sh2e6.visible = false;
     sh2e7.visible = false;
     sh2e8.visible = false;
     sh2e9.visible = false;
     sh2e10.visible = false;
     sh2e11.visible = false;
     sh2e12.visible = false;
     sh2e13.visible = false;
     sh2e14.visible = false;
     sh2e15.visible = false;
     background2.visible = false;
     background2.active = false;
     settingsWindow.setScale(0.8);
     settingsWindow.visible = false;
     exit_button.visible = false;
     play = this.add.text(180, 150+10,'Play');
     play.setInteractive();
     play.on('pointerdown', () => this.onClick());
     settings = this.add.text(165, 150+30,'Settings');
     settings.setInteractive();
     settings.on('pointerdown', () => this.clickSettings());
     this.music = this.sound.add("music");
     var musicConfig={
       mute: false,
       volume: 0.5,
       rate: 1,
       detune: 0,
       seek: 0,
       loop: false,
       delay: 0
     }
     this.music.play(musicConfig);
     timer(background1, background2);               // set animation event timer
  }

  onClick(){
    this.scene.start("characterSelect", {vol: volume, upKey: up, downKey: down, leftKey: left, rightKey: right, fireKey: fire});            // passing in relevant data that has been set in menu to other scenes
  }

  clickSettings(){                                                   // hide our text and show settings menu and its various elements
      settingsWindow.visible = true;
      settingsWindow.inputEnabled = true;
      //sh1e2_5.setInteractive();
      //sh1e2_5.on('pointerdown', () => this.toggleCheck(context));
      sbh1.visible = true;
      sh1e1.visible = true;
      shtxt1.visible = true;
      shtxt2.visible = true;
      decr.visible = true;
      incr.visible = true;
      //sh1e2.visible = true;
      //sh1e2_5.visible = true;
      decr.setInteractive();
      decr.on('pointerdown', () => lower());
      incr.setInteractive();
      incr.on('pointerdown', () => raise());
      shtxt2.setInteractive();
      shtxt2.on('pointerdown', () => this.shtxt2Clicked());
      exit_button.isEnabled = true;
      exit_button.setInteractive();
      exit_button.visible = true;
      play.visible = false;
      settings.visible = false;
      play.inputEnabled = false;
      settings.inputEnabled = false;
      exit_button.on('pointerdown', ()=>this.closeWindow());
    }

  closeWindow(){                                            // hide all settings menu elements and show main menu text
    settingsWindow.visible = false;
    settingsWindow.inputEnabled = false;
    sbh1.visible = false;
    sbh2.visible = false;
    incr.visible = false;
    decr.visible = false;
    decr.inputEnabled = false;
    incr.inputEnabled = false;
    shtxt1.visible = false;
    shtxt2.visible = false;
    sh1e1.visible = false;
    //sh1e2.visible = false;
    //sh1e2_5.visible = false;
    sh2e1.visible = false;
    sh2e2.visible = false;
    sh2e3.visible = false;
    sh2e4.visible = false;
    sh2e5.visible = false;
    sh2e6.visible = false;
    sh2e7.visible = false;
    sh2e8.visible = false;
    sh2e9.visible = false;
    sh2e10.visible = false;
    sh2e11.visible = false;
    sh2e12.visible = false;
    sh2e13.visible = false;
    sh2e14.visible = false;
    sh2e15.visible = false;
    shtxt2.inputEnabled = false;
    shtxt1.inputEnabled = false;
    exit_button.isEnabled = false;
    exit_button.visible = false;
    play.setInteractive();
    settings.setInteractive();
    play.visible = true;
    settings.visible = true;
  }
    shtxt1Clicked(){                                    // settings menu group 1 , showing those elements and hiding others
      sbh1.visible = true;
      sbh2.visible = false;
      sh1e1.visible = true;
      sh1e2.visible = true;
      sh1e2_5.visible = true;
      incr.visible = true;
      decr.visible = true;
      sh2e1.visible = false;
      sh2e2.visible = false;
      sh2e3.visible = false;
      sh2e4.visible = false;
      sh2e5.visible = false;
      sh2e6.visible = false;
      sh2e7.visible = false;
      sh2e8.visible = false;
      sh2e9.visible = false;
      sh2e10.visible = false;
      sh2e11.visible = false;
      sh2e12.visible = false;
      sh2e13.visible = false;
      sh2e14.visible = false;
      sh2e15.visible = false;
      incr.inputEnabled = true;
      decr.inputEnabled = true;
      shtxt2.inputEnabled = true;
      sh1e1.inputEnabled = true;
      sh1e2.inputEnabled = true;
      sh1e2_5.inputEnabled = true;
      shtxt1.inputEnabled = false;
      shtxt2.setInteractive();
      shtxt2.on('pointerdown', () => this.shtxt2Clicked());
    }

  shtxt2Clicked(){                                   // settings menu group 2, showing those elments and hiding others
    sbh1.visible = false;
    sbh2.visible = true;
    sh1e1.visible = false;
    sh1e2.visible = false;
    sh1e2_5.visible = false;
    incr.visible = false;
    decr.visible = false;
    sh2e1.visible = true;
    sh2e2.visible = true;
    sh2e3.visible = true;
    sh2e4.visible = true;
    sh2e5.visible = true;
    sh2e6.visible = true;
    sh2e7.visible = true;
    sh2e8.visible = true;
    sh2e9.visible = true;
    sh2e10.visible = true;
    sh2e11.visible = true;
    sh2e12.visible = true;
    sh2e13.visible = true;
    sh2e14.visible = true;
    sh2e15.visible = true;
    incr.inputEnabled = false;
    decr.inputEnabled = false;
    shtxt2.inputEnabled = false;
    sh1e1.inputEnabled = false;
    sh1e2.inputEnabled = false;
    sh1e2_5.inputEnabled = false;
    shtxt1.setInteractive();
    shtxt1.on('pointerdown', () => this.shtxt1Clicked());
    sh2e11.setInteractive();
    sh2e12.setInteractive();
    sh2e13.setInteractive();
    sh2e14.setInteractive();
    sh2e15.setInteractive();
    sh2e11.on('pointerdown', ()=> this.bindingClicked(sh2e11, context));
    sh2e12.on('pointerdown', ()=> this.bindingClicked2(sh2e12, context));
    sh2e13.on('pointerdown', ()=> this.bindingClicked3(sh2e13, context));
    sh2e14.on('pointerdown', ()=> this.bindingClicked4(sh2e14, context));
    sh2e15.on('pointerdown', ()=> this.bindingClicked5(sh2e15, context));
  }

  // toggleCheck(context){                              // toggle for fullscreen, refreshes page upon changing choice, choice is also saved immediately
  //   var screenSettings;
  //   if(sh1e2_5.texture.key === 'no_check'){
  //     sh1e2_5.visible = false;
  //     sh1e2_5 = null;
  //     sh1e2_5 = this.add.sprite(165, 130, 'check');
  //     sh1e2_5.visible = true;
  //     screenSettings = 1;
  //     localStorage.setItem("fullscreen", screenSettings);
  //   }else{
  //     sh1e2_5.visible = false;
  //     sh1e2_5 = null;
  //     sh1e2_5 = this.add.sprite(165, 130, 'no_check');
  //     sh1e2_5.visible = true;
  //     screenSettings = 0;
  //     localStorage.setItem("fullscreen", screenSettings);
  //   }
  //   sh1e2_5.setInteractive();
  //   sh1e2_5.on('pointerdown', () => this.toggleCheck(context));
  //   location.reload();
  // }

  async bindingClicked(element, context){         // binding for pc control elements/ key config. some redundancy in having 5 different binding methods
    handler = function(e){
      getKeyPress(e, element.style, context, element.name, instructions);
    };
    if(!instructions){
      instructions = this.add.text(element.x-125, element.y, "Press any key to bind", minitextstyle);    // using mini text regardless of fullscreen
      sh2e11.active = false;                                   // turning off other key binding buttons to prevent undefined behavior
      sh2e11.input.enabled = false;
      sh2e12.active = false;
      sh2e12.input.enabled = false;
      sh2e13.active = false;
      sh2e13.input.enabled = false;
      sh2e14.active = false;
      sh2e14.input.enabled = false;
      sh2e15.active = false;
      sh2e15.input.enabled = false;
    }
     window.addEventListener('keypress', handler);              // adding global event listener for button binding
  }

  async bindingClicked2(element, context){
    handler = function(e){
      getKeyPress(e, element.style, context, element.name, instructions2);
    };
    if(!instructions2){
      instructions2 = this.add.text(element.x-125, element.y, "Press any key to bind", minitextstyle);
      sh2e11.active = false;
      sh2e11.input.enabled = false;
      sh2e12.active = false;
      sh2e12.input.enabled = false;
      sh2e13.active = false;
      sh2e13.input.enabled = false;
      sh2e14.active = false;
      sh2e14.input.enabled = false;
      sh2e15.active = false;
      sh2e15.input.enabled = false;
    }
     window.addEventListener('keypress', handler);
  }

  async bindingClicked3(element, context){
    handler = function(e){
      getKeyPress(e, element.style, context, element.name, instructions3);
    };
    if(!instructions3){
      instructions3 = this.add.text(element.x-125, element.y, "Press any key to bind", minitextstyle);
      sh2e11.active = false;
      sh2e11.input.enabled = false;
      sh2e12.active = false;
      sh2e12.input.enabled = false;
      sh2e13.active = false;
      sh2e13.input.enabled = false;
      sh2e14.active = false;
      sh2e14.input.enabled = false;
      sh2e15.active = false;
      sh2e15.input.enabled = false;
    }
     window.addEventListener('keypress', handler);
  }

  async bindingClicked4(element, context){
    handler = function(e){
      getKeyPress(e, element.style, context, element.name, instructions4);
    };
    if(!instructions4){
      instructions4 = this.add.text(element.x-125, element.y, "Press any key to bind", minitextstyle);
      sh2e11.active = false;
      sh2e11.input.enabled = false;
      sh2e12.active = false;
      sh2e12.input.enabled = false;
      sh2e13.active = false;
      sh2e13.input.enabled = false;
      sh2e14.active = false;
      sh2e14.input.enabled = false;
      sh2e15.active = false;
      sh2e15.input.enabled = false;
    }
     window.addEventListener('keypress', handler);
  }

  async bindingClicked5(element, context){
    handler = function(e){
      getKeyPress(e, element.style, context, element.name, instructions5);
    };
    if(!instructions5){
      instructions5 = this.add.text(element.x-125, element.y, "Press any key to bind", minitextstyle);
      sh2e11.active = false;
      sh2e11.input.enabled = false;
      sh2e12.active = false;
      sh2e12.input.enabled = false;
      sh2e13.active = false;
      sh2e13.input.enabled = false;
      sh2e14.active = false;
      sh2e14.input.enabled = false;
      sh2e15.active = false;
      sh2e15.input.enabled = false;
    }
     window.addEventListener('keypress', handler);
  }

}

function getKeyPress(e, fontStyle, context, k2b, oldElement){          // getting code from pressed key and converting to value phaser can recognize, then binding button with keyswitch
  var convertedKeyCode = e.keyCode - 32;
  keySwitch(convertedKeyCode, fontStyle, context, k2b);
  oldElement.visible = false;
  oldElement = null;
  window.removeEventListener('keypress', handler);
}

function mapKeycodes(fontStyle, context){                              // mapping button from codes, meant for setup
    var keys = [up, down, left, right, fire];
    var k2b;
    for(let i = 0; i < 5;i++){
      switch(i){
        case 0: k2b = "up"; break;
        case 1: k2b = "down"; break;
        case 2: k2b = "left"; break;
        case 3: k2b = "right"; break;
        case 4: k2b = "fire"; break;
      }
      if(defaultControls){
        keySwitch(keys[i].keyCode, fontStyle, context, k2b);
      }
      else{
        keySwitch(keys[i], fontStyle, context, k2b);
      }
    }
  }

function keySwitch(keycode, fontStyle, context, key2bind){         // perhaps abit rudundant, but here we are mapping out all known keycodes from phaser and assinging keys and descriptions.
  var key;                                                         // this allows for quick and easy key mapping
  var keydscr;
  switch(parseInt(keycode)){
    case 8: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE); //backspace
            keydscr = "backspace";
      break;
    case 9: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);// tab
            keydscr = "tab";
      break;
    case 13: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);// enter
             keydscr = "enter";
      break;
    case 16: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);// shift
             keydscr = "shift";
      break;
    case 17: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CNTRL);// cntrl
             keydscr = "cntrl";
      break;
    case 18: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT); // alt
             keydscr = "alt";
      break;
    case 19: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PAUSE);// pause
             keydscr = "pause";
      break;
    case 20: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CAPS_LOCK);// caps_lock
             keydscr = "caps_lock";
      break;
    case 27: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);// esc
             keydscr = "esc";
      break;
    case 32: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);// space
             keydscr = "space";
      break;
    case 33: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PAGE_UP); // page up
             keydscr = "page_up";
      break;
    case 34: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PAGE_DOWN);// page down
             keydscr = "page_down";
      break;
    case 35: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.END);// end
             keydscr = "end";
      break;
    case 36: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.HOME);// home
             keydscr = "home";
      break;
    case 37: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);// left
             keydscr = "\u2190";
      break;
    case 38: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);// up
             keydscr = "\u2191";
      break;
    case 39: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);// right
             keydscr = "\u2192";
      break;
    case 40: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);// down
             keydscr = "\u2193";
      break;
    case 42: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PRINT_SCREEN);// prnt screen
             keydscr = "prntscreen";
      break;
    case 45: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.INSERT); // insert
             keydscr = "insert";
      break;
    case 46: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DELETE);// delete
             keydscr = "delete";
      break;
    case 48: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);// 0
             keydescr = "0";
      break;
    case 49: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);// 1
             keydscr = "1";
      break;
    case 50: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);// 2
             keydscr = "2";
      break;
    case 51: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);// 3
             keydscr = "3";
      break;
    case 52: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR); // 4
             keydscr = "4";
      break;
    case 53: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);// 5
             keydscr = "5";
      break;
    case 54: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);// 6
             keydscr = "6";
      break;
    case 55: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN);// 7
             keydscr = "7";
      break;
    case 56: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT);// 8
             keydscr = "8";
      break;
    case 57: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE);// 9
             keydscr = "9";
      break;
    case 96: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO); // numpad 0
             keydscr = "numpad_0";
      break;
    case 97: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE);// numpad 1
             keydscr = "numpad_1";
      break;
    case 98:  key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO);// numpad 2
              keydscr = "numpad_2";
      break;
    case 99:  key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE);// numpad 3
              keydscr = "numpad_3";
      break;
    case 100: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR);// numpad 4
              keydscr = "numpad_4";
      break;
    case 101: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE);// numpad 5
              keydscr = "numpad_5";
      break;
    case 102: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX);// numpad 6
              keydscr = "numpad_6";
      break;
    case 103: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN);// numpad 7
              keydscr = "numpad_7";
      break;
    case 104: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT);// numpad 8
              keydscr = "numpad_8";
      break;
    case 105: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE);// numpad 9
              keydscr = "numpad_9";
      break;
    case 107: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ADD);// numpad add
              keydscr = "numpad_add";
      break;
    case 109: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SUBTRACT);// numpad subtract
              keydscr = "numpad_subtract";
      break;
    case 65: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);// A
             keydscr = "A";
      break;
    case 66: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);// B
             keydscr = "B";
      break;
    case 67: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);// C
             keydscr = "C";
      break;
    case 68: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);// D
             keydscr = "D";
      break;
    case 69: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);// E
             keydscr = "E";
      break;
    case 70: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);// F
             keydscr = "F";
      break;
    case 71: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);// G
             keydscr = "G";
      break;
    case 72: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);// H
             keydscr = "H";
      break;
    case 73: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);// I
             keydscr = "I";
      break;
    case 74: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);// J
             keydscr = "J";
      break;
    case 75: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);// K
             keydscr = "K";
      break;
    case 76: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);// L
             keydscr = "L";
      break;
    case 78: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);// N
             keydscr = "N";
      break;
    case 79: key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);// O
             keydscr = "O";
      break;
    case 80: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);// P
             keydscr = "P";
      break;
    case 81: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);// Q
             keydscr = "Q";
      break;
    case 82: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);// R
             keydscr = "R";
      break;
    case 83: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);// S
             keydscr = "S";
      break;
    case 84: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);// T
             keydscr = "T";
      break;
    case 85: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);// U
             keydscr = "U";
      break;
    case 86: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);// V
             keydscr = "V";
      break;
    case 87: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);// W
             keydscr = "W";
      break;
    case 88: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);// X
             keydscr = "X";
      break;
    case 89: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);// Y
             keydscr = "Y";
      break;
    case 90: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);// Z
             keydscr = "Z";
      break;
    case 112: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F1);// F1
              keydscr = "F1";
      break;
    case 113: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F2);// F2
              keydscr = "F2";
      break;
    case 114: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F3);// F3
              keydscr = "F3";
      break;
    case 115: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F4);// F4
              keydscr = "F4";
      break;
    case 116: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F5);// F5
              keydscr = "F5";
      break;
    case 117: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F6);// F6
              keydscr = "F6";
      break;
    case 118: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F7);// F7
              keydscr = "F7";
      break;
    case 119: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F8);// F8
              keydscr = "F8";
      break;
    case 120: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F9);// F9
              keydscr = "F9";
      break;
    case 121: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F10);// F10
              keydscr = "F10";
      break;
    case 122: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F11);// F11
              keydscr = "F11";
      break;
    case 123: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F12);// F12
              keydscr = "F12";
      break;
    case 186: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEMICOLON);// semicolon
              keydscr = ";";
      break;
    case 187: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PLUS);// plus
              keydscr = "+";
      break;
    case 188: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA);// comma
              keydscr = ",";
      break;
    case 189: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.MINUS);// minus
              keydscr = "-";
      break;
    case 190: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);// period
              keydscr = ".";
      break;
    case 191: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH);// forward slash
              keydscr = "/";
      break;
    case 220: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACK_SLASH);// backward slash
              keydscr = "\\";
      break;
    case 222: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.QUOTES);// quotes
              keydscr = '""';
      break;
    case 192: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKTICK);// backtick
              keydscr = "`";
      break;
    case 219: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.OPEN_BRACKET);// open_bracket
              keydscr = "[";
      break;
    case 221: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CLOSED_BRACKET);// closed_bracket
              keydscr = "]";
      break;
    case 59: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEMICOLON_FIREFOX);// semicolon firefox
             keydscr = ";";
      break;
    case 58: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COLON);// colon
             keydscr = ":";
      break;
    case 60: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA_FIREFOX_WINDOWS);// comma firefox windows
             keydscr = ",";
      break;
    case 62: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA_FIREFOX);// comma_firefox
             keydscr = ",";
      break;
    case 174: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BRACKET_RIGHT_FIREFOX);// bracket right firefox
              keydscr = "[";
      break;
    case 175: key = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BRACKET_LEFT_FIREFOX); // bracket left firefox
              keydscr = "]";
      break;
  }
  //if(switch1){ // binding key
    switch(key2bind){                                // binding, saving, and adjusting key as needed, key is set to be interactive again
      case "up": up = key;
                 localStorage.setItem("up",up.keyCode);
                 if(sh2e11 != undefined){
                   sh2e11.visible = false;
                   sh2e11 = null;
                 }
                 sh2e11 = context.add.text(265, 81, keydscr, fontStyle);
                 sh2e11.name = "up";
                 sh2e11.setInteractive();
                 break;
      case "down": down = key;
                   localStorage.setItem("down", down.keyCode);
                   if(sh2e12 != undefined){
                     sh2e12.visible = false;
                     sh2e12 = null;
                   }
                   sh2e12 = context.add.text(265, 120, keydscr, fontStyle);
                   sh2e12.name = "down";
                   sh2e12.setInteractive();
                   break;
      case "left": left = key;
                   localStorage.setItem("left", left.keyCode);
                   if(sh2e13 != undefined){
                     sh2e13.visible = false;
                     sh2e13 = null;
                   }

                   sh2e13 = context.add.text(262, 162, keydscr, fontStyle);
                   sh2e13.name = "left";
                   sh2e13.setInteractive();
                   break;
      case "right": right = key;
                    localStorage.setItem("right", right.keyCode);
                    if(sh2e14 != undefined){
                      sh2e14.visible = false;
                      sh2e14 = null;
                    }

                    sh2e14 = context.add.text(262, 201, keydscr, fontStyle);
                    sh2e14.name = "right";
                    sh2e14.setInteractive();
                    break;
      case "fire": fire = key;
                   localStorage.setItem("fire", fire.keyCode);
                   if(sh2e15 != undefined){
                     sh2e15.visible = false;
                     sh2e15 = null;
                   }
                   sh2e15 = context.add.text(255, 240, keydscr, fontStyle);
                   sh2e15.name = "fire";
                   sh2e15.setInteractive();
                   break;
    }
    if(sh2e11 != undefined && sh2e12 != undefined && sh2e13 != undefined && sh2e14 != undefined
    && sh2e15 != undefined){
      if(sh2e11.input != null){  // if these elements are not null, they need to be reactivated
        sh2e11.active = true;
        sh2e11.input.enabled = true;
        if(sh2e12.input != null){
          sh2e12.active = true;
          sh2e12.input.enabled = true;
        }
        if(sh2e13.input != null){
          sh2e13.active = true;
          sh2e13.input.enabled = true;
        }
        if(sh2e14.input != null){
          sh2e14.active = true;
          sh2e14.input.enabled = true;
        }
        if(sh2e15.input != null){
          sh2e15.active = true;
          sh2e15.input.enabled = true;
        }
      }
    }
}

function raise(){ // raise volume level and save
    volume+=.10;
    if(volume > 1){
      volume = 1;
    }
    localStorage.setItem("volume", volume);
    sh1e1.visible = false;
    setVol(context,volume);
    context.music.volume = volume;
  }

function lower(){ // lower volume level and save
    volume -=.10;
    if(volume < 0){
      volume = 0;
    }
    localStorage.setItem("volume", volume);
    if(incr.inputEnable = false){
      incr.setInteractive();
    }
    sh1e1.visible = false;
    setVol(context,volume);
    context.music.volume = volume;
  }


function timer(t,t2){ // timer for animation event, pick a random number between 3 and assign a predetermined time based on that
  var sec;
  var randEvent = Math.floor(Math.random() * 3);
  switch(randEvent){
    case 0: sec = 10;
      break;
    case 1: sec = 15;
      break;
    case 2: sec = 20;
      break;
  }
  var timer = setInterval(function(){   // zero is reached we call the second animation
    sec--;
    if(sec <0){
      clearInterval(timer);
      t.active = false;
      t.visible = false;
      t2.active = true;
      t2.visible = true;
      timers2(t,t2);
    }
  },1000);
}

function timers2(t,t2){ // timer for second animation event
  var sec = 24;
  var timer = setInterval(function(){
    sec--;
    if(sec <0){
      clearInterval(timer);          // reactivate first animation
      t.active = true;
      t.visible = true;
      t2.active = false;
      t2.visible = false;
    }
  },100);  // using 100 here instead of 1000 for precision, animation timing is very tight so dont touch this
}

function setVol(context,vol){ //adjusting volume elements and removing any trailing decimals
    sh1e1 = null;
    vol = vol *100;
    vol = Math.round(vol);
    vol = vol / 100;
    switch(vol){
      case 0: sh1e1 = context.add.sprite(200,160, 'Vempty');
       break;
      case .10: sh1e1 = context.add.sprite(200,160, 'V1');
       break;
      case .20: sh1e1 = context.add.sprite(200,160, 'V2');
       break;
      case .30: sh1e1 = context.add.sprite(200,160, 'V3');
       break;
      case .40: sh1e1 = context.add.sprite(200,160, 'V4');
       break;
      case .50: sh1e1 = context.add.sprite(200,160, 'V5');
       break;
      case .60: sh1e1 = context.add.sprite(200,160, 'V6');
       break;
      case .70: sh1e1 = context.add.sprite(200,160, 'V7');
       break;
      case .80: sh1e1 = context.add.sprite(200,160, 'V8');
       break;
      case .90: sh1e1 = context.add.sprite(200,160, 'V9');
       break;
      case 1.0: sh1e1 = context.add.sprite(200,160, 'V10');
       break;
      default: sh1e1 = context.add.sprite(200,160, 'V5');
       break;
    }
    sh1e1.setScale(0.8);
    sh1e1.visible = true;
  }
