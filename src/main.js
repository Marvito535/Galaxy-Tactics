import * as THREE from 'three';                      // Import the entire THREE.js library as THREE
import GameCamera from './js/GameCamera.js';             // Import custom GameCamera class from local module
import CameraControls from './js/CameraControls.js'; // Import custom CameraControls class from local module
import Scenery from './js/data/Scenery.js'; 
import setupLights  from './js/Lights.js';           // Import custom lights function
import loadTexture  from './js/TextureManager.js'; 
import SceneryLoader from './js/SceneryLoader.js';
import SceneGridOverlay from './js/SceneGridOverlay.js';
import ElephantSentinel from './js/ElephantSentinel.js';
import GalacticOverlord from './js/GalacticOverlord.js';
import DragonflyCavalry from './js/DragonflyCavalry.js';
import SheriffOfTheFuture from './js/SheriffOfTheFuture.js';
import InteractWithSheriff from './js/InteractWithSheriff.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'

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

const gridOverlay = new SceneGridOverlay(scene, 5, 5, 15); // create a new grid overlay in the scene with width=5, height=5, tileSize=15
const gridMap = gridOverlay.getGridMap(); // retrieve the map of grid cells (e.g. gridMap["B3"] gives you a specific tile)
const configPart = gridOverlay.getGridConfig(); // get the configuration details of the grid (width, height, tile size, offsets)
const gridConfig = {                           // build a new object combining grid settings and the grid map
  gridWidth: configPart.gridWidth,             // number of tiles along the x-axis
  gridHeight: configPart.gridHeight,           // number of tiles along the z-axis
  tileSize: configPart.tileSize,               // size of each individual tile
  offsetX: configPart.offsetX,                 // starting position of the grid on the x-axis
  offsetZ: configPart.offsetZ,                 // starting position of the grid on the z-axis
  gridMap: gridMap                             // reference to all grid cells (map of tile IDs to tile objects)
};

// Load all models into the scene
new ElephantSentinel(scene, gridConfig);
new GalacticOverlord(scene, gridConfig);
new DragonflyCavalry(scene, gridConfig);
new SheriffOfTheFuture(scene, gridConfig);
SceneryLoader(Scenery,scene);

const composer = new EffectComposer(renderer); // create an EffectComposer that will manage post-processing effects using the renderer
const renderPass = new RenderPass(scene, camera); // create a basic render pass for the scene and camera (draws the scene normally)
composer.addPass(renderPass); // add the render pass to the composer so it will render the scene first

const outlinePass = new OutlinePass(                // create an OutlinePass to add an outline effect to objects
  new THREE.Vector2(window.innerWidth, window.innerHeight), // set the size of the outline pass to match the window
  scene,                                              // pass the scene to the outline effect
  camera                                              // pass the camera to the outline effect
);

outlinePass.edgeStrength = 3.0;          // control how strong the outline appears (thicker or more visible)
outlinePass.edgeGlow = 0.5;              // control the glow intensity around the outline
outlinePass.edgeThickness = 1.0;         // control the thickness of the outline lines
outlinePass.visibleEdgeColor.set('#ffffff'); // set the color of the visible edges (white)
outlinePass.hiddenEdgeColor.set('#000000');  // set the color of edges hidden behind objects (black)

composer.addPass(outlinePass); // add the outline pass to the composer so it will be applied after the scene is rendered

// Initialize sheriff interaction
const sheriffInteraction = new InteractWithSheriff(scene, outlinePass, camera, composer);

// Animation loop to render the scene continuously
function animate() {
  requestAnimationFrame(animate);  // Schedule the animate function to be called before the next repaint
  controls.update();                // Update the camera controls (handle user input, inertia, etc.)
  sheriffInteraction.update();      // nur Sheriff-Logik
  composer.render();           // Rendert alles inkl. Outline
}
animate();                         // Start the animation loop

// Handle browser window resizing
window.addEventListener('resize', () => {
  cameraObj.resize(window.innerWidth, window.innerHeight);  // Update camera projection on resize
  renderer.setSize(window.innerWidth, window.innerHeight);  // Resize the renderer output to match new window size
  composer.setSize(window.innerWidth, window.innerHeight);  // Also resize the composer
});