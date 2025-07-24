import ModelBase from './ModelBase.js';

class CharacterLoader {
  constructor(scene, gridConfig) {
    this.scene = scene;
    this.tileSize = gridConfig.tileSize;
    this.gridWidth = gridConfig.gridWidth;
    this.gridHeight = gridConfig.gridHeight;
    this.offsetX =  gridConfig.offsetX;
    this.offsetZ =  gridConfig.offsetZ;
  }

  tileToWorldPosition(tile) {
    const x = this.offsetX + tile.x * this.tileSize + this.tileSize / 2;
    const z = this.offsetZ + tile.z * this.tileSize + this.tileSize / 2;
    return { x, z };
  }

  loadFigure({ path, scale, rotation, tile }) {
    const position = this.tileToWorldPosition(tile);
    const figure = new ModelBase(path, scale, rotation, position, this.scene);
    figure.loadModel();
  }

  loadFigures(figures) {
    for (let i = 0; i < figures.length; i++) {
      this.loadFigure(figures[i]);
    }
  }
}

export default CharacterLoader;
