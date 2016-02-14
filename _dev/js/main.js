import Floor from './class/view/Floor'
import Obstacle from './class/view/Obstacle'
import Elevator from './class/view/Elevator'
import Person from './class/view/Person'

(function(){
  window.addEventListener('load', init, false);

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
      people_cnt = 300,
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

  // init
  function init(){
  	// Three.js setting
  	setGl();

  	// Three.js object
  	for(var i = 0, cnt = floor_pos.length; i < cnt; i++){
      floor[i] = new Floor({w: 1000, h: 500}, {x: 0, y: 0, z: floor_pos[i]}, scene);
  	}
  	for(var i = 0; i < elevator_cnt; i++){
      elevator[i] = new Elevator({w: 60, h: 60}, {x: 200 + i*60, y: 200, z: Math.floor(Math.random()*-1000)}, scene);
  	}
    obstacle = new Obstacle({w: 30, h: 30}, {x: 100, y: 0, z: -5}, scene);
  	for(var i = 0; i < people_cnt; i++){
  	  people[i] = new Person([0xff0000,0x00ff00,0x0000ff], {x: 0, y:0}, {x: Math.floor(Math.random()*4)-2, y: Math.floor(Math.random()*4)-2}, scene, obstacle);
  	}
    animate();
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