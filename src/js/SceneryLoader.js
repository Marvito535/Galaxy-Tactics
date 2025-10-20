import ModelBase from './ModelBase.js'; // Import the ModelBase class, which handles loading and placing 3D models into the scene

// SceneryLoader function: iterates over all scenery objects and loads them into the scene
export default function SceneryLoader(Scenery, scene) {
  // Loop through each object defined in the Scenery array
  for (let i = 0; i < Scenery.length; i++) {
    // Destructure the object properties: 
    // - path: string path to the GLB/GLTF model file
    // - scale: array [x, y, z] to scale the model
    // - rotation: rotation value (usually around the Y axis)
    // - position: object with x and z coordinates for placement
    const { path, scale, rotation, position } = Scenery[i];

    // Create a new instance of ModelBase with the given parameters
    // - path: location of the 3D model file
    // - scale: scaling factors for each axis
    // - rotation: rotation around the Y axis
    // - position: position in the 3D world
    // - scene: the THREE.Scene object where the model will be added
    const figure = new ModelBase(path, scale, rotation, position, scene);

    // Call the loadModel method of ModelBase
    // This method will:
    // 1. Load the 3D model asynchronously using GLTFLoader
    // 2. Apply scale, rotation, and position
    // 3. Add the mesh or instanced mesh to the scene
    figure.loadModel();
  }
}

