(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
      me.o.position.x += me.speed.x;
      me.o.position.y += me.speed.y;
      if (me.o.position.x >= 500 || me.o.position.x <= -500) {
        me.speed.x *= -1;
      }
      if (me.o.position.y >= 250 || me.o.position.y <= -250) {
        me.speed.y *= -1;
      }
      // 衝突判定
      me.touch();
    }
  }, {
    key: "touch",
    value: function touch() {
      var me = this;
      if (me.o.position.x >= me.obstacle.o.position.x - 20 && me.o.position.y >= me.obstacle.o.position.y - 20 && me.o.position.y <= me.obstacle.o.position.y + 20) {
        me.speed.x = 0;
        me.speed.y = 1;
      } else if (me.o.position.y >= me.obstacle.o.position.y - 20 && me.o.position.x >= me.obstacle.o.position.x - 20 && me.o.position.x <= me.obstacle.o.position.x + 20) {
        me.speed.x = 1;
        me.speed.y = 0;
      }
    }
  }]);

  return Person;
}();

exports.default = Person;

},{}],5:[function(require,module,exports){
'use strict';

var _Floor = require('./class/view/Floor');

var _Floor2 = _interopRequireDefault(_Floor);

var _Obstacle = require('./class/view/Obstacle');

var _Obstacle2 = _interopRequireDefault(_Obstacle);

var _Elevator = require('./class/view/Elevator');

var _Elevator2 = _interopRequireDefault(_Elevator);

var _Person = require('./class/view/Person');

var _Person2 = _interopRequireDefault(_Person);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
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

  function setGl() {
    cvs = document.getElementById('field');
    // scene
    scene = new THREE.Scene();
    // camera
    var width = 1100;
    var height = 2000;
    var fov = 60;
    var aspect = width / height;
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
  function init() {
    // Three.js setting
    setGl();

    // Three.js object
    for (var i = 0, cnt = floor_pos.length; i < cnt; i++) {
      floor[i] = new _Floor2.default({ w: 1000, h: 500 }, { x: 0, y: 0, z: floor_pos[i] }, scene);
    }
    for (var i = 0; i < elevator_cnt; i++) {
      elevator[i] = new _Elevator2.default({ w: 60, h: 60 }, { x: 200 + i * 60, y: 200, z: Math.floor(Math.random() * -1000) }, scene);
    }
    obstacle = new _Obstacle2.default({ w: 30, h: 30 }, { x: 100, y: 0, z: -5 }, scene);
    for (var i = 0; i < people_cnt; i++) {
      people[i] = new _Person2.default([0xff0000, 0x00ff00, 0x0000ff], { x: 0, y: 0 }, { x: Math.floor(Math.random() * 4) - 2, y: Math.floor(Math.random() * 4) - 2 }, scene, obstacle);
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
    console.log(camera.position.x + ':' + camera.position.y + ':' + camera.position.z);
    renderer.render(scene, camera);
    stats.end();
  }
})();

},{"./class/view/Elevator":1,"./class/view/Floor":2,"./class/view/Obstacle":3,"./class/view/Person":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9jbGFzcy92aWV3L0VsZXZhdG9yLmpzIiwianMvY2xhc3Mvdmlldy9GbG9vci5qcyIsImpzL2NsYXNzL3ZpZXcvT2JzdGFjbGUuanMiLCJqcy9jbGFzcy92aWV3L1BlcnNvbi5qcyIsImpzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQXFCO0FBQ25CLFdBRG1CLFFBQ25CLENBQVksSUFBWixFQUFrQixRQUFsQixFQUE0QixLQUE1QixFQUFrQzswQkFEZixVQUNlOztBQUNoQyxTQUFLLElBQUwsR0FBWSxJQUFaLENBRGdDO0FBRWhDLFNBQUssUUFBTCxHQUFnQixRQUFoQixDQUZnQztBQUdoQyxTQUFLLEdBQUwsR0FBVyxDQUFDLENBQUMsSUFBRCxFQUFPLENBQUMsR0FBRCxFQUFNLENBQUMsRUFBRCxDQUF6QixDQUhnQztBQUloQyxTQUFLLEtBQUwsR0FBYSxDQUFiO0FBSmdDLFFBS2hDLENBQUssQ0FBTCxHQUFTLEVBQVQsQ0FMZ0M7QUFNaEMsU0FBSyxLQUFMLEdBQWEsS0FBYixDQU5nQztBQU9oQyxTQUFLLElBQUwsR0FQZ0M7R0FBbEM7O2VBRG1COzsyQkFVYjtBQUNKLFVBQUksS0FBSyxJQUFMLENBREE7QUFFSixVQUFJLE1BQU0sSUFBSSxNQUFNLFdBQU4sQ0FBa0IsR0FBRyxJQUFILENBQVEsQ0FBUixFQUFXLEdBQUcsSUFBSCxDQUFRLENBQVIsRUFBVyxFQUE1QyxDQUFOLENBRkE7QUFHSixVQUFJLE1BQU0sSUFBSSxNQUFNLGlCQUFOLENBQXdCLEVBQUMsT0FBTyxRQUFQLEVBQWlCLE1BQU0sTUFBTSxVQUFOLEVBQWtCLGFBQWEsSUFBYixFQUFxQixTQUFXLEdBQVgsRUFBM0YsQ0FBTixDQUhBO0FBSUosVUFBSSxPQUFPLElBQUksTUFBTSxJQUFOLENBQVcsR0FBZixFQUFvQixHQUFwQixDQUFQLENBSkE7QUFLSixVQUFJ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RUFBVSxRQUFWLEVBQW1CLFFBQW5CLENBQVgsRUFBeUMsRUFBQyxHQUFHLENBQUgsRUFBTSxHQUFFLENBQUYsRUFBaEQsRUFBc0QsRUFBQyxHQUFHLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFjLENBQWQsQ0FBWCxHQUE0QixDQUE1QixFQUErQixHQUFHLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFjLENBQWQsQ0FBWCxHQUE0QixDQUE1QixFQUE1RixFQUE0SCxLQUE1SCxFQUFtSSxRQUFuSSxDQUFaLENBRGlDO0tBQW5DO0FBR0MsY0FmYTtHQUFmOztBQWtCQSxXQUFTLE9BQVQsR0FBa0I7QUFDaEIsVUFBTSxLQUFOLEdBRGdCO0FBRWpCLDBCQUFzQixPQUF0QixFQUZpQjtBQUdqQixjQUFVLE1BQVYsR0FIaUI7QUFJakIsU0FBSSxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksVUFBSixFQUFnQixHQUEvQixFQUFtQztBQUNqQyxhQUFPLENBQVAsRUFBVSxJQUFWLEdBRGlDO0tBQW5DO0FBR0EsU0FBSSxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksWUFBSixFQUFrQixHQUFqQyxFQUFxQztBQUNsQyxlQUFTLENBQVQsRUFBWSxJQUFaLEdBRGtDO0tBQXJDO0FBR0EsWUFBUSxHQUFSLENBQVksT0FBTyxRQUFQLENBQWdCLENBQWhCLEdBQW9CLEdBQXBCLEdBQTBCLE9BQU8sUUFBUCxDQUFnQixDQUFoQixHQUFvQixHQUE5QyxHQUFvRCxPQUFPLFFBQVAsQ0FBZ0IsQ0FBaEIsQ0FBaEUsQ0FWaUI7QUFXakIsYUFBUyxNQUFULENBQWdCLEtBQWhCLEVBQXVCLE1BQXZCLEVBWGlCO0FBWWpCLFVBQU0sR0FBTixHQVppQjtHQUFsQjtDQWpGRCxDQUFEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZXZhdG9ye1xuICBjb25zdHJ1Y3RvcihzaXplLCBwb3NpdGlvbiwgc2NlbmUpe1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMucG9zID0gWy0xMDEwLCAtNTEwLCAtMTBdO1xuICAgIHRoaXMuZmxvb3IgPSAwOyAvLyAwOiAxZiwgMTogMmYsIDI6IDNmXG4gICAgdGhpcy52ID0gMTA7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG4gIGluaXQoKXtcbiAgICB2YXIgbWUgPSB0aGlzO1xuICAgIHZhciBnZW8gPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkobWUuc2l6ZS53LCBtZS5zaXplLmgsIDMyKTtcbiAgICB2YXIgbWF0ID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtjb2xvcjogMHhmZmZmZmYsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsIHRyYW5zcGFyZW50OiB0cnVlLCAgIG9wYWNpdHk6ICAgMC41fSk7XG4gICAgdmFyIG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdCk7XG4gICAgdmFyIGVkZ2UgPSBuZXcgVEhSRUUuRWRnZXNIZWxwZXIobWVzaCwgMHgwMDAwMDApO1xuICAgIG1lLm8gPSBtZXNoO1xuICAgIG1lLm8ucG9zaXRpb24uc2V0KG1lLnBvc2l0aW9uLngsIG1lLnBvc2l0aW9uLnksIG1lLnBvc2l0aW9uLnopO1xuICAgIGVkZ2UubWF0ZXJpYWwubGluZXdpZHRoID0gMTtcbiAgICBtZS5zY2VuZS5hZGQobWVzaCk7XG4gICAgbWUuc2NlbmUuYWRkKGVkZ2UpO1xuICB9XG4gIG1vdmUoKXtcbiAgICB2YXIgbWUgPSB0aGlzO1xuICAgIG1lLm8ucG9zaXRpb24ueiArPSBtZS52O1xuICAgIC8vIHN0YXRlXG4gICAgaWYobWUuby5wb3NpdGlvbi56IDw9IG1lLnBvc1swXSl7XG4gICAgICBtZS5mbG9vciA9IDA7XG4gICAgfWVsc2UgaWYobWUuby5wb3NpdGlvbi56ID49IG1lLnBvc1sxXSAmJiBtZS5vLnBvc2l0aW9uLnogPCBtZS5wb3NbMl0pe1xuICAgICAgbWUuZmxvb3IgPSAxO1xuICAgIH1lbHNle1xuICAgICAgbWUuZmxvb3IgPSAyO1xuICAgIH1cbiAgICBpZihtZS5vLnBvc2l0aW9uLnogPj0gbWUucG9zWzJdICsgMjAgfHwgbWUuby5wb3NpdGlvbi56IDw9IG1lLnBvc1swXSl7XG4gICAgICBtZS52ICo9IC0xO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmxvb3J7XG4gIGNvbnN0cnVjdG9yKHNpemUsIHBvc2l0aW9uLCBzY2VuZSl7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG4gIGluaXQoKXtcbiAgICB2YXIgbWUgPSB0aGlzO1xuICAgIHZhciBnZW8gPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeShtZS5zaXplLncsIG1lLnNpemUuaCwgMzIpO1xuICAgIHZhciBtYXQgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe2NvbG9yOiAweGZmZmZmZiwgc2lkZTogVEhSRUUuRG91YmxlU2lkZSwgdHJhbnNwYXJlbnQ6IHRydWUsICAgb3BhY2l0eTogICAwLjV9KTtcbiAgICB2YXIgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KTtcbiAgICB2YXIgZWRnZSA9IG5ldyBUSFJFRS5FZGdlc0hlbHBlcihtZXNoLCAweDAwMDAwMCk7XG4gICAgbWUubyA9IG1lc2g7XG4gICAgbWUuby5wb3NpdGlvbi5zZXQobWUucG9zaXRpb24ueCwgbWUucG9zaXRpb24ueSwgbWUucG9zaXRpb24ueik7XG4gICAgZWRnZS5tYXRlcmlhbC5saW5ld2lkdGggPSAxO1xuICAgIG1lLnNjZW5lLmFkZChtZXNoKTtcbiAgICBtZS5zY2VuZS5hZGQoZWRnZSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic3RhY2xle1xuICBjb25zdHJ1Y3RvcihzaXplLCBwb3NpdGlvbiwgc2NlbmUpe1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuICBpbml0KCl7XG4gICAgdmFyIG1lID0gdGhpcztcbiAgICB2YXIgZ2VvID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkobWUuc2l6ZS53LCBtZS5zaXplLmgsIDMyKTtcbiAgICB2YXIgbWF0ID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtjb2xvcjogMHhmZmZmZmYsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsIHRyYW5zcGFyZW50OiB0cnVlLCAgIG9wYWNpdHk6ICAgMC41fSk7XG4gICAgdmFyIG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdCk7XG4gICAgdmFyIGVkZ2UgPSBuZXcgVEhSRUUuRWRnZXNIZWxwZXIobWVzaCwgMHgwMDAwMDApO1xuICAgIG1lLm8gPSBtZXNoO1xuICAgIG1lLm8ucG9zaXRpb24uc2V0KG1lLnBvc2l0aW9uLngsIG1lLnBvc2l0aW9uLnksIG1lLnBvc2l0aW9uLnopO1xuICAgIGVkZ2UubWF0ZXJpYWwubGluZXdpZHRoID0gMTtcbiAgICBtZS5zY2VuZS5hZGQobWVzaCk7XG4gICAgbWUuc2NlbmUuYWRkKGVkZ2UpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQZXJzb257XG4gIGNvbnN0cnVjdG9yKGNvbG9yLCBwb3NpdGlvbiwgc3BlZWQsIHNjZW5lLCBvYnN0YWNsZSl7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvbG9yLmxlbmd0aCldO1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMub2JzdGFjbGUgPSBvYnN0YWNsZTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuICBpbml0KCl7XG4gICAgdmFyIG1lID0gdGhpcztcbiAgICB2YXIgZ2VvID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDUsIDMyLCAzMik7XG4gICAgdmFyIG1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7Y29sb3I6IG1lLmNvbG9yLCBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlfSk7XG4gICAgdmFyIG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdCk7XG4gICAgbWUubyA9IG1lc2g7XG4gICAgbWUuc2NlbmUuYWRkKG1lc2gpO1xuICB9XG4gIG1vdmUoKXtcbiAgICB2YXIgbWUgPSB0aGlzO1xuICAgIG1lLm8ucG9zaXRpb24ueCArPSBtZS5zcGVlZC54O1xuICAgIG1lLm8ucG9zaXRpb24ueSArPSBtZS5zcGVlZC55O1xuICAgIGlmKG1lLm8ucG9zaXRpb24ueCA+PSA1MDAgfHwgbWUuby5wb3NpdGlvbi54IDw9IC01MDApe1xuICAgICAgbWUuc3BlZWQueCAqPSAtMTtcbiAgICB9XG4gICAgaWYobWUuby5wb3NpdGlvbi55ID49IDI1MCB8fCBtZS5vLnBvc2l0aW9uLnkgPD0gLTI1MCl7XG4gICAgICBtZS5zcGVlZC55ICo9IC0xO1xuICAgIH1cbiAgICAvLyDooZ3nqoHliKTlrppcbiAgICBtZS50b3VjaCgpO1xuICB9XG4gIHRvdWNoKCl7XG4gICAgdmFyIG1lID0gdGhpcztcbiAgICBpZihtZS5vLnBvc2l0aW9uLnggPj0gbWUub2JzdGFjbGUuby5wb3NpdGlvbi54IC0gMjAgJiYgKG1lLm8ucG9zaXRpb24ueSA+PSBtZS5vYnN0YWNsZS5vLnBvc2l0aW9uLnkgLTIwICYmIG1lLm8ucG9zaXRpb24ueSA8PSBtZS5vYnN0YWNsZS5vLnBvc2l0aW9uLnkgKyAyMCkpe1xuICAgICAgbWUuc3BlZWQueCA9IDA7XG4gICAgICBtZS5zcGVlZC55ID0gMTtcbiAgICB9ZWxzZSBpZihtZS5vLnBvc2l0aW9uLnkgPj0gbWUub2JzdGFjbGUuby5wb3NpdGlvbi55IC0yMCAmJiAobWUuby5wb3NpdGlvbi54ID49IG1lLm9ic3RhY2xlLm8ucG9zaXRpb24ueCAtMjAgJiYgbWUuby5wb3NpdGlvbi54IDw9IG1lLm9ic3RhY2xlLm8ucG9zaXRpb24ueCArIDIwKSl7XG4gICAgICBtZS5zcGVlZC54ID0gMTtcbiAgICAgIG1lLnNwZWVkLnkgPSAwO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IEZsb29yIGZyb20gJy4vY2xhc3Mvdmlldy9GbG9vcidcbmltcG9ydCBPYnN0YWNsZSBmcm9tICcuL2NsYXNzL3ZpZXcvT2JzdGFjbGUnXG5pbXBvcnQgRWxldmF0b3IgZnJvbSAnLi9jbGFzcy92aWV3L0VsZXZhdG9yJ1xuaW1wb3J0IFBlcnNvbiBmcm9tICcuL2NsYXNzL3ZpZXcvUGVyc29uJ1xuXG4oZnVuY3Rpb24oKXtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBpbml0LCBmYWxzZSk7XG5cbiAgdmFyIHN0YXRzID0gbmV3IFN0YXRzKCk7XG4gIHN0YXRzLnNldE1vZGUoMCk7IC8vIDA6IGZwcywgMTogbXMsIDI6IG1iXG5cbiAgLy8gYWxpZ24gdG9wLWxlZnRcbiAgc3RhdHMuZG9tRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gIHN0YXRzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9ICcwcHgnO1xuICBzdGF0cy5kb21FbGVtZW50LnN0eWxlLnRvcCA9ICcwcHgnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHN0YXRzLmRvbUVsZW1lbnQpO1xuXG4gIHZhciBjdnMsXG4gICAgICBjYW1lcmEsXG4gICAgICB0cmFja2JhbGwsXG4gICAgICByZW5kZXJlcixcbiAgICAgIHNjZW5lLFxuICAgICAgZmxvb3JfcG9zID0gWy0xMDEwLCAtNTEwLCAtMTBdLFxuICAgICAgZmxvb3IgPSBbXSxcbiAgICAgIG9ic3RhY2xlLFxuICAgICAgZWxldmF0b3IgPSBbXSxcbiAgICAgIGVsZXZhdG9yX2NudCA9IDYsXG4gICAgICBwZW9wbGVfY250ID0gMzAwLFxuICAgICAgcGVvcGxlID0gW107XG5cbiAgZnVuY3Rpb24gc2V0R2woKXtcbiAgXHRjdnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmllbGQnKTtcbiAgXHQvLyBzY2VuZVxuICBcdHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gIFx0Ly8gY2FtZXJhXG4gIFx0dmFyIHdpZHRoID0gMTEwMDtcbiAgXHR2YXIgaGVpZ2h0ID0gMjAwMDtcbiAgXHR2YXIgZm92ID0gNjA7XG4gIFx0dmFyIGFzcGVjdCA9IHdpZHRoL2hlaWdodDtcbiAgXHR2YXIgbmVhciA9IDE7XG4gIFx0dmFyIGZhciA9IDEwMDAwO1xuICBcdGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYShmb3YsIGFzcGVjdCwgbmVhciwgZmFyKTtcbiAgXHRjYW1lcmEucG9zaXRpb24uc2V0KDAsIDAsIDUwKTtcblxuICBcdC8vIHRyYWNrYmFsbFxuICBcdHRyYWNrYmFsbCA9IG5ldyBUSFJFRS5UcmFja2JhbGxDb250cm9scyhjYW1lcmEpO1xuICBcdHRyYWNrYmFsbC5ub1JvdGF0ZSA9IGZhbHNlO1xuICBcdHRyYWNrYmFsbC5yb3RhdGVTcGVlZCA9IDEuMDtcbiAgXHR0cmFja2JhbGwubm9ab29tID0gZmFsc2U7XG4gIFx0dHJhY2tiYWxsLnpvb21TcGVlZCA9IDEuMDtcbiAgXHR0cmFja2JhbGwubm9QYW4gPSBmYWxzZTtcbiAgXHR0cmFja2JhbGwucGFuU3BlZWQgPSAxLjA7XG4gIFx0dHJhY2tiYWxsLnN0YXRpY01vdmluZyA9IHRydWU7XG4gIFx0dHJhY2tiYWxsLmR5bmFtaWNEYW1waW5nRmFjdG9yID0gMC4zO1xuXG4gIFx0Ly8gcmVuZGVyZXJcbiAgXHRyZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZikpO1xuICBcdGN2cy5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcblxuICBcdC8vIGxpZ2h0XG4gIFx0dmFyIGRpcmVjdGlvbmFsTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZik7XG4gIFx0ZGlyZWN0aW9uYWxMaWdodC5wb3NpdGlvbi5zZXQoMCwgMC43LCAwLjcpO1xuICBcdHNjZW5lLmFkZChkaXJlY3Rpb25hbExpZ2h0KTtcbiAgfVxuXG4gIC8vIGluaXRcbiAgZnVuY3Rpb24gaW5pdCgpe1xuICBcdC8vIFRocmVlLmpzIHNldHRpbmdcbiAgXHRzZXRHbCgpO1xuXG4gIFx0Ly8gVGhyZWUuanMgb2JqZWN0XG4gIFx0Zm9yKHZhciBpID0gMCwgY250ID0gZmxvb3JfcG9zLmxlbmd0aDsgaSA8IGNudDsgaSsrKXtcbiAgICAgIGZsb29yW2ldID0gbmV3IEZsb29yKHt3OiAxMDAwLCBoOiA1MDB9LCB7eDogMCwgeTogMCwgejogZmxvb3JfcG9zW2ldfSwgc2NlbmUpO1xuICBcdH1cbiAgXHRmb3IodmFyIGkgPSAwOyBpIDwgZWxldmF0b3JfY250OyBpKyspe1xuICAgICAgZWxldmF0b3JbaV0gPSBuZXcgRWxldmF0b3Ioe3c6IDYwLCBoOiA2MH0sIHt4OiAyMDAgKyBpKjYwLCB5OiAyMDAsIHo6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSotMTAwMCl9LCBzY2VuZSk7XG4gIFx0fVxuICAgIG9ic3RhY2xlID0gbmV3IE9ic3RhY2xlKHt3OiAzMCwgaDogMzB9LCB7eDogMTAwLCB5OiAwLCB6OiAtNX0sIHNjZW5lKTtcbiAgXHRmb3IodmFyIGkgPSAwOyBpIDwgcGVvcGxlX2NudDsgaSsrKXtcbiAgXHQgIHBlb3BsZVtpXSA9IG5ldyBQZXJzb24oWzB4ZmYwMDAwLDB4MDBmZjAwLDB4MDAwMGZmXSwge3g6IDAsIHk6MH0sIHt4OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNCktMiwgeTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjQpLTJ9LCBzY2VuZSwgb2JzdGFjbGUpO1xuICBcdH1cbiAgICBhbmltYXRlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBhbmltYXRlKCl7XG4gICAgc3RhdHMuYmVnaW4oKTtcbiAgXHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gIFx0dHJhY2tiYWxsLnVwZGF0ZSgpO1xuICBcdGZvcih2YXIgaSA9IDA7IGkgPCBwZW9wbGVfY250OyBpKyspe1xuICBcdCAgcGVvcGxlW2ldLm1vdmUoKTtcbiAgXHR9XG4gIFx0Zm9yKHZhciBpID0gMDsgaSA8IGVsZXZhdG9yX2NudDsgaSsrKXtcbiAgICAgIGVsZXZhdG9yW2ldLm1vdmUoKTtcbiAgICB9XG4gIFx0Y29uc29sZS5sb2coY2FtZXJhLnBvc2l0aW9uLnggKyAnOicgKyBjYW1lcmEucG9zaXRpb24ueSArICc6JyArIGNhbWVyYS5wb3NpdGlvbi56KTtcbiAgXHRyZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XG4gIFx0c3RhdHMuZW5kKCk7XG4gIH1cbn0pKCk7Il19
