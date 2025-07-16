import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import FigureModel from './js/figureModel.js';

const isoAngle = Math.PI / 2;
const scene = new THREE.Scene();

// Skybox laden
const loader = new THREE.CubeTextureLoader();
const skyboxTexture = loader.load([
  '../public/assets/background/Tropicwalls.png', // right
  '../public/assets/background/Tropicwalls.png', // left
  '../public/assets/background/Sky.png', // top
  '../public/assets/background/ground2.jpeg', // bottom
  '../public/assets/background/Tropicwalls.png', // front
  '../public/assets/background/Tropicwalls.png'  // back
]);
scene.background = skyboxTexture;

// Kamera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(
  Math.cos(isoAngle) * 45,
  80,
  Math.sin(isoAngle) * 45
);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableRotate = false;
controls.enablePan = false;
controls.minDistance = 10;
controls.maxDistance = 200;
controls.maxPolarAngle = Math.PI / 2;
controls.target.set(0, 0, 0);
controls.update();

// Licht
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(10, 20, 10);
scene.add(light);

// Spielfeld mit Textur
const planeGeometry = new THREE.PlaneGeometry(160, 120);
const groundTexture = new THREE.TextureLoader().load('../public/assets/background/DschungelbodenZwei.png');
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(1, 1);

const planeMaterial = new THREE.MeshStandardMaterial({
  map: groundTexture,
  side: THREE.DoubleSide
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);


// Figuren definieren
const figures = [
  // Figuren
  { path: '../public/assets/figures/Elephant_Sentinel.glb', scale: [5, 5, 5], rotation: 0, position: { x: 30, z: -10 } },
  { path: '../public/assets/figures/Galactic_Overlord_Thr.glb', scale: [5, 5, 5], rotation: 0, position: { x: 40, z: -10 } },
  { path: '../public/assets/figures/Dragonfly_Cavalry.glb', scale: [5, 5, 5], rotation: 0, position: { x: 50, z: -10 } },
  { path: '../public/assets/figures/Sheriff_of_the_Future.glb', scale: [5, 5, 5], rotation: 0, position: { x: 50, z: -20 } },
  
  // Landschaftsobjekte
  { path: '../public/assets/scenery objects/Green_Peaks.glb', scale: [30, 30, 30], rotation: Math.PI * 1.75, position: { x: 50, z: -56 } },
  { path: '../public/assets/vegetation/Three_Trees.glb', scale: [15, 15, 15], rotation: Math.PI * 1.9, position: { x: -50, z: -50 } },
  { path: '../public/assets/scenery objects/Ancient_Terrace_Villa.glb', scale: [22, 22, 22], rotation: Math.PI * 2, position: { x: 25, z: -45 } },
  { path: '../public/assets/vegetation/Verdant_Fern.glb', scale: [3, 3, 3], rotation: Math.PI * 2, position: { x: 5, z: 0 } },
  { path: '../public/assets/scenery objects/Waterfall_Serenity.glb', scale: [10, 10, 10], rotation: Math.PI * 0.5, position: { x: -70, z: -50 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 5, 5], rotation: Math.PI * 2, position: { x: -15, z: 0 } },
  
  // Mammutbäume 
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 30, 10], rotation: Math.PI * 2, position: { x: 70, z: 20 } },
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 30, 10], rotation: Math.PI * 2, position: { x: 70, z: -25 } },
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 30, 10], rotation: Math.PI * 2, position: { x: 70, z: 5 } },
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 30, 10], rotation: Math.PI * 2, position: { x: 70, z: -10 } },
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 20, 10], rotation: Math.PI * 2, position: { x: -65, z: -30 } }
];

for (let i = 0; i < figures.length; i++) {
  const fig = figures[i];
  const figure = new FigureModel(
    fig.path,
    fig.scale,
    fig.rotation,
    fig.position,
    scene
  );
  figure.loadModel();
}


// Animations-Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
