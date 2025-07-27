import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

class ModelBase {
  constructor(path, scale, rotationY, position, scene) {
    this.path = path;
    this.scale = scale;
    this.rotationY = rotationY;
    this.position = position;
    this.scene = scene;
  }

  loadModel(onLoadCallback) {
    const loader = new GLTFLoader();

    
    loader.load(
      this.path,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(...this.scale);
        model.rotation.y = this.rotationY;

        const box = new THREE.Box3().setFromObject(model);
        const minY = box.min.y;
        model.position.set(this.position.x, -minY, this.position.z);

        if (onLoadCallback) onLoadCallback(model);
        
        this.scene.add(model);
      },
      undefined,
      (error) => console.error('Modell konnte nicht geladen werden:', error)
    );
  }
}


export default ModelBase;
