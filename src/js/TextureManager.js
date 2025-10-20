// ./js/textureManager.js
import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texturePath = '../public/assets/background/DschungelbodenZwei.png';

export default function loadTexture() {
  return loader.load(texturePath);
}

