/*
 * Created by sam morris on 13/01/2016.
 */

var LauncherGame = (function(){
		
	function LauncherGame(config){
		
		this.clickX = 0;
		this.clickY = 0;
		this.fireableObjects = {};
		this.fireableObjectType = '';
		this.previousClick = -1;
		this.game = {};
		this.init(config);
			
	}
		
	LauncherGame.prototype = {
			
		init: function(config){
			
			this.fireableObjectType = config.type || 'ball';
			
			// Create phaser game
			this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', 
				{
					preload: this.preload.bind(this),
					create: this.create.bind(this),
					update: this.update.bind(this),
					render: this.render.bind(this)
				}
			);
			
			this.fireableObjects = [];
			this.previousClick = -1;
				
		},
			
		preload: function(){
			this.game.load.image('ball', 'images/ball.png');
		},
			
		create: function(){
			this.game.stage.backgroundColor = '#079BB0';
			this.game.input.mouse.capture = true;
		},
			
		update: function(){
			/* Game loop */
			
			this.createFireableObjects();
			this.moveObjects();
		
		},
			
		render: function(){
			//this.game.debug.text("Left Button: " + this.game.input.mouse.button, 50, 50);
		},
		
		fireableObjectFactory: function(type){
			
			var fireableObject = {};
			
			if(type == 'ball'){
				fireableObject = new Ball({
					sprite: this.game.add.sprite(this.clickX, this.clickY, 'ball')
				});
			}
			
			return fireableObject;
			
		},
		
		createFireableObjects: function(){
			
			// Check left click is present
			// Check previousClick was a non-click to prevent 'held down click' loop
			if (this.game.input.mouse.button === 0 && this.previousClick == -1){
				
				this.clickX = this.game.input.mousePointer.x;
				this.clickY = this.game.input.mousePointer.y;
				
				var noOfObjects = this.getNoOfObjects();
				
				for(var i = 0; i < noOfObjects; i++){
					
					// Get correct fireable object type from factory, determined by parameter passed in at init
					var fireableObject = this.fireableObjectFactory(this.fireableObjectType);
					this.fireableObjects.push(fireableObject);
					
				}

			}
			
			// Need to record previous click to prevent repeating actions in game loop
			this.previousClick = this.game.input.mouse.button;
			
		},
		
		getNoOfObjects: function(){
			return Math.random() * 10;
		},
		
		moveObjects: function(){
			
			for(var i = 0, len = this.fireableObjects.length; i < len; i++){
				
				var fireableObject = this.fireableObjects[i];
				var speedChange = 0;
				
				// Check collision with bottom of browser window and increment bounce
				if(fireableObject.sprite.position.y > (window.innerHeight - fireableObject.sprite.height)){
					fireableObject.direction = 'up';
					fireableObject.speed = (fireableObject.speed/100) * 80;
				}
				
				// Objects should lose speed when they travel upward and gain speed as they fall
				if(fireableObject.direction == 'up'){
					fireableObject.speed = fireableObject.speed - 0.5;
				} else {
					fireableObject.speed = fireableObject.speed + 0.5;
				}
				
				// Find x and y co-ordinates determined by speed
				var angleX = fireableObject.speed/(90/fireableObject.angle);
				var angleY = fireableObject.speed - angleX;
				
				if(fireableObject.direction == 'up'){
					fireableObject.sprite.position.x = fireableObject.sprite.position.x + angleX;
					fireableObject.sprite.position.y = fireableObject.sprite.position.y - angleY;
				} else {
					fireableObject.sprite.position.x = fireableObject.sprite.position.x + angleX;
					fireableObject.sprite.position.y = fireableObject.sprite.position.y + angleY;
				}
				
				
				// fireableObject has low velocity so make it fall
				if(fireableObject.speed <= 3 && fireableObject.direction == 'up'){
					fireableObject.direction = 'down';
				}
				
			}
		}
			
	};
		
	LauncherGame.prototype.constructor = LauncherGame;
		
	return LauncherGame;
		
})();

var launcherGame = new LauncherGame({type:'ball'});
	
	
	
	
