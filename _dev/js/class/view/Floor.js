export default class Floor{
  constructor(size, position, scene){
    this.size = size;
    this.position = position;
    this.scene = scene;
    this.init();
  }
  init(){
    var me = this;
    var geo = new THREE.PlaneGeometry(me.size.w, me.size.h, 32);
    var mat = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, transparent: true,   opacity:   0.5});
    var mesh = new THREE.Mesh(geo, mat);
    var edge = new THREE.EdgesHelper(mesh, 0x000000);
    me.o = mesh;
    me.o.position.set(me.position.x, me.position.y, me.position.z);
    edge.material.linewidth = 1;
    me.scene.add(mesh);
    me.scene.add(edge);
  }
}
