import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// Import the GLTFLoader from Three.js examples. This loader is used to load .glb/.gltf 3D model files.

import * as THREE from 'three';
// Import the entire Three.js library. Needed for vector math, meshes, Box3, etc.

class ModelBase {
  constructor(path, scale, rotationY, position, scene) {
    this.path = path;
    // The URL/path to the GLB/GLTF 3D model file.

    this.scale = scale;
    // The scale of the model as an array [x, y, z], e.g., [1,1,1] = original size.

    this.rotationY = rotationY;
    // Rotation around the Y axis (vertical axis). Models are often rotated this way to face the right direction.

    this.position = position;
    // The 2D/3D position where the model will be placed in the scene. Usually {x, z}, sometimes {x, y, z}.

    this.scene = scene;
    // Reference to the Three.js scene. Needed to add the loaded model to the scene.
  }


  loadModel(onLoadCallback) {
    const loader = new GLTFLoader();
    // Create a new GLTFLoader instance. Each ModelBase uses its own loader here.


    
        loader.load(
      this.path,
      (gltf) => {
        const model = gltf.scene;
        // gltf.scene contains the loaded 3D object hierarchy.
        // This is the root object of the loaded model.

        model.scale.set(...this.scale);
        // Apply the scale to the model. 
        // "...this.scale" spreads the array [x, y, z] into three arguments for set(x,y,z).
;
        model.rotation.y = this.rotationY;
        // Rotate the model around the Y axis. 
        // For example, Math.PI = 180° rotation.

        const box = new THREE.Box3().setFromObject(model);
        // Create a bounding box around the model using all its vertices.
        // Box3 computes min and max points in 3D space (x, y, z).
        // This is often done to know the model’s dimensions.

        const minY = box.min.y;
        // Get the minimum Y value of the model (lowest point). 
        // Why? Because GLB models often have arbitrary origins. 
        // We use minY to “place the model on the floor” instead of half-buried in the ground.

        model.position.set(this.position.x, -minY, this.position.z);
        // Place the model at the desired x and z.
        // Adjust the Y position by -minY to ensure it sits on the ground (Y=0).
        // This is a common trick to align models with the ground plane.


        if (onLoadCallback) onLoadCallback(model);
        // If the caller passed a callback, call it with the loaded model.
        // Useful if you want to do something with the model after it’s loaded, e.g., animate it.

        
        this.scene.add(model);
        // Finally, add the model to the scene so it will be rendered.

      },
      undefined,
      (error) => console.error('Modell konnte nicht geladen werden:', error)
      // If there’s an error during loading, print it to the console.
    );
  }
}



export default ModelBase;
// Export the class so it can be imported in other modules, like SceneryLoader.js

