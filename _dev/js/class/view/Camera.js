export default class Camera{
  constructor(size, position){
    this.size = size;
    this.position = position;
    var fov = 60;
    var aspect = this.size.w/this.size.h;
    var near = 1;
    var far = 10000;
    var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(this.position.x, this.position.y, this.position.z);
    return camera;
  }
}