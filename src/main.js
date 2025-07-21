import * as THREE from 'three';                      // Import the entire THREE.js library as THREE
import GameCamera from './js/camera.js';             // Import custom GameCamera class from local module
import CameraControls from './js/cameraControls.js'; // Import custom CameraControls class from local module
import FigureModel from './js/figureModel.js';       // Import custom FigureModel class to load 3D models

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

// Lighting setup
const light = new THREE.DirectionalLight(0xffffff, 2);  // Create a white directional light with intensity 2
light.position.set(10, 20, 10);                          // Position the light at coordinates (10, 20, 10)
scene.add(light);                                        // Add the light to the scene

// Ground plane with texture
const planeGeometry = new THREE.PlaneGeometry(160, 120);  // Create a rectangular plane geometry 160x120 units
const groundTexture = new THREE.TextureLoader().load('../public/assets/background/DschungelbodenZwei.png');  // Load ground texture image

const planeMaterial = new THREE.MeshStandardMaterial({    // Create a standard material using the ground texture
  map: groundTexture,                                     // Assign the loaded texture as the material's diffuse map
 // side: THREE.DoubleSide                                  // Render the plane material on both sides of the plane
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);  // Create a mesh combining geometry and material
plane.rotation.x = -Math.PI / 2;                            // Rotate the plane to lie flat horizontally (like a floor)
scene.add(plane);                                           // Add the plane mesh to the scene

// Define an array of figure and scenery objects to load
const figures = [
  // Characters with their model paths, scale, rotation, and position on the scene
  { path: '../public/assets/figures/Elephant_Sentinel.glb', scale: [7, 7, 7], rotation: 0, position: { x: 20, z: -10 } },
  { path: '../public/assets/figures/Galactic_Overlord_Thr.glb', scale: [7, 7, 7], rotation: 0, position: { x: 40, z: -10 } },
  { path: '../public/assets/figures/Dragonfly_Cavalry.glb', scale: [7, 7, 7], rotation: 0, position: { x: 60, z: -10 } },
  { path: '../public/assets/figures/Sheriff_of_the_Future.glb', scale: [7, 7, 7], rotation: 0, position: { x: 0, z: -20 } },

  // Landscape objects with their respective properties
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

  // Redwood trees
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 30, 10], rotation: Math.PI * 2, position: { x: -70, z: 20 } },
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 30, 10], rotation: Math.PI * 2, position: { x: -70, z: -10 } },
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 30, 10], rotation: Math.PI * 2, position: { x: -70, z: 5 } },
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 30, 10], rotation: Math.PI * 2, position: { x: -70, z: 35 } },
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 20, 10], rotation: Math.PI * 2, position: { x: -65, z: -30 } },
  { path: '../public/assets/vegetation/Majestic_Redwood.glb', scale: [10, 15, 10], rotation: Math.PI * 2, position: { x: 10, z: -40 } }
];

// Load all models into the scene
for (const fig of figures) {
  const figure = new FigureModel(
    fig.path,      // path to the model file
    fig.scale,     // scale vector [x, y, z]
    fig.rotation,  // rotation in radians
    fig.position,  // position object with x and z coordinates
    scene          // reference to the scene to add the loaded model to
  );
  figure.loadModel();  // Trigger loading of the model asynchronously
}

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
