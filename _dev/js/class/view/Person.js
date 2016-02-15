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
    // ランダムウォーク
    var type = Math.floor(Math.random()*8)
    if(type === 0 || type === 3 || type === 6){
      me.o.position.x -= me.speed.x * me.touchWall();
    }
    if(type === 2 || type === 5 || type === 8){
      me.o.position.x += me.speed.x * me.touchWall();
    }
    if(type === 0 || type === 1 || type === 2){
      me.o.position.y += me.speed.y * me.touchWall();
    }
    if(type === 6 || type === 7 || type === 8){
      me.o.position.y -= me.speed.y * me.touchWall();
    }
    // 衝突判定
    me.touch();
  }
  touchWall(){
    var me = this;
    var x = me.o.position.x;
    var y = me.o.position.y;
    var vx = me.speed.x;
    var vy = me.speed.y;
    var dir = 1;
    if((x + vx) >= 500 || (x - vx) <= -500){
      dir *= -1;
    }
    if((y + vy) >= 250 || (y - vy) <= -250){
      dir *= -1;
    }
    return dir;
  }
  touch(){
    var me = this;
    // 
    for(var i = 0, cnt = me.obstacle.length; i < cnt; i++){
      if(me.o.position.x >= me.obstacle[i].o.position.x - 20 && (me.o.position.y >= me.obstacle[i].o.position.y -20 && me.o.position.y <= me.obstacle[i].o.position.y + 20)){
        me.speed.x = 0;
        me.speed.y = 1;
      }else if(me.o.position.y >= me.obstacle[i].o.position.y -20 && (me.o.position.x >= me.obstacle[i].o.position.x -20 && me.o.position.x <= me.obstacle[i].o.position.x + 20)){
        me.speed.x = 1;
        me.speed.y = 0;
      }      
    }
  }
}
