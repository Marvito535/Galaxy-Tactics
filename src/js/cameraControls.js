// Import the OrbitControls module from Three.js
// This allows intuitive mouse controls for rotating, zooming, and panning the camera
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Define a class named CameraControls
class CameraControls {
  // Constructor gets called when a new instance is created
  // It expects a camera and a DOM element (usually the canvas) as parameters
  constructor(camera, domElement) {
    // Create a new OrbitControls object and assign it to this.controls
    // This enables user interaction with the camera (mouse or touch controls)
    this.controls = new OrbitControls(camera, domElement);

    // Enable the ability to rotate the camera (left mouse button drag)
    this.controls.enableRotate = true;

    // Enable zooming (with mouse wheel or pinch gesture)
    this.controls.enableZoom = true;

    // Enable panning (right mouse button drag or two-finger drag)
    this.controls.enablePan = true;

    // Set the speed of zooming (higher = faster zoom)
    this.controls.zoomSpeed = 1.2;

    // Set the speed of rotating the camera
    this.controls.rotateSpeed = 0.8;

    // Set the speed of panning (moving camera left/right/up/down)
    this.controls.panSpeed = 0.8;

    // Set the target the camera should look at
    // In this case, it's set to the origin (0, 0, 0)
    this.controls.target.set(0, 0, 0);

    // Update the controls to apply any changes
    this.controls.update();
  }

  // A method to update the controls manually (e.g. inside an animation loop)
  update() {
    this.controls.update();
  }
}

// Export the class so it can be imported in other files
export default CameraControls;
