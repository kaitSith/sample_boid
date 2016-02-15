import Floor from './class/view/Floor'
import Obstacle from './class/view/Obstacle'
import Elevator from './class/view/Elevator'
import Person from './class/view/Person'
import Camera from './class/view/Camera'
import {Trackball} from './function/Trackball'
import {Performance} from './function/Performance'

(function(){
  window.addEventListener('load', init, false);

  var stats = Performance(0);

  var cvs,
      camera,
      width = 1100,
      height = 2000,
      trackball,
      renderer,
      scene,
      floor_pos = [-1010, -510, -10],
      floor = [],
      obstacle = [],
      elevator = [],
      elevator_cnt = 6,
      people_cnt = 100,
      people = [];

  // init
  function init(){
  	// Three.js setting
    cvs = document.getElementById('field');
    // scene
    scene = new THREE.Scene();
    // camera
    camera = new Camera({w: width, h: height}, {x: 0, y: 0, z: 2000});
    // trackball
    trackball = Trackball(camera);

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(new THREE.Color(0xffffff));
    cvs.appendChild(renderer.domElement);

    // light
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0.7, 0.7);
    scene.add(directionalLight);

  	// Three.js object
  	for(var i = 0, cnt = floor_pos.length; i < cnt; i++){
      floor[i] = new Floor({w: 1000, h: 500}, {x: 0, y: 0, z: floor_pos[i]}, scene);
  	}
  	for(var i = 0; i < elevator_cnt; i++){
      elevator[i] = new Elevator({w: 60, h: 60}, {x: 200 + i*60, y: 200, z: Math.floor(Math.random()*-1000)}, scene);
  	}
    obstacle.push(new Obstacle({w: 30, h: 30}, {x: 100, y: 0, z: -5}, scene));
  	for(var i = 0; i < people_cnt; i++){
  	  people[i] = new Person([0xff0000,0x00ff00,0x0000ff], {x: 0, y:0}, {x: 4, y: 4}, scene, obstacle);
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
  	renderer.render(scene, camera);
  	stats.end();
  }
})();