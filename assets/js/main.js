(function(){
  window.addEventListener('load', init, false);

  // variables
  var FPS = 30;
  var SCREEN_SIZE = 1000;
  var NUM_BOIDS = 100;
  var BOID_SIZE = 5;
  var MAX_SPEED = 7;
  //var canvas = document.getElementById('world');
  //var ctx = canvas.getContext('2d');
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

  var stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms, 2: mb

  // align top-left
  stats.domElement.style.position = 'fixed';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);

  var cvs,
      camera,
      trackball,
      renderer,
      scene,
      floor_pos = [-1010, -510, -10],
      floor = [],
      obstacle,
      elevator = [],
      elevator_cnt = 6,
      people_cnt = 5,
      people = [];

  function setGl(){
  	cvs = document.getElementById('field');
  	// scene
  	scene = new THREE.Scene();
  	// camera
  	var width = 1100;
  	var height = 2000;
  	var fov = 60;
  	var aspect = width/height;
  	var near = 1;
  	var far = 10000;
  	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  	camera.position.set(0, 0, 50);

  	// trackball
  	trackball = new THREE.TrackballControls(camera);
  	trackball.noRotate = false;
  	trackball.rotateSpeed = 1.0;
  	trackball.noZoom = false;
  	trackball.zoomSpeed = 1.0;
  	trackball.noPan = false;
  	trackball.panSpeed = 1.0;
  	trackball.staticMoving = true;
  	trackball.dynamicDampingFactor = 0.3;

  	// renderer
  	renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(new THREE.Color(0xffffff));
  	cvs.appendChild(renderer.domElement);

  	// light
  	var directionalLight = new THREE.DirectionalLight(0xffffff);
  	directionalLight.position.set(0, 0.7, 0.7);
  	scene.add(directionalLight);
  }

  // field object
  function Field(size, position){
  	this.size = size;
  	this.position = position;
  	this.init();
  }
  Field.prototype = {
  	init: function(){
  	  var me = this;  		
      var geo = new THREE.PlaneGeometry(me.size.w, me.size.h, 32);
      var mat = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.5});
      var mesh = new THREE.Mesh(geo, mat);
      var edge = new THREE.EdgesHelper(mesh, 0x000000);
      me.o = mesh;
      me.o.position.set(me.position.x, me.position.y, me.position.z);
      edge.material.linewidth = 1;
  	  scene.add(mesh);
  	  scene.add(edge);
  	}
  };

  // obstacle object
  function Obstacle(size, position){
  	this.size = size;
  	this.position = position;
  	this.init();
  }
  Obstacle.prototype = {
  	init: function(){
  	  var me = this;  		
      var geo = new THREE.PlaneGeometry(me.size.w, me.size.h, 32);
      var mat = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.5});
      var mesh = new THREE.Mesh(geo, mat);
      var edge = new THREE.EdgesHelper(mesh, 0x000000);
      me.o = mesh;
      me.o.position.set(me.position.x, me.position.y, me.position.z);
      edge.material.linewidth = 1;
  	  scene.add(mesh);
  	  scene.add(edge);
  	}
  };

  // obstacle object
  function Elevator(size, position){
  	this.size = size;
  	this.floor = 0; // 0: 1f, 1: 2f, 2: 3f
  	this.v = 10;
  	this.pos = floor_pos;
  	this.position = position;
  	this.init();
  }
  Elevator.prototype = {
  	init: function(){
  	  var me = this;  		
      var geo = new THREE.BoxGeometry(me.size.w, me.size.h, 32);
      var mat = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.5});
      var mesh = new THREE.Mesh(geo, mat);
      var edge = new THREE.EdgesHelper(mesh, 0x000000);
      me.o = mesh;
      me.o.position.set(me.position.x, me.position.y, me.position.z);
      edge.material.linewidth = 1;
  	  scene.add(mesh);
  	  scene.add(edge);
  	},
  	move: function(){
  	  var me = this;
  	  me.o.position.z += me.v;
  	  // state
  	  if(me.o.position.z <= me.pos[0]){
  	  	me.floor = 0;
  	  }else if(me.o.position.z >= me.pos[1] && me.o.position.z < me.pos[2]){
  	  	me.floor = 1;
  	  }else{
        me.floor = 2;
  	  }

      if(me.o.position.z >= me.pos[2] + 20 || me.o.position.z <= me.pos[0]){
      	me.v *= -1;
      }
  	}
  };

  // person object
  function Person(color, position, speed){
  	this.color = color[Math.floor(Math.random() * color.length)];
  	this.position = position;
  	this.speed = speed;
  	this.init();
  }
  Person.prototype = {
  	init: function(){
  	  var me = this;
  	  var geo = new THREE.SphereGeometry(5, 32, 32);
  	  var mat = new THREE.MeshBasicMaterial({color: me.color, side: THREE.DoubleSide});
      var mesh = new THREE.Mesh(geo, mat);
      me.o = mesh;
      scene.add(mesh);
  	},
    move: function(){
      var me = this;
      me.o.position.x += me.speed.x;
      me.o.position.y += me.speed.y;
      if(me.o.position.x >= 500 || me.o.position.x <= -500){
        me.speed.x *= -1;
      }
      if(me.o.position.y >= 250 || me.o.position.y <= -250){
        me.speed.y *= -1;
      }
      // 衝突判定
      me.touch();
    },
    touch: function(){
      var me = this;
      if(me.o.position.x >= obstacle.o.position.x - 20 && (me.o.position.y >= obstacle.o.position.y -20 && me.o.position.y <= obstacle.o.position.y + 20)){
      	me.speed.x = 0;
      	me.speed.y = 1;
      }else if(me.o.position.y >= obstacle.o.position.y -20 && (me.o.position.x >= obstacle.o.position.x -20 && me.o.position.x <= obstacle.o.position.x + 20)){
      	me.speed.x = 1;
      	me.speed.y = 0;
      }
    }
  };

  // init
  function init(){
  	stats.begin();
  	// Three.js setting
  	setGl();

  	// Three.js object

  	for(var i = 0, cnt = floor_pos.length; i < cnt; i++){
      floor[i] = new Field({w: 1000, h: 500}, {x: 0, y: 0, z: floor_pos[i]});
  	}
  	for(var i = 0; i < elevator_cnt; i++){
      elevator[i] = new Elevator({w: 60, h: 60}, {x: 200 + i*60, y: 200, z: Math.floor(Math.random()*-1000)});
  	}
    obstacle = new Obstacle({w: 30, h: 30}, {x: 100, y: 0, z: -5});
  	for(var i = 0; i < people_cnt; i++){
  	  people[i] = new Person([0xff0000,0x00ff00,0x0000ff], {x: 0, y:0}, {x: Math.floor(Math.random()*4)-2, y: Math.floor(Math.random()*4)-2});
  	}
    animate();

  	/*
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
  	*/
  }

  function animate(){
    stats.begin();
  	requestAnimationFrame(animate);
  	trackball.update();
  	for(var i = 0; i < people_cnt; i++){
  	  people[i].move();
  	}
  	for(var i = 0; i < elevator_cnt; i++){
      elevator[i].move();
    }
  	console.log(camera.position.x + ':' + camera.position.y + ':' + camera.position.z);
  	renderer.render(scene, camera);
  	stats.end();
  }
})();