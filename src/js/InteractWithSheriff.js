import * as THREE from 'three';

// Class that handles selecting and raising a character when hovering over it
export default class InteractWithSheriff {
  constructor(scene, outlinePass, camera, composer) {
    // Reference to the main 3D scene
    this.scene = scene;
    // Reference to the outline effect pass for highlighting
    this.outlinePass = outlinePass;
    // Reference to the camera for raycasting
    this.camera = camera;
    // Reference to the effect composer for post-processing
    this.composer = composer;
    
    // Store the currently hovered object
    this.hoveredObject = null;

    // Create a raycaster for detecting mouse movements on 3D objects
    this.raycaster = new THREE.Raycaster();
    // Create a 2D vector to store mouse coordinates
    this.mouse = new THREE.Vector2();

    // Add mouse move event listener to the window
    window.addEventListener('mousemove', (event) => this.onMouseMove(event));
  }

  onMouseMove(event) {
    // Convert mouse coordinates to normalized device coordinates (-1 to +1)
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with current mouse position and camera
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Get all objects in the scene recursively to find the sheriff
    const allObjects = [];
    this.scene.traverse(function(object) {
      allObjects.push(object);
    });
    
    // Check for intersections between the ray and all scene objects
    const intersects = this.raycaster.intersectObjects(allObjects, true);

    // Check if there was an intersection with any object that has "Sheriff" in its name
    let sheriffRoot = null;
    
    if (intersects.length > 0) {
      // Traverse up the parent chain to find the root sheriff object
      let currentObject = intersects[0].object;
      
      while (currentObject) {
      if (currentObject.name && currentObject.name === "SheriffOfTheFuture") {
      sheriffRoot = currentObject;
       break;
    }
  currentObject = currentObject.parent;
}

    }

    // If we found the sheriff and we're not already hovering over it
  if (sheriffRoot) {
  if (this.hoveredObject !== sheriffRoot) {
    this.hoveredObject = sheriffRoot;
    // Alle Meshes des Sheriffs sammeln
    const meshes = [];
    sheriffRoot.traverse(obj => {
      if (obj.isMesh) meshes.push(obj);
    });
    this.outlinePass.selectedObjects = meshes;
  }
  else {
    if (this.hoveredObject !== null) {
      this.hoveredObject = null;
      this.outlinePass.selectedObjects = [];
    }
  }
}

console.log("Hover Intersections:", intersects.map(i => i.object.name));
console.log("SheriffRoot:", sheriffRoot ? sheriffRoot.name : "none");

}

  update() {
    // Only logical updates, no rendering calls
    // (This method is typically called every frame)
  }
}