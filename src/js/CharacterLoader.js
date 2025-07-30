import ModelBase from './ModelBase.js';

/**
 * This function marks an object and all its children with a user-defined property.
 * It's used to tag a 3D model and its parts as a "character" so it can be recognized elsewhere.
 */
function setUserDataIsCharacter(object) {
  // Set a custom property on the object to flag it as a character
  object.userData.isCharacter = true;

  // Recursively do the same for all child objects
  for (let i = 0; i < object.children.length; i++) {
    setUserDataIsCharacter(object.children[i]);
  }
}

/**
 * Class responsible for loading and placing character models on a 3D grid-based scene
 */
class CharacterLoader {
  /**
   * Constructor takes the scene (Three.js scene) and a grid configuration object
   */
  constructor(scene, gridConfig) {
    // Save the Three.js scene object so characters can be added to it
    this.scene = scene;

    // Save grid-related configurations (tile size, width, height, and offsets)
    this.tileSize = gridConfig.tileSize;         // size of one grid tile (e.g. 10 units)
    this.gridWidth = gridConfig.gridWidth;       // number of tiles horizontally
    this.gridHeight = gridConfig.gridHeight;     // number of tiles vertically
    this.offsetX = gridConfig.offsetX;           // horizontal offset to center or shift the grid
    this.offsetZ = gridConfig.offsetZ;           // vertical (depth) offset
  }

  /**
   * Converts a tile coordinate (e.g. tile.x, tile.z) into a world-space position
   * Adds the offset and centers the model on the tile by adding half a tile
   */
  tileToWorldPosition(tile) {
    const x = this.offsetX + tile.x * this.tileSize + this.tileSize / 2;
    const z = this.offsetZ + tile.z * this.tileSize + this.tileSize / 2;

    // Returns an object with the calculated x and z coordinates in 3D space
    return { x, z };
  }

  /**
   * Loads a single character model onto the scene.
   * Accepts an object containing: path, scale, rotation, and tile position
   */
  loadFigure({ path, scale, rotation, tile }) {
    // Get world position based on tile coordinates
    const position = this.tileToWorldPosition(tile);

    // Create a new ModelBase instance for the character
    // This handles loading and placing the 3D model into the scene
    const figure = new ModelBase(path, scale, rotation, position, this.scene);

    // Start loading the model
    // Once the model is loaded (via callback), we tag it and its children as a character
    figure.loadModel((gltfModel) => {
      setUserDataIsCharacter(gltfModel);
    });
  }

  /**
   * Loads multiple figures by looping through an array of character config objects
   */
  loadFigures(figures) {
    for (let i = 0; i < figures.length; i++) {
      this.loadFigure(figures[i]);
    }
  }
}

export default CharacterLoader;
