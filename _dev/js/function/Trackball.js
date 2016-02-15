export function Trackball(camera){
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