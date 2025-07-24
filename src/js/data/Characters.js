

// Define an array of figure and scenery objects to load
const Characters = [
  // Characters with their model paths, scale, rotation, and position on the scene
  { path: '../public/assets/figures/Elephant_Sentinel.glb', scale: [7, 7, 7], rotation: Math.PI * 0, tile: { x: 4, z: 3 } },
  { path: '../public/assets/figures/Galactic_Overlord_Thr.glb', scale: [7, 7, 7], rotation: Math.PI * 1.5, tile: { x: 4, z: 2 } },
  { path: '../public/assets/figures/Dragonfly_Cavalry.glb', scale: [7, 7, 7], rotation: Math.PI * 1.5, tile: { x: 4, z: 4 } },
  { path: '../public/assets/figures/Sheriff_of_the_Future.glb', scale: [7, 7, 7], rotation: Math.PI * 1.4, tile: { x: 4, z: 0 } }
];

export default Characters;