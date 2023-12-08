window.onload = function()
{
	var fullscreen;
	var config;
	var up;
	var down;
	var left;
	var right;
	var fire;


	try{
		fullscreen = parseInt(localStorage.getItem("fullscreen"));
	}catch(TypeError){

	}finally{
		if(!fullscreen){
			fullscreen = 0;
		}
		// if(up== NaN || up === "null"){
		// 	up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		// }
		// if(down ==NaN || down === "null"){
		// 	down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		// }
		// if(left == NaN || left === "null"){
		// 	left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		// }
		// if(right == NaN || right === "null"){
		// 	right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		// }
		// if(fire==NaN || fire === "null" ){
		// 	fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		// }
		// localStorage.setItem("up",up);
		// localStorage.setItem("down", down);
		// localStorage.setItem("left", left);
		// localStorage.setItem("right", right);
		// localStorage.setItem("fire", fire);
	}

	if(fullscreen){
		config = {
			type: Phaser.AUTO,
			scale:{
				mode: Phaser.DOM.FIT,
				autoCenter: Phaser.DOM.CENTER_BOTH,
				width: 400,
				height: 300,
			},
			scene: [ Scene1, SceneM, Floor, SceneCharacterSelect],
			pixelArt: true,
			physics: {
				default: "arcade",
				arcade:{
					debug: false
				}
			}
		}
	}else{
		config = {
			width: 400,
			height: 300,
			scene: [ Scene1, SceneM, Floor, SceneCharacterSelect],
			pixelArt: true,
			physics: {
				default: "arcade",
				arcade:{
					debug: false
				}
			}
		}
	}



	var game = new Phaser.Game(config);
}
