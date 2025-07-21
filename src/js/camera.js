import * as THREE from 'three';

class GameCamera {
  constructor(width, height, d = 70) {
    const aspect = width / height;
    this.camera = new THREE.OrthographicCamera(
      -d * aspect,
      d * aspect,
      d,
      -d,
      1,
      1000
    );
    this.camera.position.set(100, 100, 100);
    this.camera.lookAt(0, 0, 0);
    this.d = d;
  }

  getCamera() {
    return this.camera;
  }

  resize(width, height) {
    const aspect = width / height;
    this.camera.left = -this.d * aspect;
    this.camera.right = this.d * aspect;
    this.camera.top = this.d;
    this.camera.bottom = -this.d;
    this.camera.updateProjectionMatrix();
  }
}

export default GameCamera;