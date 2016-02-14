export default class Elevator{
  constructor(size, position, scene){
    this.size = size;
    this.position = position;
    this.pos = [-1010, -510, -10];
    this.floor = 0; // 0: 1f, 1: 2f, 2: 3f
    this.v = 10;
    this.scene = scene;
    this.init();
  }
  init(){
    var me = this;
    var geo = new THREE.BoxGeometry(me.size.w, me.size.h, 32);
    var mat = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, transparent: true,   opacity:   0.5});
    var mesh = new THREE.Mesh(geo, mat);
    var edge = new THREE.EdgesHelper(mesh, 0x000000);
    me.o = mesh;
    me.o.position.set(me.position.x, me.position.y, me.position.z);
    edge.material.linewidth = 1;
    me.scene.add(mesh);
    me.scene.add(edge);
  }
  move(){
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
}
