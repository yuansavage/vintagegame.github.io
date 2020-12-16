let scene, camera, renderer, light;
let donuts = [];
let speed = 0.05;
let cameraControl;

let randomRange = function(from , to){
  let x= Math.random() * (to-from);
  return x + from;
}
let createDonut = function(){
  let geometry = new THREE.TorusGeometry(3, 2, 8, 50);
  let material = new THREE.MeshMatcapMaterial({
    color: Math.random()*0xffffff
  });
  
  let d = new THREE.Mesh(geometry,material);
  d.position.x = randomRange(-15,15);
  d.position.z = randomRange(-15,15);
  d.position.y = 15;
  scene.add(d);
  donuts.push(d);
}

let init = function(){
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x42e9f5);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,100);
  camera.position.z=50;
  
  cameraControl = new THREE.OrbitControls(camera,renderer.domElement);
}

init();

let render = function(){
  let x = Math.random(0,1);
  if(x<0.1)
    createDonut();
  donuts.forEach(d=>d.position.y-=speed);
  
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

$(".pushbtn").click(function(){
    donuts.forEach(d=>d.position.y+=1);
});