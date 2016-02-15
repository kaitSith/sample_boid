(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function Camera(size, position) {
  _classCallCheck(this, Camera);

  this.size = size;
  this.position = position;
  var fov = 60;
  var aspect = this.size.w / this.size.h;
  var near = 1;
  var far = 10000;
  var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(this.position.x, this.position.y, this.position.z);
  return camera;
};

exports.default = Camera;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Elevator = function () {
  function Elevator(size, position, scene) {
    _classCallCheck(this, Elevator);

    this.size = size;
    this.position = position;
    this.pos = [-1010, -510, -10];
    this.floor = 0; // 0: 1f, 1: 2f, 2: 3f
    this.v = 10;
    this.scene = scene;
    this.init();
  }

  _createClass(Elevator, [{
    key: "init",
    value: function init() {
      var me = this;
      var geo = new THREE.BoxGeometry(me.size.w, me.size.h, 32);
      var mat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
      var mesh = new THREE.Mesh(geo, mat);
      var edge = new THREE.EdgesHelper(mesh, 0x000000);
      me.o = mesh;
      me.o.position.set(me.position.x, me.position.y, me.position.z);
      edge.material.linewidth = 1;
      me.scene.add(mesh);
      me.scene.add(edge);
    }
  }, {
    key: "move",
    value: function move() {
      var me = this;
      me.o.position.z += me.v;
      // state
      if (me.o.position.z <= me.pos[0]) {
        me.floor = 0;
      } else if (me.o.position.z >= me.pos[1] && me.o.position.z < me.pos[2]) {
        me.floor = 1;
      } else {
        me.floor = 2;
      }
      if (me.o.position.z >= me.pos[2] + 20 || me.o.position.z <= me.pos[0]) {
        me.v *= -1;
      }
    }
  }]);

  return Elevator;
}();

exports.default = Elevator;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Floor = function () {
  function Floor(size, position, scene) {
    _classCallCheck(this, Floor);

    this.size = size;
    this.position = position;
    this.scene = scene;
    this.init();
  }

  _createClass(Floor, [{
    key: "init",
    value: function init() {
      var me = this;
      var geo = new THREE.PlaneGeometry(me.size.w, me.size.h, 32);
      var mat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
      var mesh = new THREE.Mesh(geo, mat);
      var edge = new THREE.EdgesHelper(mesh, 0x000000);
      me.o = mesh;
      me.o.position.set(me.position.x, me.position.y, me.position.z);
      edge.material.linewidth = 1;
      me.scene.add(mesh);
      me.scene.add(edge);
    }
  }]);

  return Floor;
}();

exports.default = Floor;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Obstacle = function () {
  function Obstacle(size, position, scene) {
    _classCallCheck(this, Obstacle);

    this.size = size;
    this.position = position;
    this.scene = scene;
    this.init();
  }

  _createClass(Obstacle, [{
    key: "init",
    value: function init() {
      var me = this;
      var geo = new THREE.PlaneGeometry(me.size.w, me.size.h, 32);
      var mat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
      var mesh = new THREE.Mesh(geo, mat);
      var edge = new THREE.EdgesHelper(mesh, 0x000000);
      me.o = mesh;
      me.o.position.set(me.position.x, me.position.y, me.position.z);
      edge.material.linewidth = 1;
      me.scene.add(mesh);
      me.scene.add(edge);
    }
  }]);

  return Obstacle;
}();

exports.default = Obstacle;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function () {
  function Person(color, position, speed, scene, obstacle) {
    _classCallCheck(this, Person);

    this.color = color[Math.floor(Math.random() * color.length)];
    this.position = position;
    this.speed = speed;
    this.scene = scene;
    this.obstacle = obstacle;
    this.init();
  }

  _createClass(Person, [{
    key: "init",
    value: function init() {
      var me = this;
      var geo = new THREE.SphereGeometry(5, 32, 32);
      var mat = new THREE.MeshBasicMaterial({ color: me.color, side: THREE.DoubleSide });
      var mesh = new THREE.Mesh(geo, mat);
      me.o = mesh;
      me.scene.add(mesh);
    }
  }, {
    key: "move",
    value: function move() {
      var me = this;
      // ランダムウォーク
      var type = Math.floor(Math.random() * 8);
      if (type === 0 || type === 3 || type === 6) {
        me.o.position.x -= me.speed.x * me.touchWall();
      }
      if (type === 2 || type === 5 || type === 8) {
        me.o.position.x += me.speed.x * me.touchWall();
      }
      if (type === 0 || type === 1 || type === 2) {
        me.o.position.y += me.speed.y * me.touchWall();
      }
      if (type === 6 || type === 7 || type === 8) {
        me.o.position.y -= me.speed.y * me.touchWall();
      }
      // 衝突判定
      me.touch();
    }
  }, {
    key: "touchWall",
    value: function touchWall() {
      var me = this;
      var x = me.o.position.x;
      var y = me.o.position.y;
      var vx = me.speed.x;
      var vy = me.speed.y;
      var dir = 1;
      if (x + vx >= 500 || x - vx <= -500) {
        dir *= -1;
      }
      if (y + vy >= 250 || y - vy <= -250) {
        dir *= -1;
      }
      return dir;
    }
  }, {
    key: "touch",
    value: function touch() {
      var me = this;
      //
      for (var i = 0, cnt = me.obstacle.length; i < cnt; i++) {
        if (me.o.position.x >= me.obstacle[i].o.position.x - 20 && me.o.position.y >= me.obstacle[i].o.position.y - 20 && me.o.position.y <= me.obstacle[i].o.position.y + 20) {
          me.speed.x = 0;
          me.speed.y = 1;
        } else if (me.o.position.y >= me.obstacle[i].o.position.y - 20 && me.o.position.x >= me.obstacle[i].o.position.x - 20 && me.o.position.x <= me.obstacle[i].o.position.x + 20) {
          me.speed.x = 1;
          me.speed.y = 0;
        }
      }
    }
  }]);

  return Person;
}();

exports.default = Person;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Performance = Performance;
function Performance(type) {
  var stats = new Stats();
  stats.setMode(type); // 0: fps, 1: ms, 2: mb
  // align top-left
  stats.domElement.style.position = 'fixed';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);

  return stats;
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Trackball = Trackball;
function Trackball(camera) {
  var trackball = new THREE.TrackballControls(camera);
  trackball.noRotate = false;
  trackball.rotateSpeed = 1.0;
  trackball.noZoom = false;
  trackball.zoomSpeed = 1.0;
  trackball.noPan = false;
  trackball.panSpeed = 1.0;
  trackball.staticMoving = true;
  trackball.dynamicDampingFactor = 0.3;
  return trackball;
}

},{}],8:[function(require,module,exports){
'use strict';

var _Floor = require('./class/view/Floor');

var _Floor2 = _interopRequireDefault(_Floor);

var _Obstacle = require('./class/view/Obstacle');

var _Obstacle2 = _interopRequireDefault(_Obstacle);

var _Elevator = require('./class/view/Elevator');

var _Elevator2 = _interopRequireDefault(_Elevator);

var _Person = require('./class/view/Person');

var _Person2 = _interopRequireDefault(_Person);

var _Camera = require('./class/view/Camera');

var _Camera2 = _interopRequireDefault(_Camera);

var _Trackball = require('./function/Trackball');

var _Performance = require('./function/Performance');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  window.addEventListener('load', init, false);

  var stats = (0, _Performance.Performance)(0);

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
  function init() {
    // Three.js setting
    cvs = document.getElementById('field');
    // scene
    scene = new THREE.Scene();
    // camera
    camera = new _Camera2.default({ w: width, h: height }, { x: 0, y: 0, z: 2000 });
    // trackball
    trackball = (0, _Trackball.Trackball)(camera);

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
    for (var i = 0, cnt = floor_pos.length; i < cnt; i++) {
      floor[i] = new _Floor2.default({ w: 1000, h: 500 }, { x: 0, y: 0, z: floor_pos[i] }, scene);
    }
    for (var i = 0; i < elevator_cnt; i++) {
      elevator[i] = new _Elevator2.default({ w: 60, h: 60 }, { x: 200 + i * 60, y: 200, z: Math.floor(Math.random() * -1000) }, scene);
    }
    obstacle.push(new _Obstacle2.default({ w: 30, h: 30 }, { x: 100, y: 0, z: -5 }, scene));
    for (var i = 0; i < people_cnt; i++) {
      people[i] = new _Person2.default([0xff0000, 0x00ff00, 0x0000ff], { x: 0, y: 0 }, { x: 4, y: 4 }, scene, obstacle);
    }
    animate();
  }

  function animate() {
    stats.begin();
    requestAnimationFrame(animate);
    trackball.update();
    for (var i = 0; i < people_cnt; i++) {
      people[i].move();
    }
    for (var i = 0; i < elevator_cnt; i++) {
      elevator[i].move();
    }
    renderer.render(scene, camera);
    stats.end();
  }
})();

},{"./class/view/Camera":1,"./class/view/Elevator":2,"./class/view/Floor":3,"./class/view/Obstacle":4,"./class/view/Person":5,"./function/Performance":6,"./function/Trackball":7}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9jbGFzcy92aWV3L0NhbWVyYS5qcyIsImpzL2NsYXNzL3ZpZXcvRWxldmF0b3IuanMiLCJqcy9jbGFzcy92aWV3L0Zsb29yLmpzIiwianMvY2xhc3Mvdmlldy9PYnN0YWNsZS5qcyIsImpzL2NsYXNzL3ZpZXcvUGVyc29uLmpzIiwianMvZnVuY3Rpb24vUGVyZm9ybWFuY2UuanMiLCJqcy9mdW5jdGlvbi9UcmFja2JhbGwuanMiLCJqcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7SUNBcUIsU0FDbkIsU0FEbUIsTUFDbkIsQ0FBWSxJQUFaLEVBQWtCLFFBQWxCLEVBQTJCO3dCQURSLFFBQ1E7O0FBQ3pCLE9BQUssSUFBTCxHQUFZLElBQVosQ0FEeUI7QUFFekIsT0FBSyxRQUFMLEdBQWdCLFFBQWhCLENBRnlCO0FBR3pCLE1BQUksTUFBTSxFQUFOLENBSHFCO0FBSXpCLE1BQUksU0FBUyxLQUFLLElBQUwsQ0FBVSxDQUFWLEdBQVksS0FBSyxJQUFMLENBQVUsQ0FBVixDQUpBO0FBS3pCLE1BQUksT0FBTyxDQUFQLENBTHFCO0FBTXpCLE1BQUksTUFBTSxLQUFOLENBTnFCO0FBT3pCLE1BQUksU0FBUyxJQUFJLE1BQU0saUJBQU4sQ0FBd0IsR0FBNUIsRUFBaUMsTUFBakMsRUFBeUMsSUFBekMsRUFBK0MsR0FBL0MsQ0FBVCxDQVBxQjtBQVF6QixTQUFPLFFBQVAsQ0FBZ0IsR0FBaEIsQ0FBb0IsS0FBSyxRQUFMLENBQWMsQ0FBZCxFQUFpQixLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBdEQsQ0FSeUI7QUFTekIsU0FBTyxNQUFQLENBVHlCO0NBQTNCOztrQkFEbUI7Ozs7Ozs7Ozs7Ozs7SUNBQTtBQUNuQixXQURtQixRQUNuQixDQUFZLElBQVosRUFBa0IsUUFBbEIsRUFBNEIsS0FBNUIsRUFBa0M7MEJBRGYsVUFDZTs7QUFDaEMsU0FBSyxJQUFMLEdBQVksSUFBWixDQURnQztBQUVoQyxTQUFLLFFBQUwsR0FBZ0IsUUFBaEIsQ0FGZ0M7QUFHaEMsU0FBSyxHQUFMLEdBQVcsQ0FBQyxDQUFDLElBQUQsRUFBTyxDQUFDLEdBQUQsRUFBTSxDQUFDLEVBQUQsQ0FBekIsQ0FIZ0M7QUFJaEMsU0FBSyxLQUFMLEdBQWEsQ0FBYjtBQUpnQyxRQUtoQyxDQUFLLENBQUwsR0FBUyxFQUFULENBTGdDO0FBTWhDLFNBQUssS0FBTCxHQUFhLEtBQWIsQ0FOZ0M7QUFPaEMsU0FBSyxJQUFMLEdBUGdDO0dBQWxDOztlQURtQjs7MkJBVWI7QUFDSixVQUFJLEtBQUssSUFBTCxDQURBO0FBRUosVUFBSSxNQUFNLElBQUksTUFBTSxXQUFOLENBQWtCLEdBQUcsSUFBSCxDQUFRLENBQVIsRUFBVyxHQUFHLElBQUgsQ0FBUSxDQUFSLEVBQVcsRUFBNUMsQ0FBTixDQUZBO0FBR0osVUFBSSxNQUFNLElBQUksTUFBTSxpQkFBTixDQUF3QixFQUFDLE9BQU8sUUFBUCxFQUFpQixNQUFNLE1BQU0sVUFBTixFQUFrQixhQUFhLElBQWIsRUFBcUIsU0FBVyxHQUFYLEVBQTNGLENBQU4sQ0FIQTtBQUlKLFVBQUksT0FBTyxJQUFJLE1BQU0sSUFBTixDQUFXLEdBQWYsRUFBb0IsR0FBcEIsQ0FBUCxDQUpBO0FBS0osVUFBSSxPQUFPLElBQUksTUFBTSxXQUFOLENBQWtCLElBQXRCLEVBQTRCLFFBQTVCLENBQVAsQ0FMQTtBQU1KLFNBQUcsQ0FBSCxHQUFPLElBQVAsQ0FOSTtBQU9KLFNBQUcsQ0FBSCxDQUFLLFFBQUwsQ0FBYyxHQUFkLENBQWtCLEdBQUcsUUFBSCxDQUFZLENBQVosRUFBZSxHQUFHLFFBQUgsQ0FBWSxDQUFaLEVBQWUsR0FBRyxRQUFILENBQVksQ0FBWixDQUFoRCxDQVBJO0FBUUosV0FBSyxRQUFMLENBQWMsU0FBZCxHQUEwQixDQUExQixDQVJJO0FBU0osU0FBRyxLQUFILENBQVMsR0FBVCxDQUFhLElBQWIsRUFUSTtBQVVKLFNBQUcsS0FBSCxDQUFTLEdBQVQsQ0FBYSxJQUFiLEVBVkk7Ozs7MkJBWUE7QUFDSixVQUFJLEtBQUssSUFBTCxDQURBO0FBRUosU0FBRyxDQUFILENBQUssUUFBTCxDQUFjLENBQWQsSUFBbUIsR0FBRyxDQUFIOztBQUZmLFVBSUQsR0FBRyxDQUFILENBQUssUUFBTCxDQUFjLENBQWQsSUFBbUIsR0FBRyxHQUFILENBQU8sQ0FBUCxDQUFuQixFQUE2QjtBQUM5QixXQUFHLEtBQUgsR0FBVyxDQUFYLENBRDhCO09BQWhDLE1BRU0sSUFBRyxHQUFHLENBQUgsQ0FBSyxRQUFMLENBQWMsQ0FBZCxJQUFtQixHQUFHLEdBQUgsQ0FBTyxDQUFQLENBQW5CLElBQWdDLEdBQUcsQ0FBSCxDQUFLLFFBQUwsQ0FBYyxDQUFkLEdBQWtCLEdBQUcsR0FBSCxDQUFPLENBQVAsQ0FBbEIsRUFBNEI7QUFDbkUsV0FBRyxLQUFILEdBQVcsQ0FBWCxDQURtRTtPQUEvRCxNQUVEO0FBQ0gsV0FBRyxLQUFILEdBQVcsQ0FBWCxDQURHO09BRkM7QUFLTixVQUFHLEdBQUcsQ0FBSCxDQUFLLFFBQUwsQ0FBYyxDQUFkLElBQW1CLEdBQUcsR0FBSCxDQUFPLENBQVAsSUFBWSxFQUFaLElBQWtCLEdBQUcsQ0FBSCxDQUFLLFFBQUwsQ0FBYyxDQUFkLElBQW1CLEdBQUcsR0FBSCxDQUFPLENBQVAsQ0FBbkIsRUFBNkI7QUFDbkUsV0FBRyxDQUFILElBQVEsQ0FBQyxDQUFELENBRDJEO09BQXJFOzs7O1NBakNpQjs7Ozs7Ozs7Ozs7Ozs7OztJQ0FBO0FBQ25CLFdBRG1CLEtBQ25CLENBQVksSUFBWixFQUFrQixRQUFsQixFQUE0QixLQUE1QixFQUFrQzswQkFEZixPQUNlOztBQUNoQyxTQUFLLElBQUwsR0FBWSxJQUFaLENBRGdDO0FBRWhDLFNBQUssUUFBTCxHQUFnQixRQUFoQixDQUZnQztBQUdoQyxTQUFLLEtBQUwsR0FBYSxLQUFiLENBSGdDO0FBSWhDLFNBQUssSUFBTCxHQUpnQztHQUFsQzs7ZUFEbUI7OzJCQU9iO0FBQ0osVUFBSSxLQUFLLElBQUwsQ0FEQTtBQUVKLFVBQUksTUFBTSxJQUFJLE1BQU0sYUFBTixDQUFvQixHQUFHLElBQUgsQ0FBUSxDQUFSLEVBQVcsR0FBRyxJQUFILENBQVEsQ0FBUixFQUFXLEVBQTlDLENBQU4sQ0FGQTtBQUdKLFVBQUksTUFBTSxJQUFJLE1BQU0saUJBQU4sQ0FBd0IsRUFBQyxPQUFPLFFBQVAsRUFBaUIsTUFBTSxNQUFNLFVBQU4sRUFBa0IsYUFBYSxJQUFiLEVBQXFCLFNBQVcsR0FBWCxFQUEzRixDQUFOLENBSEE7QUFJSixVQUFJLE9BQU8sSUFBSSxNQUFNLElBQU4sQ0FBVyxHQUFmLEVBQW9CLEdBQXBCLENBQVAsQ0FKQTtBQUtKLFVBQUksT0FBTyxJQUFJLE1BQU0sV0FBTixDQUFrQixJQUF0QixFQUE0QixRQUE1QixDQUFQLENBTEE7QUFNSixTQUFHLENBQUgsR0FBTyxJQUFQLENBTkk7QUFPSixTQUFHLENBQUgsQ0FBSyxRQUFMLENBQWMsR0FBZCxDQUFrQixHQUFHLFFBQUgsQ0FBWSxDQUFaLEVBQWUsR0FBRyxRQUFILENBQVksQ0FBWixFQUFlLEdBQUcsUUFBSCxDQUFZLENBQVosQ0FBaEQsQ0FQSTtBQVFKLFdBQUssUUFBTCxDQUFjLFNBQWQsR0FBMEIsQ0FBMUIsQ0FSSTtBQVNKLFNBQUcsS0FBSCxDQUFTLEdBQVQsQ0FBYSxJQUFiLEVBVEk7QUFVSixTQUFHLEtBQUgsQ0FBUyxHQUFULENBQWEsSUFBYixFQVZJOzs7O1NBUGE7Ozs7Ozs7Ozs7Ozs7Ozs7SUNBQTtBQUNuQixXQURtQixRQUNuQixDQUFZLElBQVosRUFBa0IsUUFBbEIsRUFBNEIsS0FBNUIsRUFBa0M7MEJBRGYsVUFDZTs7QUFDaEMsU0FBSyxJQUFMLEdBQVksSUFBWixDQURnQztBQUVoQyxTQUFLLFFBQUwsR0FBZ0IsUUFBaEIsQ0FGZ0M7QUFHaEMsU0FBSyxLQUFMLEdBQWEsS0FBYixDQUhnQztBQUloQyxTQUFLLElBQUwsR0FKZ0M7R0FBbEM7O2VBRG1COzsyQkFPYjtBQUNKLFVBQUksS0FBSyxJQUFMLENBREE7QUFFSixVQUFJLE1BQU0sSUFBSSxNQUFNLGFBQU4sQ0FBb0IsR0FBRyxJQUFILENBQVEsQ0FBUixFQUFXLEdBQUcsSUFBSCxDQUFRLENBQVIsRUFBVyxFQUE5QyxDQUFOLENBRkE7QUFHSixVQUFJLE1BQU0sSUFBSSxNQUFNLGlCQUFOLENBQXdCLEVBQUMsT0FBTyxRQUFQLEVBQWlCLE1BQU0sTUFBTSxVQUFOLEVBQWtCLGFBQWEsSUFBYixFQUFxQixTQUFXLEdBQVgsRUFBM0YsQ0FBTixDQUhBO0FBSUosVUFBSSxPQUFPLElBQUksTUFBTSxJQUFOLENBQVcsR0FBZixFQUFvQixHQUFwQixDQUFQLENBSkE7QUFLSixVQUFJLE9BQU8sSUFBSSxNQUFNLFdBQU4sQ0FBa0IsSUFBdEIsRUFBNEIsUUFBNUIsQ0FBUCxDQUxBO0FBTUosU0FBRyxDQUFILEdBQU8sSUFBUCxDQU5JO0FBT0osU0FBRyxDQUFILENBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0IsR0FBRyxRQUFILENBQVksQ0FBWixFQUFlLEdBQUcsUUFBSCxDQUFZLENBQVosRUFBZSxHQUFHLFFBQUgsQ0FBWSxDQUFaLENBQWhELENBUEk7QUFRSixXQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQTBCLENBQTFCLENBUkk7QUFTSixTQUFHLEtBQUgsQ0FBUyxHQUFULENBQWEsSUFBYixFQVRJO0FBVUosU0FBRyxLQUFILENBQVMsR0FBVCxDQUFhLElBQWIsRUFWSTs7OztTQVBhOzs7Ozs7Ozs7Ozs7Ozs7O0lDQUE7QUFDbkIsV0FEbUIsTUFDbkIsQ0FBWSxLQUFaLEVBQW1CLFFBQW5CLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLFFBQTNDLEVBQW9EOzBCQURqQyxRQUNpQzs7QUFDbEQsU0FBSyxLQUFMLEdBQWEsTUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsTUFBTSxNQUFOLENBQWpDLENBQWIsQ0FEa0Q7QUFFbEQsU0FBSyxRQUFMLEdBQWdCLFFBQWhCLENBRmtEO0FBR2xELFNBQUssS0FBTCxHQUFhLEtBQWIsQ0FIa0Q7QUFJbEQsU0FBSyxLQUFMLEdBQWEsS0FBYixDQUprRDtBQUtsRCxTQUFLLFFBQUwsR0FBZ0IsUUFBaEIsQ0FMa0Q7QUFNbEQsU0FBSyxJQUFMLEdBTmtEO0dBQXBEOztlQURtQjs7MkJBU2I7QUFDSixVQUFJLEtBQUssSUFBTCxDQURBO0FBRUosVUFBSSxNQUFNLElBQUksTUFBTSxjQUFOLENBQXFCLENBQXpCLEVBQTRCLEVBQTVCLEVBQWdDLEVBQWhDLENBQU4sQ0FGQTtBQUdKLFVBQUksTUFBTSxJQUFJLE1BQU0saUJBQU4sQ0FBd0IsRUFBQyxPQUFPLEdBQUcsS0FBSCxFQUFVLE1BQU0sTUFBTSxVQUFOLEVBQXBELENBQU4sQ0FIQTtBQUlKLFVBQUksT0FBTyxJQUFJLE1BQU0sSUFBTixDQUFXLEdBQWYsRUFBb0IsR0FBcEIsQ0FBUCxDQUpBO0FBS0osU0FBRyxDQUFILEdBQU8sSUFBUCxDQUxJO0FBTUosU0FBRyxLQUFILENBQVMsR0FBVCxDQUFhLElBQWIsRUFOSTs7OzsyQkFRQTtBQUNKLFVBQUksS0FBSyxJQUFMOztBQURBLFVBR0EsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBYyxDQUFkLENBQWxCLENBSEE7QUFJSixVQUFHLFNBQVMsQ0FBVCxJQUFjLFNBQVMsQ0FBVCxJQUFjLFNBQVMsQ0FBVCxFQUFXO0FBQ3hDLFdBQUcsQ0FBSCxDQUFLLFFBQUwsQ0FBYyxDQUFkLElBQW1CLEdBQUcsS0FBSCxDQUFTLENBQVQsR0FBYSxHQUFHLFNBQUgsRUFBYixDQURxQjtPQUExQztBQUdBLFVBQUcsU0FBUyxDQUFULElBQWMsU0FBUyxDQUFULElBQWMsU0FBUyxDQUFULEVBQVc7QUFDeEMsV0FBRyxDQUFILENBQUssUUFBTCxDQUFjLENBQWQsSUFBbUIsR0FBRyxLQUFILENBQVMsQ0FBVCxHQUFhLEdBQUcsU0FBSCxFQUFiLENBRHFCO09BQTFDO0FBR0EsVUFBRyxTQUFTLENBQVQsSUFBYyxTQUFTLENBQVQsSUFBYyxTQUFTLENBQVQsRUFBVztBQUN4QyxXQUFHLENBQUgsQ0FBSyxRQUFMLENBQWMsQ0FBZCxJQUFtQixHQUFHLEtBQUgsQ0FBUyxDQUFULEdBQWEsR0FBRyxTQUFILEVBQWIsQ0FEcUI7T0FBMUM7QUFHQSxVQUFHLFNBQVMsQ0FBVCxJQUFjLFNBQVMsQ0FBVCxJQUFjLFNBQVMsQ0FBVCxFQUFXO0FBQ3hDLFdBQUcsQ0FBSCxDQUFLLFFBQUwsQ0FBYyxDQUFkLElBQW1CLEdBQUcsS0FBSCxDQUFTLENBQVQsR0FBYSxHQUFHLFNBQUgsRUFBYixDQURxQjtPQUExQzs7QUFiSSxRQWlCSixDQUFHLEtBQUgsR0FqQkk7Ozs7Z0NBbUJLO0FBQ1QsVUFBSSxLQUFLLElBQUwsQ0FESztBQUVULFVBQUksSUFBSSxHQUFHLENBQUgsQ0FBSyxRQUFMLENBQWMsQ0FBZCxDQUZDO0FBR1QsVUFBSSxJQUFJLEdBQUcsQ0FBSCxDQUFLLFFBQUwsQ0FBYyxDQUFkLENBSEM7QUFJVCxVQUFJLEtBQUssR0FBRyxLQUFILENBQVMsQ0FBVCxDQUpBO0FBS1QsVUFBSSxLQUFLLEdBQUcsS0FBSCxDQUFTLENBQVQsQ0FMQTtBQU1ULFVBQUksTUFBTSxDQUFOLENBTks7QUFPVCxVQUFHLENBQUMsR0FBSSxFQUFKLElBQVcsR0FBWixJQUFtQixDQUFDLEdBQUksRUFBSixJQUFXLENBQUMsR0FBRCxFQUFLO0FBQ3JDLGVBQU8sQ0FBQyxDQUFELENBRDhCO09BQXZDO0FBR0EsVUFBRyxDQUFDLEdBQUksRUFBSixJQUFXLEdBQVosSUFBbUIsQ0FBQyxHQUFJLEVBQUosSUFBVyxDQUFDLEdBQUQsRUFBSztBQUNyQyxlQUFPLENBQUMsQ0FBRCxDQUQ4QjtPQUF2QztBQUdBLGFBQU8sR0FBUCxDQWJTOzs7OzRCQWVKO0FBQ0wsVUFBSSxLQUFLLElBQUw7O0FBREMsV0FHRCxJQUFJLElBQUksQ0FBSixFQUFPLE1BQU0sR0FBRyxRQUFILENBQVksTUFBWixFQUFvQixJQUFJLEdBQUosRUFBUyxHQUFsRCxFQUFzRDtBQUNwRCxZQUFHLEdBQUcsQ0FBSCxDQUFLLFFBQUwsQ0FBYyxDQUFkLElBQW1CLEdBQUcsUUFBSCxDQUFZLENBQVosRUFBZSxDQUFmLENBQWlCLFFBQWpCLENBQTBCLENBQTFCLEdBQThCLEVBQTlCLElBQXFDLEdBQUcsQ0FBSCxDQUFLLFFBQUwsQ0FBYyxDQUFkLElBQW1CLEdBQUcsUUFBSCxDQUFZLENBQVosRUFBZSxDQUFmLENBQWlCLFFBQWpCLENBQTBCLENBQTFCLEdBQTZCLEVBQTdCLElBQW1DLEdBQUcsQ0FBSCxDQUFLLFFBQUwsQ0FBYyxDQUFkLElBQW1CLEdBQUcsUUFBSCxDQUFZLENBQVosRUFBZSxDQUFmLENBQWlCLFFBQWpCLENBQTBCLENBQTFCLEdBQThCLEVBQTlCLEVBQWtDO0FBQ3BLLGFBQUcsS0FBSCxDQUFTLENBQVQsR0FBYSxDQUFiLENBRG9LO0FBRXBLLGFBQUcsS0FBSCxDQUFTLENBQVQsR0FBYSxDQUFiLENBRm9LO1NBQXRLLE1BR00sSUFBRyxHQUFHLENBQUgsQ0FBSyxRQUFMLENBQWMsQ0FBZCxJQUFtQixHQUFHLFFBQUgsQ0FBWSxDQUFaLEVBQWUsQ0FBZixDQUFpQixRQUFqQixDQUEwQixDQUExQixHQUE2QixFQUE3QixJQUFvQyxHQUFHLENBQUgsQ0FBSyxRQUFMLENBQWMsQ0FBZCxJQUFtQixHQUFHLFFBQUgsQ0FBWSxDQUFaLEVBQWUsQ0FBZixDQUFpQixRQUFqQixDQUEwQixDQUExQixHQUE2QixFQUE3QixJQUFtQyxHQUFHLENBQUgsQ0FBSyxRQUFMLENBQWMsQ0FBZCxJQUFtQixHQUFHLFFBQUgsQ0FBWSxDQUFaLEVBQWUsQ0FBZixDQUFpQixRQUFqQixDQUEwQixDQUExQixHQUE4QixFQUE5QixFQUFrQztBQUN6SyxhQUFHLEtBQUgsQ0FBUyxDQUFULEdBQWEsQ0FBYixDQUR5SztBQUV6SyxhQUFHLEtBQUgsQ0FBUyxDQUFULEdBQWEsQ0FBYixDQUZ5SztTQUFySztPQUpSOzs7O1NBdERpQjs7Ozs7Ozs7Ozs7UUNBTDtBQUFULFNBQVMsV0FBVCxDQUFxQixJQUFyQixFQUEwQjtBQUMvQixNQUFJLFFBQVEsSUFBSSxLQUFKLEVBQVIsQ0FEMkI7QUFFL0IsUUFBTSxPQUFOLENBQWMsSUFBZDs7QUFGK0IsT0FJL0IsQ0FBTSxVQUFOLENBQWlCLEtBQWpCLENBQXVCLFFBQXZCLEdBQWtDLE9BQWxDLENBSitCO0FBSy9CLFFBQU0sVUFBTixDQUFpQixLQUFqQixDQUF1QixJQUF2QixHQUE4QixLQUE5QixDQUwrQjtBQU0vQixRQUFNLFVBQU4sQ0FBaUIsS0FBakIsQ0FBdUIsR0FBdkIsR0FBNkIsS0FBN0IsQ0FOK0I7QUFPL0IsV0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixNQUFNLFVBQU4sQ0FBMUIsQ0FQK0I7O0FBUy9CLFNBQU8sS0FBUCxDQVQrQjtDQUExQjs7Ozs7Ozs7UUNBUztBQUFULFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEwQjtBQUMvQixNQUFJLFlBQVksSUFBSSxNQUFNLGlCQUFOLENBQXdCLE1BQTVCLENBQVosQ0FEMkI7QUFFL0IsWUFBVSxRQUFWLEdBQXFCLEtBQXJCLENBRitCO0FBRy9CLFlBQVUsV0FBVixHQUF3QixHQUF4QixDQUgrQjtBQUkvQixZQUFVLE1BQVYsR0FBbUIsS0FBbkIsQ0FKK0I7QUFLL0IsWUFBVSxTQUFWLEdBQXNCLEdBQXRCLENBTCtCO0FBTS9CLFlBQVUsS0FBVixHQUFrQixLQUFsQixDQU4rQjtBQU8vQixZQUFVLFFBQVYsR0FBcUIsR0FBckIsQ0FQK0I7QUFRL0IsWUFBVSxZQUFWLEdBQXlCLElBQXpCLENBUitCO0FBUy9CLFlBQVUsb0JBQVYsR0FBaUMsR0FBakMsQ0FUK0I7QUFVL0IsU0FBTyxTQUFQLENBVitCO0NBQTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUVAsQ0FBQyxZQUFVO0FBQ1QsU0FBTyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxJQUFoQyxFQUFzQyxLQUF0QyxFQURTOztBQUdULE1BQUksUUFBUSw4QkFBWSxDQUFaLENBQVIsQ0FISzs7QUFLVCxNQUFJLEdBQUo7TUFDSSxNQURKO01BRUksUUFBUSxJQUFSO01BQ0EsU0FBUyxJQUFUO01BQ0EsU0FKSjtNQUtJLFFBTEo7TUFNSSxLQU5KO01BT0ksWUFBWSxDQUFDLENBQUMsSUFBRCxFQUFPLENBQUMsR0FBRCxFQUFNLENBQUMsRUFBRCxDQUExQjtNQUNBLFFBQVEsRUFBUjtNQUNBLFdBQVcsRUFBWDtNQUNBLFdBQVcsRUFBWDtNQUNBLGVBQWUsQ0FBZjtNQUNBLGFBQWEsR0FBYjtNQUNBLFNBQVMsRUFBVDs7O0FBbEJLLFdBcUJBLElBQVQsR0FBZTs7QUFFYixVQUFNLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFOOztBQUZhLFNBSWIsR0FBUSxJQUFJLE1BQU0sS0FBTixFQUFaOztBQUphLFVBTWIsR0FBUyxxQkFBVyxFQUFDLEdBQUcsS0FBSCxFQUFVLEdBQUcsTUFBSCxFQUF0QixFQUFrQyxFQUFDLEdBQUcsQ0FBSCxFQUFNLEdBQUcsQ0FBSCxFQUFNLEdBQUcsSUFBSCxFQUEvQyxDQUFUOztBQU5hLGFBUWIsR0FBWSwwQkFBVSxNQUFWLENBQVo7OztBQVJhLFlBV2IsR0FBVyxJQUFJLE1BQU0sYUFBTixFQUFmLENBWGE7QUFZYixhQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBd0IsTUFBeEIsRUFaYTtBQWFiLGFBQVMsYUFBVCxDQUF1QixJQUFJLE1BQU0sS0FBTixDQUFZLFFBQWhCLENBQXZCLEVBYmE7QUFjYixRQUFJLFdBQUosQ0FBZ0IsU0FBUyxVQUFULENBQWhCOzs7QUFkYSxRQWlCVCxtQkFBbUIsSUFBSSxNQUFNLGdCQUFOLENBQXVCLFFBQTNCLENBQW5CLENBakJTO0FBa0JiLHFCQUFpQixRQUFqQixDQUEwQixHQUExQixDQUE4QixDQUE5QixFQUFpQyxHQUFqQyxFQUFzQyxHQUF0QyxFQWxCYTtBQW1CYixVQUFNLEdBQU4sQ0FBVSxnQkFBVjs7O0FBbkJhLFNBc0JWLElBQUksSUFBSSxDQUFKLEVBQU8sTUFBTSxVQUFVLE1BQVYsRUFBa0IsSUFBSSxHQUFKLEVBQVMsR0FBaEQsRUFBb0Q7QUFDakQsWUFBTSxDQUFOLElBQVcsb0JBQVUsRUFBQyxHQUFHLElBQUgsRUFBUyxHQUFHLEdBQUgsRUFBcEIsRUFBNkIsRUFBQyxHQUFHLENBQUgsRUFBTSxHQUFHLENBQUgsRUFBTSxHQUFHLFVBQVUsQ0FBVixDQUFILEVBQTFDLEVBQTRELEtBQTVELENBQVgsQ0FEaUQ7S0FBcEQ7QUFHQSxTQUFJLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxZQUFKLEVBQWtCLEdBQWpDLEVBQXFDO0FBQ2xDLGVBQVMsQ0FBVCxJQUFjLHVCQUFhLEVBQUMsR0FBRyxFQUFILEVBQU8sR0FBRyxFQUFILEVBQXJCLEVBQTZCLEVBQUMsR0FBRyxNQUFNLElBQUUsRUFBRixFQUFNLEdBQUcsR0FBSCxFQUFRLEdBQUcsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWMsQ0FBQyxJQUFELENBQTVCLEVBQXJELEVBQTBGLEtBQTFGLENBQWQsQ0FEa0M7S0FBckM7QUFHQyxhQUFTLElBQVQsQ0FBYyx1QkFBYSxFQUFDLEdBQUcsRUFBSCxFQUFPLEdBQUcsRUFBSCxFQUFyQixFQUE2QixFQUFDLEdBQUcsR0FBSCxFQUFRLEdBQUcsQ0FBSCxFQUFNLEdBQUcsQ0FBQyxDQUFELEVBQS9DLEVBQW9ELEtBQXBELENBQWQsRUE1QmE7QUE2QmQsU0FBSSxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksVUFBSixFQUFnQixHQUEvQixFQUFtQztBQUNqQyxhQUFPLENBQVAsSUFBWSxxQkFBVyxDQUFDLFFBQUQsRUFBVSxRQUFWLEVBQW1CLFFBQW5CLENBQVgsRUFBeUMsRUFBQyxHQUFHLENBQUgsRUFBTSxHQUFFLENBQUYsRUFBaEQsRUFBc0QsRUFBQyxHQUFHLENBQUgsRUFBTSxHQUFHLENBQUgsRUFBN0QsRUFBb0UsS0FBcEUsRUFBMkUsUUFBM0UsQ0FBWixDQURpQztLQUFuQztBQUdDLGNBaENhO0dBQWY7O0FBbUNBLFdBQVMsT0FBVCxHQUFrQjtBQUNoQixVQUFNLEtBQU4sR0FEZ0I7QUFFakIsMEJBQXNCLE9BQXRCLEVBRmlCO0FBR2pCLGNBQVUsTUFBVixHQUhpQjtBQUlqQixTQUFJLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxVQUFKLEVBQWdCLEdBQS9CLEVBQW1DO0FBQ2pDLGFBQU8sQ0FBUCxFQUFVLElBQVYsR0FEaUM7S0FBbkM7QUFHQSxTQUFJLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxZQUFKLEVBQWtCLEdBQWpDLEVBQXFDO0FBQ2xDLGVBQVMsQ0FBVCxFQUFZLElBQVosR0FEa0M7S0FBckM7QUFHQSxhQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsRUFBdUIsTUFBdkIsRUFWaUI7QUFXakIsVUFBTSxHQUFOLEdBWGlCO0dBQWxCO0NBeERELENBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FtZXJhe1xuICBjb25zdHJ1Y3RvcihzaXplLCBwb3NpdGlvbil7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdmFyIGZvdiA9IDYwO1xuICAgIHZhciBhc3BlY3QgPSB0aGlzLnNpemUudy90aGlzLnNpemUuaDtcbiAgICB2YXIgbmVhciA9IDE7XG4gICAgdmFyIGZhciA9IDEwMDAwO1xuICAgIHZhciBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoZm92LCBhc3BlY3QsIG5lYXIsIGZhcik7XG4gICAgY2FtZXJhLnBvc2l0aW9uLnNldCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy5wb3NpdGlvbi56KTtcbiAgICByZXR1cm4gY2FtZXJhO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxldmF0b3J7XG4gIGNvbnN0cnVjdG9yKHNpemUsIHBvc2l0aW9uLCBzY2VuZSl7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5wb3MgPSBbLTEwMTAsIC01MTAsIC0xMF07XG4gICAgdGhpcy5mbG9vciA9IDA7IC8vIDA6IDFmLCAxOiAyZiwgMjogM2ZcbiAgICB0aGlzLnYgPSAxMDtcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cbiAgaW5pdCgpe1xuICAgIHZhciBtZSA9IHRoaXM7XG4gICAgdmFyIGdlbyA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeShtZS5zaXplLncsIG1lLnNpemUuaCwgMzIpO1xuICAgIHZhciBtYXQgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe2NvbG9yOiAweGZmZmZmZiwgc2lkZTogVEhSRUUuRG91YmxlU2lkZSwgdHJhbnNwYXJlbnQ6IHRydWUsICAgb3BhY2l0eTogICAwLjV9KTtcbiAgICB2YXIgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KTtcbiAgICB2YXIgZWRnZSA9IG5ldyBUSFJFRS5FZGdlc0hlbHBlcihtZXNoLCAweDAwMDAwMCk7XG4gICAgbWUubyA9IG1lc2g7XG4gICAgbWUuby5wb3NpdGlvbi5zZXQobWUucG9zaXRpb24ueCwgbWUucG9zaXRpb24ueSwgbWUucG9zaXRpb24ueik7XG4gICAgZWRnZS5tYXRlcmlhbC5saW5ld2lkdGggPSAxO1xuICAgIG1lLnNjZW5lLmFkZChtZXNoKTtcbiAgICBtZS5zY2VuZS5hZGQoZWRnZSk7XG4gIH1cbiAgbW92ZSgpe1xuICAgIHZhciBtZSA9IHRoaXM7XG4gICAgbWUuby5wb3NpdGlvbi56ICs9IG1lLnY7XG4gICAgLy8gc3RhdGVcbiAgICBpZihtZS5vLnBvc2l0aW9uLnogPD0gbWUucG9zWzBdKXtcbiAgICAgIG1lLmZsb29yID0gMDtcbiAgICB9ZWxzZSBpZihtZS5vLnBvc2l0aW9uLnogPj0gbWUucG9zWzFdICYmIG1lLm8ucG9zaXRpb24ueiA8IG1lLnBvc1syXSl7XG4gICAgICBtZS5mbG9vciA9IDE7XG4gICAgfWVsc2V7XG4gICAgICBtZS5mbG9vciA9IDI7XG4gICAgfVxuICAgIGlmKG1lLm8ucG9zaXRpb24ueiA+PSBtZS5wb3NbMl0gKyAyMCB8fCBtZS5vLnBvc2l0aW9uLnogPD0gbWUucG9zWzBdKXtcbiAgICAgIG1lLnYgKj0gLTE7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGbG9vcntcbiAgY29uc3RydWN0b3Ioc2l6ZSwgcG9zaXRpb24sIHNjZW5lKXtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cbiAgaW5pdCgpe1xuICAgIHZhciBtZSA9IHRoaXM7XG4gICAgdmFyIGdlbyA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KG1lLnNpemUudywgbWUuc2l6ZS5oLCAzMik7XG4gICAgdmFyIG1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7Y29sb3I6IDB4ZmZmZmZmLCBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLCB0cmFuc3BhcmVudDogdHJ1ZSwgICBvcGFjaXR5OiAgIDAuNX0pO1xuICAgIHZhciBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvLCBtYXQpO1xuICAgIHZhciBlZGdlID0gbmV3IFRIUkVFLkVkZ2VzSGVscGVyKG1lc2gsIDB4MDAwMDAwKTtcbiAgICBtZS5vID0gbWVzaDtcbiAgICBtZS5vLnBvc2l0aW9uLnNldChtZS5wb3NpdGlvbi54LCBtZS5wb3NpdGlvbi55LCBtZS5wb3NpdGlvbi56KTtcbiAgICBlZGdlLm1hdGVyaWFsLmxpbmV3aWR0aCA9IDE7XG4gICAgbWUuc2NlbmUuYWRkKG1lc2gpO1xuICAgIG1lLnNjZW5lLmFkZChlZGdlKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzdGFjbGV7XG4gIGNvbnN0cnVjdG9yKHNpemUsIHBvc2l0aW9uLCBzY2VuZSl7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG4gIGluaXQoKXtcbiAgICB2YXIgbWUgPSB0aGlzO1xuICAgIHZhciBnZW8gPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeShtZS5zaXplLncsIG1lLnNpemUuaCwgMzIpO1xuICAgIHZhciBtYXQgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe2NvbG9yOiAweGZmZmZmZiwgc2lkZTogVEhSRUUuRG91YmxlU2lkZSwgdHJhbnNwYXJlbnQ6IHRydWUsICAgb3BhY2l0eTogICAwLjV9KTtcbiAgICB2YXIgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KTtcbiAgICB2YXIgZWRnZSA9IG5ldyBUSFJFRS5FZGdlc0hlbHBlcihtZXNoLCAweDAwMDAwMCk7XG4gICAgbWUubyA9IG1lc2g7XG4gICAgbWUuby5wb3NpdGlvbi5zZXQobWUucG9zaXRpb24ueCwgbWUucG9zaXRpb24ueSwgbWUucG9zaXRpb24ueik7XG4gICAgZWRnZS5tYXRlcmlhbC5saW5ld2lkdGggPSAxO1xuICAgIG1lLnNjZW5lLmFkZChtZXNoKTtcbiAgICBtZS5zY2VuZS5hZGQoZWRnZSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlcnNvbntcbiAgY29uc3RydWN0b3IoY29sb3IsIHBvc2l0aW9uLCBzcGVlZCwgc2NlbmUsIG9ic3RhY2xlKXtcbiAgICB0aGlzLmNvbG9yID0gY29sb3JbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY29sb3IubGVuZ3RoKV07XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgdGhpcy5vYnN0YWNsZSA9IG9ic3RhY2xlO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG4gIGluaXQoKXtcbiAgICB2YXIgbWUgPSB0aGlzO1xuICAgIHZhciBnZW8gPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoNSwgMzIsIDMyKTtcbiAgICB2YXIgbWF0ID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtjb2xvcjogbWUuY29sb3IsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGV9KTtcbiAgICB2YXIgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KTtcbiAgICBtZS5vID0gbWVzaDtcbiAgICBtZS5zY2VuZS5hZGQobWVzaCk7XG4gIH1cbiAgbW92ZSgpe1xuICAgIHZhciBtZSA9IHRoaXM7XG4gICAgLy8g44Op44Oz44OA44Og44Km44Kp44O844KvXG4gICAgdmFyIHR5cGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqOClcbiAgICBpZih0eXBlID09PSAwIHx8IHR5cGUgPT09IDMgfHwgdHlwZSA9PT0gNil7XG4gICAgICBtZS5vLnBvc2l0aW9uLnggLT0gbWUuc3BlZWQueCAqIG1lLnRvdWNoV2FsbCgpO1xuICAgIH1cbiAgICBpZih0eXBlID09PSAyIHx8IHR5cGUgPT09IDUgfHwgdHlwZSA9PT0gOCl7XG4gICAgICBtZS5vLnBvc2l0aW9uLnggKz0gbWUuc3BlZWQueCAqIG1lLnRvdWNoV2FsbCgpO1xuICAgIH1cbiAgICBpZih0eXBlID09PSAwIHx8IHR5cGUgPT09IDEgfHwgdHlwZSA9PT0gMil7XG4gICAgICBtZS5vLnBvc2l0aW9uLnkgKz0gbWUuc3BlZWQueSAqIG1lLnRvdWNoV2FsbCgpO1xuICAgIH1cbiAgICBpZih0eXBlID09PSA2IHx8IHR5cGUgPT09IDcgfHwgdHlwZSA9PT0gOCl7XG4gICAgICBtZS5vLnBvc2l0aW9uLnkgLT0gbWUuc3BlZWQueSAqIG1lLnRvdWNoV2FsbCgpO1xuICAgIH1cbiAgICAvLyDooZ3nqoHliKTlrppcbiAgICBtZS50b3VjaCgpO1xuICB9XG4gIHRvdWNoV2FsbCgpe1xuICAgIHZhciBtZSA9IHRoaXM7XG4gICAgdmFyIHggPSBtZS5vLnBvc2l0aW9uLng7XG4gICAgdmFyIHkgPSBtZS5vLnBvc2l0aW9uLnk7XG4gICAgdmFyIHZ4ID0gbWUuc3BlZWQueDtcbiAgICB2YXIgdnkgPSBtZS5zcGVlZC55O1xuICAgIHZhciBkaXIgPSAxO1xuICAgIGlmKCh4ICsgdngpID49IDUwMCB8fCAoeCAtIHZ4KSA8PSAtNTAwKXtcbiAgICAgIGRpciAqPSAtMTtcbiAgICB9XG4gICAgaWYoKHkgKyB2eSkgPj0gMjUwIHx8ICh5IC0gdnkpIDw9IC0yNTApe1xuICAgICAgZGlyICo9IC0xO1xuICAgIH1cbiAgICByZXR1cm4gZGlyO1xuICB9XG4gIHRvdWNoKCl7XG4gICAgdmFyIG1lID0gdGhpcztcbiAgICAvLyBcbiAgICBmb3IodmFyIGkgPSAwLCBjbnQgPSBtZS5vYnN0YWNsZS5sZW5ndGg7IGkgPCBjbnQ7IGkrKyl7XG4gICAgICBpZihtZS5vLnBvc2l0aW9uLnggPj0gbWUub2JzdGFjbGVbaV0uby5wb3NpdGlvbi54IC0gMjAgJiYgKG1lLm8ucG9zaXRpb24ueSA+PSBtZS5vYnN0YWNsZVtpXS5vLnBvc2l0aW9uLnkgLTIwICYmIG1lLm8ucG9zaXRpb24ueSA8PSBtZS5vYnN0YWNsZVtpXS5vLnBvc2l0aW9uLnkgKyAyMCkpe1xuICAgICAgICBtZS5zcGVlZC54ID0gMDtcbiAgICAgICAgbWUuc3BlZWQueSA9IDE7XG4gICAgICB9ZWxzZSBpZihtZS5vLnBvc2l0aW9uLnkgPj0gbWUub2JzdGFjbGVbaV0uby5wb3NpdGlvbi55IC0yMCAmJiAobWUuby5wb3NpdGlvbi54ID49IG1lLm9ic3RhY2xlW2ldLm8ucG9zaXRpb24ueCAtMjAgJiYgbWUuby5wb3NpdGlvbi54IDw9IG1lLm9ic3RhY2xlW2ldLm8ucG9zaXRpb24ueCArIDIwKSl7XG4gICAgICAgIG1lLnNwZWVkLnggPSAxO1xuICAgICAgICBtZS5zcGVlZC55ID0gMDtcbiAgICAgIH0gICAgICBcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBQZXJmb3JtYW5jZSh0eXBlKXtcbiAgdmFyIHN0YXRzID0gbmV3IFN0YXRzKCk7XG4gIHN0YXRzLnNldE1vZGUodHlwZSk7IC8vIDA6IGZwcywgMTogbXMsIDI6IG1iXG4gIC8vIGFsaWduIHRvcC1sZWZ0XG4gIHN0YXRzLmRvbUVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICBzdGF0cy5kb21FbGVtZW50LnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgc3RhdHMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSAnMHB4JztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzdGF0cy5kb21FbGVtZW50KTtcblxuICByZXR1cm4gc3RhdHM7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIFRyYWNrYmFsbChjYW1lcmEpe1xuICB2YXIgdHJhY2tiYWxsID0gbmV3IFRIUkVFLlRyYWNrYmFsbENvbnRyb2xzKGNhbWVyYSk7XG4gIHRyYWNrYmFsbC5ub1JvdGF0ZSA9IGZhbHNlO1xuICB0cmFja2JhbGwucm90YXRlU3BlZWQgPSAxLjA7XG4gIHRyYWNrYmFsbC5ub1pvb20gPSBmYWxzZTtcbiAgdHJhY2tiYWxsLnpvb21TcGVlZCA9IDEuMDtcbiAgdHJhY2tiYWxsLm5vUGFuID0gZmFsc2U7XG4gIHRyYWNrYmFsbC5wYW5TcGVlZCA9IDEuMDtcbiAgdHJhY2tiYWxsLnN0YXRpY01vdmluZyA9IHRydWU7XG4gIHRyYWNrYmFsbC5keW5hbWljRGFtcGluZ0ZhY3RvciA9IDAuMztcbiAgcmV0dXJuIHRyYWNrYmFsbDtcbn0iLCJpbXBvcnQgRmxvb3IgZnJvbSAnLi9jbGFzcy92aWV3L0Zsb29yJ1xuaW1wb3J0IE9ic3RhY2xlIGZyb20gJy4vY2xhc3Mvdmlldy9PYnN0YWNsZSdcbmltcG9ydCBFbGV2YXRvciBmcm9tICcuL2NsYXNzL3ZpZXcvRWxldmF0b3InXG5pbXBvcnQgUGVyc29uIGZyb20gJy4vY2xhc3Mvdmlldy9QZXJzb24nXG5pbXBvcnQgQ2FtZXJhIGZyb20gJy4vY2xhc3Mvdmlldy9DYW1lcmEnXG5pbXBvcnQge1RyYWNrYmFsbH0gZnJvbSAnLi9mdW5jdGlvbi9UcmFja2JhbGwnXG5pbXBvcnQge1BlcmZvcm1hbmNlfSBmcm9tICcuL2Z1bmN0aW9uL1BlcmZvcm1hbmNlJ1xuXG4oZnVuY3Rpb24oKXtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBpbml0LCBmYWxzZSk7XG5cbiAgdmFyIHN0YXRzID0gUGVyZm9ybWFuY2UoMCk7XG5cbiAgdmFyIGN2cyxcbiAgICAgIGNhbWVyYSxcbiAgICAgIHdpZHRoID0gMTEwMCxcbiAgICAgIGhlaWdodCA9IDIwMDAsXG4gICAgICB0cmFja2JhbGwsXG4gICAgICByZW5kZXJlcixcbiAgICAgIHNjZW5lLFxuICAgICAgZmxvb3JfcG9zID0gWy0xMDEwLCAtNTEwLCAtMTBdLFxuICAgICAgZmxvb3IgPSBbXSxcbiAgICAgIG9ic3RhY2xlID0gW10sXG4gICAgICBlbGV2YXRvciA9IFtdLFxuICAgICAgZWxldmF0b3JfY250ID0gNixcbiAgICAgIHBlb3BsZV9jbnQgPSAxMDAsXG4gICAgICBwZW9wbGUgPSBbXTtcblxuICAvLyBpbml0XG4gIGZ1bmN0aW9uIGluaXQoKXtcbiAgXHQvLyBUaHJlZS5qcyBzZXR0aW5nXG4gICAgY3ZzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpZWxkJyk7XG4gICAgLy8gc2NlbmVcbiAgICBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgIC8vIGNhbWVyYVxuICAgIGNhbWVyYSA9IG5ldyBDYW1lcmEoe3c6IHdpZHRoLCBoOiBoZWlnaHR9LCB7eDogMCwgeTogMCwgejogMjAwMH0pO1xuICAgIC8vIHRyYWNrYmFsbFxuICAgIHRyYWNrYmFsbCA9IFRyYWNrYmFsbChjYW1lcmEpO1xuXG4gICAgLy8gcmVuZGVyZXJcbiAgICByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZikpO1xuICAgIGN2cy5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgIC8vIGxpZ2h0XG4gICAgdmFyIGRpcmVjdGlvbmFsTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZik7XG4gICAgZGlyZWN0aW9uYWxMaWdodC5wb3NpdGlvbi5zZXQoMCwgMC43LCAwLjcpO1xuICAgIHNjZW5lLmFkZChkaXJlY3Rpb25hbExpZ2h0KTtcblxuICBcdC8vIFRocmVlLmpzIG9iamVjdFxuICBcdGZvcih2YXIgaSA9IDAsIGNudCA9IGZsb29yX3Bvcy5sZW5ndGg7IGkgPCBjbnQ7IGkrKyl7XG4gICAgICBmbG9vcltpXSA9IG5ldyBGbG9vcih7dzogMTAwMCwgaDogNTAwfSwge3g6IDAsIHk6IDAsIHo6IGZsb29yX3Bvc1tpXX0sIHNjZW5lKTtcbiAgXHR9XG4gIFx0Zm9yKHZhciBpID0gMDsgaSA8IGVsZXZhdG9yX2NudDsgaSsrKXtcbiAgICAgIGVsZXZhdG9yW2ldID0gbmV3IEVsZXZhdG9yKHt3OiA2MCwgaDogNjB9LCB7eDogMjAwICsgaSo2MCwgeTogMjAwLCB6OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqLTEwMDApfSwgc2NlbmUpO1xuICBcdH1cbiAgICBvYnN0YWNsZS5wdXNoKG5ldyBPYnN0YWNsZSh7dzogMzAsIGg6IDMwfSwge3g6IDEwMCwgeTogMCwgejogLTV9LCBzY2VuZSkpO1xuICBcdGZvcih2YXIgaSA9IDA7IGkgPCBwZW9wbGVfY250OyBpKyspe1xuICBcdCAgcGVvcGxlW2ldID0gbmV3IFBlcnNvbihbMHhmZjAwMDAsMHgwMGZmMDAsMHgwMDAwZmZdLCB7eDogMCwgeTowfSwge3g6IDQsIHk6IDR9LCBzY2VuZSwgb2JzdGFjbGUpO1xuICBcdH1cbiAgICBhbmltYXRlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBhbmltYXRlKCl7XG4gICAgc3RhdHMuYmVnaW4oKTtcbiAgXHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gIFx0dHJhY2tiYWxsLnVwZGF0ZSgpO1xuICBcdGZvcih2YXIgaSA9IDA7IGkgPCBwZW9wbGVfY250OyBpKyspe1xuICBcdCAgcGVvcGxlW2ldLm1vdmUoKTtcbiAgXHR9XG4gIFx0Zm9yKHZhciBpID0gMDsgaSA8IGVsZXZhdG9yX2NudDsgaSsrKXtcbiAgICAgIGVsZXZhdG9yW2ldLm1vdmUoKTtcbiAgICB9XG4gIFx0cmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuICBcdHN0YXRzLmVuZCgpO1xuICB9XG59KSgpOyJdfQ==
