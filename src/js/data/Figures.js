

// Define an array of figure and scenery objects to load
const Figures = [
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

export default Figures;