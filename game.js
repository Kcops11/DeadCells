window.onload = function()
{
	var config;
	var up;
	var down;
	var left;
	var right;
	var fire;


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


	var game = new Phaser.Game(config);
}
