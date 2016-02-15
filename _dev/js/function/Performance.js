export function Performance(type){
  var stats = new Stats();
  stats.setMode(type); // 0: fps, 1: ms, 2: mb
  // align top-left
  stats.domElement.style.position = 'fixed';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);

  return stats;
}