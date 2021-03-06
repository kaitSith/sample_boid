(function(){
  window.addEventListener('load', init, false);

  // variables
  var FPS = 30;
  var SCREEN_SIZE = 1000;
  var NUM_BOIDS = 100;
  var BOID_SIZE = 5;
  var MAX_SPEED = 7;
  var canvas = document.getElementById('world');
  var ctx = canvas.getContext('2d');
  var boids = [];


  // simulate
  var simulate = function(){
  	draw();
  	move();
  };

  // draw
  var draw = function(){
  	ctx.clearRect(0, 0, SCREEN_SIZE, SCREEN_SIZE);
  	for(var i = 0, len = boids.length; i < len; i++){
  	  ctx.fillRect(boids[i].x - BOID_SIZE/2, boids[i].y - BOID_SIZE/2, BOID_SIZE, BOID_SIZE);
  	}
  };
  // move
  var move = function(){
  	for(var i = 0, len = boids.length; i < len; i++){
  	  rule1(i);
  	  rule2(i);
  	  rule3(i);
  	  var b = boids[i];
  	  var speed = Math.sqrt(b.vx*b.vx + b.vy*b.vy);
  	  if(speed >= MAX_SPEED){
  	  	var r = MAX_SPEED / speed;
  	  	b.vx *= r;
  	  	b.vy *= r;
  	  }
      if(b.x < 0 && b.vx < 0 || b.x > SCREEN_SIZE && b.vx > 0) b.vx *= -1;
      if(b.y < 0 && b.vy < 0 || b.y > SCREEN_SIZE && b.vy > 0) b.vy *= -1;
      b.x += b.vx;
      b.y += b.vy;
  	}
  };
  // rule1
  var rule1 = function(index){
  	var c = {x: 0, y: 0};
  	for(var i = 0, len = boids.length; i < len; i++){
  	  if(i != index){
      	c.x += boids[i].x;
      	c.y += boids[i].y;
  	  }
  	}
  	c.x /= boids.length - 1;
  	c.y /= boids.length - 1;
  	boids[index].vx += (c.x - boids[index].x) / 100;
  	boids[index].vy += (c.y - boids[index].y) / 100;
  };
  // rule2
  var rule2 = function(index){
  	for(var i = 0, len = boids.length; i < len; i++){
  	  if(i != index){
  	  	var d = getDistance(boids[i], boids[index]);
  	  	if(d < 5){
  	  	  boids[index].vx -= boids[i].x - boids[index].x;
  	  	  boids[index].vy -= boids[i].y - boids[index].y;
  	  	}
  	  }
  	}
  };
  // rule3
  var rule3 = function(index){
  	var pv = {x: 0, y: 0};
  	for(var i = 0, len = boids.length; i < len; i++){
  	  if(i != index){
  	  	pv.x += boids[i].vx;
  	  	pv.y += boids[i].vy;
  	  }
  	}
  	pv.x /= boids.length - 1;
  	pv.y /= boids.length - 1;
  	boids[index].vx += (pv.x - boids[index].vx)/8;
  	boids[index].vy += (pv.y - boids[index].vy)/8;
  };

  // get distance
  var getDistance = function(b1, b2){
  	var x = b1.x - b2.x;
  	var y = b1.y - b2.y;
  	return Math.sqrt(x*x + y*y);
  };

  // init
  function init(){
  	canvas.width = canvas.height = SCREEN_SIZE;
  	ctx.fillStyle = 'rgba(33, 33, 33, 0.8)';
  	for(var i = 0; i < NUM_BOIDS; i++){
  	  boids[i] = {
  	  	x: Math.random() * SCREEN_SIZE,
  	  	y: Math.random() * SCREEN_SIZE,
  	  	vx: 0,
  	  	vy: 0
  	  }
  	}
  	setInterval(simulate, 1000/FPS);
  }
})();