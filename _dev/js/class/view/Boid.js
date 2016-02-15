export default class Boid{
  constructor(elm){
  	this.FPS = 30;
    this.SCREEN_SIZE = 1000;
    this.NUM_BOIDS = 100;
    this.BOID_SIZE = 5;
    this.MAX_SPEED = 7;
    this.boids = [];
    this.init();
  }
  init(){
  	var me = this;
    var canvas = document.getElementById(elm);
    canvas.width = canvas.height = me.SCREEN_SIZE;
    me.ctx = canvas.getContext('2d');
    me.ctx.fillStyle = 'rgba(33, 33, 33, 0.8)';
    for(var i = 0; i < me.NUM_BOIDS; i++){
      me.boids[i] = {
        x: Math.random() * me.SCREEN_SIZE,
        y: Math.random() * me.SCREEN_SIZE,
        vx: 0,
        vy: 0
      }
    }
    setInterval(function(){me.simulate(me);}, 1000/me.FPS);
  }
  simulate(obj){
    obj.draw();
    obj.move();
  }
  draw(){
    var me = this;  	
    me.ctx.clearRect(0, 0, me.SCREEN_SIZE, me.SCREEN_SIZE);
    for(var i = 0, len = me.boids.length; i < len; i++){
      me.ctx.fillRect(me.boids[i].x - me.BOID_SIZE/2, me.boids[i].y - me.BOID_SIZE/2, me.BOID_SIZE, me.BOID_SIZE);
    }
  }
  move(){
    var me = this;
    for(var i = 0, len = me.boids.length; i < len; i++){
      me.rule1(i);
      me.rule2(i);
      me.rule3(i);
      var b = me.boids[i];
      var speed = Math.sqrt(b.vx*b.vx + b.vy*b.vy);
      if(speed >= me.MAX_SPEED){
        var r = me.MAX_SPEED / speed;
        b.vx *= r;
        b.vy *= r;
      }
      if(b.x < 0 && b.vx < 0 || b.x > me.SCREEN_SIZE && b.vx > 0) b.vx *= -1;
      if(b.y < 0 && b.vy < 0 || b.y > me.SCREEN_SIZE && b.vy > 0) b.vy *= -1;
      b.x += b.vx;
      b.y += b.vy;
    }
  }
  rule1(index){
  	var me = this;
  	var c = {x: 0, y: 0};
  	for(var i = 0, len = me.boids.length; i < len; i++){
  	  if(i != index){
      	c.x += me.boids[i].x;
      	c.y += me.boids[i].y;
  	  }
  	}
  	c.x /= me.boids.length - 1;
  	c.y /= me.boids.length - 1;
  	me.boids[index].vx += (c.x - me.boids[index].x) / 100;
  	me.boids[index].vy += (c.y - me.boids[index].y) / 100;
  }
  rule2(index){
  	var me = this;
    for(var i = 0, len = me.boids.length; i < len; i++){
      if(i != index){
        var d = me.getDistance(me.boids[i], me.boids[index]);
        if(d < 5){
          me.boids[index].vx -= me.boids[i].x - me.boids[index].x;
          me.boids[index].vy -= me.boids[i].y - me.boids[index].y;
        }
      }
    }
  }
  rule3(index){
  	var me = this;
    var pv = {x: 0, y: 0};
    for(var i = 0, len = me.boids.length; i < len; i++){
      if(i != index){
        pv.x += me.boids[i].vx;
        pv.y += me.boids[i].vy;
      }
    }
    pv.x /= me.boids.length - 1;
    pv.y /= me.boids.length - 1;
    me.boids[index].vx += (pv.x - me.boids[index].vx)/8;
    me.boids[index].vy += (pv.y - me.boids[index].vy)/8;
  }
  getDistance(b1, b2){
  	var x = b1.x - b2.x;
  	var y = b1.y - b2.y;
  	return Math.sqrt(x*x + y*y);
  }
}