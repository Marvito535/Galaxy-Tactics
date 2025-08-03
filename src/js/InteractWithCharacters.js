import * as THREE from 'three';  

// Class that handles selecting and raising a character when clicking on it
export class RaiseCharacter {
    constructor(renderer, camera, scene) {
        // Store references to the renderer, camera, and scene
        this.renderer = renderer;
        this.camera = camera;
        this.scene = scene;

        // Create a raycaster used for detecting objects under the mouse
        this.raycaster = new THREE.Raycaster();

        // Create a vector to store the mouse position in normalized device coordinates
        this.mouse = new THREE.Vector2();

        // Track which character (if any) is currently selected
        this.selectedFigure = null;
        this.hoveredFigure = null; // for hover state

        // Bind the onMouseDown method to the class context (`this`)
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);

        // Add an event listener for mouse/pointer down events on the window
        window.addEventListener('pointerdown', this.onMouseDown);
        window.addEventListener('pointermove', this.onPointerMove);
    }

    // Method to get the object that the mouse is currently hovering over (intersecting)
    getIntersectedObject(event, targets) {
        // Get the size and position of the renderer's canvas in the browser
        const rect = this.renderer.domElement.getBoundingClientRect();

        // Convert the mouse's x and y screen coordinates into normalized device coordinates
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Set up the raycaster from the camera and the mouse coordinates
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Find intersections between the ray and the target objects (including all children)
        const intersects = this.raycaster.intersectObjects(targets, true);

        // If any objects were intersected, return the first (closest) one
        if (intersects.length > 0) {
            return intersects[0];
        } else {
            // Otherwise, return null
            return null;
        }
    }

    
    onPointerMove(event) {
  // Get the object under the mouse pointer by raycasting through all scene children
  const intersect = this.getIntersectedObject(event, this.scene.children);

  if (intersect) {
    // Get the actual object that was intersected
    const object = intersect.object;

    // Check if the object or its parent is marked as a character
    const isCharacter = object.userData.isCharacter || object.parent?.userData.isCharacter;

    if (isCharacter) {
      // Get the character object (either the object itself or its parent)
      const character = object.userData.isCharacter ? object : object.parent;

      // If another character was previously highlighted and it's not the same one, remove its highlight
      if (this.hoveredFigure && this.hoveredFigure !== character) {
        this.resetHighlight(this.hoveredFigure); // Remove previous highlight
        this.hoveredFigure = null;               // Clear hovered reference
      }

      // If the current character is not yet highlighted, apply highlight
      if (this.hoveredFigure !== character) {
        this.setHighlight(character);           // Apply highlight to character
        this.hoveredFigure = character;         // Remember which character is currently hovered
      }

      return; // Exit early since we handled highlighting for a character
    }
  }

  // If the mouse is not over any character, remove any existing highlight
  if (this.hoveredFigure) {
    this.resetHighlight(this.hoveredFigure);   // Reset visual highlight
    this.hoveredFigure = null;                 // Clear hovered character reference
  }
}

setHighlight(character) {
  // If the character has a material
  if (character.material) {
    // Store the original emissive color (if any), so we can restore it later
    character.userData.originalEmissive = character.material.emissive ? character.material.emissive.clone() : null;

    // If the material supports emissive color, set it to red as a highlight effect
    if (character.material.emissive) {
      character.material.emissive.set(0xffffff); // You can replace 0xff0000 with 0xffffff for white
    }
  }
}

resetHighlight(character) {
  // If the character has a material and an original emissive color was saved
  if (character.material && character.userData.originalEmissive) {
    // Restore the original emissive color
    character.material.emissive.copy(character.userData.originalEmissive);
  }
}


    // This method is called whenever the mouse is clicked
    onMouseDown(event) {
        // Check if the click intersects with any object in the scene
        const intersect = this.getIntersectedObject(event, this.scene.children);

        // If no figure is currently selected
        if (this.selectedFigure === null) {
            if (intersect) {
                const object = intersect.object;

                // Check if the clicked object or its parent is marked as a character
                const isCharacter = object.userData.isCharacter || object.parent?.userData.isCharacter;

                if (isCharacter) {
                    // Get the actual character object (could be the object itself or its parent)
                    const character = object.userData.isCharacter ? object : object.parent;

                    // If the character’s original Y position is not yet stored, store it
                    if (character.userData.originalY === undefined) {
                        character.userData.originalY = character.position.y;
                    }

                    // Raise the character by increasing its Y position
                    character.position.y = character.userData.originalY + 1;

                    // Mark this figure as currently selected
                   // Verzögert auswählen, damit MoveCharacter.onMouseDown() noch nicht darauf reagiert

                    setTimeout(() => {
                    character.position.y = character.userData.originalY + 1;
                    this.selectedFigure = character;
                    console.log('Raised character:', character.name || character.id);
                     }, 0);
                    return;
                }
            }
        } else {
            // If a figure is already selected, lower it back to its original height
            this.selectedFigure.position.y = this.selectedFigure.userData.originalY;
            console.log('Moved character forward and lowered:', this.selectedFigure.name || this.selectedFigure.id);

            // Clear the selected figure
            this.selectedFigure = null;
        }
    }
}



