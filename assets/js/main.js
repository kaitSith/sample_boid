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

  var field,
      camera,
      trackball,
      renderer,
      scene,
      people_cnt = 20,
      people = [],
      place_mesh,
      wall_mesh;

  // person
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
      if(me.o.position.x >= 250 || me.o.position.x <= -250){
        me.speed.x *= -1;
      }
      if(me.o.position.y >= 500 || me.o.position.y <= -500){
        me.speed.y *= -1;
      }
      // 衝突判定
      me.touch();
    },
    touch: function(){
      var me = this;
      if(me.o.position.x >= wall_mesh.position.x - 20 && (me.o.position.y >= wall_mesh.position.y -20 && me.o.position.y <= wall_mesh.position.y + 20)){
      	me.speed.x = 0;
      	me.speed.y = 1;
      }else if(me.o.position.y >= wall_mesh.position.y -20 && (me.o.position.x >= wall_mesh.position.x -20 && me.o.position.x <= wall_mesh.position.x + 20)){
      	me.speed.x = 1;
      	me.speed.y = 0;
      }
    }
  };

  // init
  function init(){
  	// Three.js setting
  	field = document.getElementById('field');

  	// scene
  	scene = new THREE.Scene();

  	// camera
  	var width = 1100;
  	var height = 600;
  	var fov = 60;
  	var aspect = width/height;
  	var near = 1;
  	var far = 2000;
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
  	field.appendChild(renderer.domElement);

  	// light
  	var directionalLight = new THREE.DirectionalLight(0xffffff);
  	directionalLight.position.set(0, 0.7, 0.7);
  	scene.add(directionalLight);

  	// geometry

  	var place = new THREE.PlaneGeometry(500, 1000, 32);
  	var place_mat = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
  	var wall = new THREE.PlaneGeometry(20, 20, 32);
  	var wall_mat = new THREE.MeshBasicMaterial({color: 0xccccc, side: THREE.DoubleSide});
  	place_mesh = new THREE.Mesh(place, place_mat);
  	place_mesh.position.z = -10;
  	scene.add(place_mesh);
  	wall_mesh = new THREE.Mesh(wall, wall_mat);
  	wall_mesh.position.x = 100;
  	wall_mesh.position.y = 0;
  	scene.add(wall_mesh);
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
  	requestAnimationFrame(animate);
  	trackball.update();
  	for(var i = 0; i < people_cnt; i++){
  	  people[i].move();
  	}
  	renderer.render(scene, camera);
  }
})();