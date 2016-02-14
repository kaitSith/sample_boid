export default class Person{
  constructor(color, position, speed, scene, obstacle){
    this.color = color[Math.floor(Math.random() * color.length)];
    this.position = position;
    this.speed = speed;
    this.scene = scene;
    this.obstacle = obstacle;
    this.init();
  }
  init(){
    var me = this;
    var geo = new THREE.SphereGeometry(5, 32, 32);
    var mat = new THREE.MeshBasicMaterial({color: me.color, side: THREE.DoubleSide});
    var mesh = new THREE.Mesh(geo, mat);
    me.o = mesh;
    me.scene.add(mesh);
  }
  move(){
    var me = this;
    me.o.position.x += me.speed.x;
    me.o.position.y += me.speed.y;
    if(me.o.position.x >= 500 || me.o.position.x <= -500){
      me.speed.x *= -1;
    }
    if(me.o.position.y >= 250 || me.o.position.y <= -250){
      me.speed.y *= -1;
    }
    // 衝突判定
    me.touch();
  }
  touch(){
    var me = this;
    if(me.o.position.x >= me.obstacle.o.position.x - 20 && (me.o.position.y >= me.obstacle.o.position.y -20 && me.o.position.y <= me.obstacle.o.position.y + 20)){
      me.speed.x = 0;
      me.speed.y = 1;
    }else if(me.o.position.y >= me.obstacle.o.position.y -20 && (me.o.position.x >= me.obstacle.o.position.x -20 && me.o.position.x <= me.obstacle.o.position.x + 20)){
      me.speed.x = 1;
      me.speed.y = 0;
    }
  }
}
