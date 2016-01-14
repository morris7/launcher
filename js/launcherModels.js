/*
 * Created by sam morris on 13/01/2016.
 */

var FireableObject = (function(){
	
	function FireableObject(config){
		
		this.type = config.type;
		this.image = config.image;
		this.sprite = config.sprite;
		this.speed = config.speed;
		this.angle = config.angle;
		this.direction = config.direction;
		
	}
	
	FireableObject.prototype = {
		
		getType: function(){
			console.log('type: ' + this.type);
		},
		
		getRandomSpeed: function(){
			
			return (Math.random() * 20) + 10;
			
		},
		
		getRandomAngle: function(){
			
			return Math.random() * 45;
			
		}
		
	};
	
	FireableObject.prototype.constructor = FireableObject;

	return FireableObject;
	
})();

var Ball = (function(){
	
	function Ball(config){
		
		FireableObject.apply(this, arguments);
		this.type = 'ball';
		this.speed = this.getRandomSpeed();
		this.angle = this.getRandomAngle();
		this.direction = 'up';
		
	}
	
	Ball.prototype = Object.create(FireableObject.prototype);
	
	Ball.prototype.constructor = Ball;
	
	return Ball;
	
})();