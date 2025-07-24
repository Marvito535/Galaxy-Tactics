// ./js/Lights.js
import * as THREE from 'three';

 export default function setupLights(scene) {
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(10, 20, 10);
  scene.add(light);
}

