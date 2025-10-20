import * as THREE from 'three';

// Define a GameCamera class that encapsulates an orthographic camera setup
class GameCamera {
  // Constructor takes the canvas width, height, and optionally a zoom distance 'd' (default = 70)
  constructor(width, height, d = 70) {
    // Calculate the aspect ratio (width divided by height)
    const aspect = width / height;

    // Create an OrthographicCamera with view volume adjusted by aspect and zoom factor 'd'
    // Parameters: left, right, top, bottom, near, far
    this.camera = new THREE.OrthographicCamera(
      -d * aspect, // left
      d * aspect,  // right
      d,           // top
      -d,          // bottom
      1,           // near clipping plane
      1000         // far clipping plane
    );

    // Set the position of the camera in 3D space
    this.camera.position.set(100, 100, 100); // x=100, y=100, z=100

    // Store the zoom factor 'd' for use in resizing
    this.d = d;
  }

  // Method to retrieve the camera object
  getCamera() {
    return this.camera;
  }

  // Method to resize the camera when the canvas size changes
  resize(width, height) {
    // Recalculate the aspect ratio
    const aspect = width / height;

    // Adjust the orthographic camera bounds based on the new aspect ratio and stored 'd'
    this.camera.left = -this.d * aspect;
    this.camera.right = this.d * aspect;
    this.camera.top = this.d;
    this.camera.bottom = -this.d;

    // After changing the projection parameters, the projection matrix must be updated
    this.camera.updateProjectionMatrix();
  }
}

// Export the GameCamera class as the default export of this module
export default GameCamera;
