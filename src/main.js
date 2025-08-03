import * as THREE from 'three';                      // Import the entire THREE.js library as THREE
import GameCamera from './js/GameCamera.js';             // Import custom GameCamera class from local module
import CameraControls from './js/CameraControls.js'; // Import custom CameraControls class from local module
//import Characters  from './js/data/Characters.js';          // Import custom Figures class to load 3D models datas
import Scenery from './js/data/Scenery.js'; 
import setupLights  from './js/Lights.js';           // Import custom lights function
import loadTexture  from './js/TextureManager.js'; 
import SceneryLoader from './js/SceneryLoader.js';
import SceneGridOverlay from './js/SceneGridOverlay.js';
import ElephantSentinel from './js/ElephantSentinel.js';
import GalacticOverlord from './js/GalacticOverlord.js';
import DragonflyCavalry from './js/DragonflyCavalry.js';
import SheriffOfTheFuture from './js/SheriffOfTheFuture.js';


// Scene and Renderer setup
const scene = new THREE.Scene();                      // Create a new 3D scene
const bgTexture = new THREE.TextureLoader().load('../public/assets/background/Galaxy.png');  // Load background texture image
scene.background = bgTexture;                         // Set the scene's background to the loaded texture
 

const renderer = new THREE.WebGLRenderer({ antialias: true });  // Create WebGL renderer with antialiasing enabled
renderer.setPixelRatio(window.devicePixelRatio);      // Set pixel ratio for retina or high-DPI screens
renderer.setSize(window.innerWidth, window.innerHeight);  // Set renderer size to fill the entire browser window
document.body.appendChild(renderer.domElement);       // Append the renderer's canvas element to the webpage's body

// Camera and Controls setup
const cameraObj = new GameCamera(window.innerWidth, window.innerHeight);  // Instantiate GameCamera with current window size
const camera = cameraObj.getCamera();                   // Retrieve the internal camera object from GameCamera instance
const controls = new CameraControls(camera, renderer.domElement);  // Create camera controls attached to the renderer's canvas

// load Lighting setup
setupLights(scene);

// Ground plane with texture
const planeGeometry = new THREE.PlaneGeometry(160, 120);  // Create a rectangular plane geometry 160x120 units
const groundTexture = loadTexture();                      // Load ground texture image from TextureManager.js
const planeMaterial = new THREE.MeshStandardMaterial({    // Create a standard material using the ground texture
  map: groundTexture,                                     // Assign the loaded texture as the material's diffuse map
 // side: THREE.DoubleSide                                  // Render the plane material on both sides of the plane
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);  // Create a mesh combining geometry and material
plane.rotation.x = -Math.PI / 2;                            // Rotate the plane to lie flat horizontally (like a floor)
scene.add(plane);                                           // Add the plane mesh to the scene

const gridOverlay = new SceneGridOverlay(scene, 5, 5, 15);
const gridMap = gridOverlay.getGridMap(); // z. B. gridMap["B3"]
const configPart = gridOverlay.getGridConfig();
const gridConfig = {
  gridWidth: configPart.gridWidth,
  gridHeight: configPart.gridHeight,
  tileSize: configPart.tileSize,
  offsetX: configPart.offsetX,
  offsetZ: configPart.offsetZ,
  gridMap: gridMap
};
// Load all models into the scene
new ElephantSentinel(scene, gridConfig);
new GalacticOverlord(scene, gridConfig);
new DragonflyCavalry(scene, gridConfig);
new SheriffOfTheFuture(scene, gridConfig);
SceneryLoader(Scenery,scene);

// Animation loop to render the scene continuously
function animate() {
  requestAnimationFrame(animate);  // Schedule the animate function to be called before the next repaint
  controls.update();                // Update the camera controls (handle user input, inertia, etc.)
  renderer.render(scene, camera);  // Render the current scene from the perspective of the camera
}
animate();                         // Start the animation loop


// Handle browser window resizing
window.addEventListener('resize', () => {
  cameraObj.resize(window.innerWidth, window.innerHeight);  // Update camera projection on resize
  renderer.setSize(window.innerWidth, window.innerHeight);  // Resize the renderer output to match new window size
});