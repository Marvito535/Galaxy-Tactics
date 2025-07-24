import * as THREE from 'three';                      // Import the entire THREE.js library as THREE
import GameCamera from './js/Camera.js';             // Import custom GameCamera class from local module
import CameraControls from './js/CameraControls.js'; // Import custom CameraControls class from local module
import Characters  from './js/data/Characters.js';          // Import custom Figures class to load 3D models datas
import Scenery from './js/data/Scenery.js'; 
import CharacterLoader from './js/CharacterLoader.js';     // Import custom Figures class to load 3D models
import setupLights  from './js/Lights.js';           // Import custom lights function
import loadTexture  from './js/TextureManager.js'; 
import SceneryLoader from './js/SceneryLoader.js';

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
const groundTexture = loadTexture();                      // Load ground texture image
const planeMaterial = new THREE.MeshStandardMaterial({    // Create a standard material using the ground texture
  map: groundTexture,                                     // Assign the loaded texture as the material's diffuse map
 // side: THREE.DoubleSide                                  // Render the plane material on both sides of the plane
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);  // Create a mesh combining geometry and material
plane.rotation.x = -Math.PI / 2;                            // Rotate the plane to lie flat horizontally (like a floor)
scene.add(plane);                                           // Add the plane mesh to the scene


// Spielfeld-Konfiguration
const gridWidth = 5;
const gridHeight = 5;
const tileSize = 15;

const offsetX = - (gridWidth * tileSize) / 2;
const offsetZ = - (gridHeight * tileSize) / 2;

const gridConfig = {
  tileSize,
  gridWidth,
  gridHeight,
  offsetX,
  offsetZ
};


// Load all models into the scene
const loader = new CharacterLoader(scene, gridConfig);
loader.loadFigures(Characters);
SceneryLoader(Scenery,scene);

//prepare geometry for lines
const linesGeometry = new THREE.BufferGeometry();
const vertices = [];


// Horizontal lines
for (let y = 0; y <= gridHeight; y++) {
  vertices.push(0, 0, y * tileSize);          // starting point (x=0)
  vertices.push(gridWidth * tileSize, 0, y * tileSize); // end point (x=gridWidth * tileSize)
}

// Vertical lines
for (let x = 0; x <= gridWidth; x++) {
  vertices.push(x * tileSize, 0, 0);          // starting point (z=0)
  vertices.push(x * tileSize, 0, gridHeight * tileSize); // end point (z=gridHeight * tileSize)
}


const verticesFloat32 = new Float32Array(vertices);
linesGeometry.setAttribute('position', new THREE.BufferAttribute(verticesFloat32, 3));

// Material für Linien (schwarz, leicht transparent)
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 });

// Linien-Objekt erstellen
const gridLines = new THREE.LineSegments(linesGeometry, lineMaterial);

// Füge das Raster zur Szene hinzu
scene.add(gridLines);

// Verschiebe Raster so, dass der Ursprung des Rasters nicht bei (0,0,0) liegt,
// sondern z.B. bei (-80, 0, -60), also mittig bezogen auf die Rastergröße und tileSize
gridLines.position.set(offsetX, 0.1, offsetZ);


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
