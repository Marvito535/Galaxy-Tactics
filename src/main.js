import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import FigureModel from './js/figureModel.js';

const scene = new THREE.Scene();
const bgTexture = new THREE.TextureLoader().load('../public/assets/background/Sky.png');
scene.background = bgTexture;

// Kamera (Orthographic)
const aspect = window.innerWidth / window.innerHeight;
const d = 70;

const camera = new THREE.OrthographicCamera(
  -d * aspect,
  d * aspect,
  d,
  -d,
  1,
  1000
);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

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
controls.enableZoom = false; // Zoom deaktiviert, da wir eigenes Zoomverhalten haben

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
  { path: '../public/assets/figures/Elephant_Sentinel.glb', scale: [7, 7, 7], rotation: 0, position: { x: 20, z: -10 } },
  { path: '../public/assets/figures/Galactic_Overlord_Thr.glb', scale: [7, 7, 7], rotation: 0, position: { x: 40, z: -10 } },
  { path: '../public/assets/figures/Dragonfly_Cavalry.glb', scale: [7, 7, 7], rotation: 0, position: { x: 60, z: -10 } },
  { path: '../public/assets/figures/Sheriff_of_the_Future.glb', scale: [7, 7, 7], rotation: 0, position: { x: 0, z: -20 } },
  
  // Landschaftsobjekte
  { path: '../public/assets/scenery objects/Green_Peaks.glb', scale: [20, 20, 20], rotation: Math.PI * 1.75, position: { x: -15, z: -50 } },
  { path: '../public/assets/vegetation/Three_Trees.glb', scale: [15, 15, 15], rotation: Math.PI * 1.9, position: { x: -50, z: -50 } },
  { path: '../public/assets/scenery objects/Rock_Garden.glb', scale: [8, 8, 8], rotation: Math.PI * 0.5, position: { x: -75, z: 53 } },
  { path: '../public/assets/scenery objects/Rock_Garden.glb', scale: [8, 8, 8], rotation: Math.PI * 1.0, position: { x: 73, z: -55 } },
  { path: '../public/assets/vegetation/Tropical_Bloom.glb', scale: [8, 8, 8], rotation: Math.PI * 2.0, position: { x: 73, z: 53 } },
  { path: '../public/assets/scenery objects/Rock_Garden.glb', scale: [8, 8, 8], rotation: Math.PI * 1.0, position: { x: 73, z: -55 } },
  { path: '../public/assets/scenery objects/Waterfall_Serenity.glb', scale: [10, 10, 10], rotation: Math.PI * 0.5, position: { x: -70, z: -50 } },
  { path: '../public/assets/vegetation/Golden_Bloom_Fantasy.glb', scale: [7, 7, 7], rotation: Math.PI * 2.0, position: { x: 50, z: -55 } },
  { path: '../public/assets/vegetation/Golden_Bloom_Fantasy.glb', scale: [7, 7, 7], rotation: Math.PI * 2.0, position: { x: 30, z: -55 } },
  { path: '../public/assets/vegetation/Lush_Greenery.glb', scale: [3, 3, 3], rotation: Math.PI * 2.0, position: { x: -45, z: -45 } },
  { path: '../public/assets/vegetation/Lush_Greenery.glb', scale: [3, 3, 3], rotation: Math.PI * 2.0, position: { x: -50, z: -45 } },
  { path: '../public/assets/vegetation/Lush_Greenery.glb', scale: [3, 3, 3], rotation: Math.PI * 2.0, position: { x: -40, z: -55 } },
  { path: '../public/assets/vegetation/Lush_Greenery.glb', scale: [3, 3, 3], rotation: Math.PI * 2.0, position: { x: -40, z: -40 } },
  { path: '../public/assets/vegetation/Lush_Greenery.glb', scale: [3, 3, 3], rotation: Math.PI * 2.0, position: { x: -45, z: -40 } },
  { path: '../public/assets/vegetation/Lush_Greenery.glb', scale: [3, 3, 3], rotation: Math.PI * 2.0, position: { x: -55, z: -40 } },
  { path: '../public/assets/vegetation/Lush_Greenery.glb', scale: [3, 3, 3], rotation: Math.PI * 2.0, position: { x: -35, z: -40 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 1.5, position: { x: -75, z: 0 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 1.5, position: { x: -75, z: 20 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 1.5, position: { x: -75, z: -20 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 1.5, position: { x: -75, z: -24 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 1.5, position: { x: -75, z: 10 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 1.5, position: { x: -75, z: 30 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 1.5, position: { x: 75, z: 0 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 1.5, position: { x: 75, z: 20 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 1.5, position: { x: 75, z: -20 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 1.5, position: { x: 75, z: -24 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 1.5, position: { x: 75, z: 10 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 1.5, position: { x: 75, z: 30 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 2.0, position: { x: 22, z: -55 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 2.0, position: { x: 30, z: -55 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 2.0, position: { x: 40, z: -55 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 2.0, position: { x: 50, z: -55 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 2.0, position: { x: 22, z: 55 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 2.0, position: { x: 30, z: 55 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 2.0, position: { x: 40, z: 55 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 2.0, position: { x: 50, z: 55 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 2.0, position: { x: 10, z: 55 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 2.0, position: { x: 0, z: 55 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 2.0, position: { x: -10, z: 55 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 2.0, position: { x: -20, z: 55 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 2.0, position: { x: -30, z: 55 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 2.0, position: { x: -40, z: 55 } },
  { path: '../public/assets/vegetation/Waves_of_Green.glb', scale: [20, 10, 5], rotation: Math.PI * 2.0, position: { x: -50, z: 55 } },
  { path: '../public/assets/vegetation/Lush_Canopy.glb', scale: [10, 30, 10], rotation: Math.PI * 1.0, position: { x: 0, z: 53 } },

  // Mammutbäume 
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 30, 10], rotation: Math.PI * 2, position: { x: -70, z: 20 } },
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 30, 10], rotation: Math.PI * 2, position: { x: -70, z: -10 } },
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 30, 10], rotation: Math.PI * 2, position: { x: -70, z: 5 } },
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 30, 10], rotation: Math.PI * 2, position: { x: -70, z: 35 } },
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 20, 10], rotation: Math.PI * 2, position: { x: -65, z: -30 } },
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 15, 10], rotation: Math.PI * 2, position: { x: 10, z: -40 } }
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

renderer.domElement.addEventListener('wheel', function(event) {
  event.preventDefault();

  const zoomSpeed = 0.1;

  // 1. Mausposition normalisiert [-1,1]
  const rect = renderer.domElement.getBoundingClientRect();
  const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  // 2. Mausposition in Weltkoordinaten vor Zoom
  const mouseWorldPosBefore = new THREE.Vector3(mouseX, mouseY, 0.5);
  mouseWorldPosBefore.unproject(camera);

  // 3. Zoom anpassen
  if (event.deltaY < 0) {
    camera.zoom = Math.min(camera.zoom + zoomSpeed, 5);
  } else {
    camera.zoom = Math.max(camera.zoom - zoomSpeed, 0.5);
  }
  camera.updateProjectionMatrix();

  // 4. Mausposition in Weltkoordinaten nach Zoom
  const mouseWorldPosAfter = new THREE.Vector3(mouseX, mouseY, 0.5);
  mouseWorldPosAfter.unproject(camera);

  // 5. Differenz berechnen
  const diff = new THREE.Vector3().subVectors(mouseWorldPosBefore, mouseWorldPosAfter);

  // 6. Kamera position verschieben, um den Punkt unter dem Mauszeiger zu halten
  camera.position.add(diff);

});



// Fenstergröße anpassen
window.addEventListener('resize', () => {
  const aspect = window.innerWidth / window.innerHeight;
  camera.left = -d * aspect;
  camera.right = d * aspect;
  camera.top = d;
  camera.bottom = -d;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});