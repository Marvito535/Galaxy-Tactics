import * as THREE from 'three';

class SceneGridOverlay {
  constructor(scene, gridWidth, gridHeight, tileSize ) {
    this.scene = scene;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.tileSize = tileSize;

    this.offsetX = - (this.gridWidth * this.tileSize) / 2;
    this.offsetZ = - (this.gridHeight * this.tileSize) / 2;

    this.linesGeometry = null;

    this.createGridGeometry();
    this.renderGrid();
  }

  getGridConfig() {
    return {
      tileSize: this.tileSize,
      gridWidth: this.gridWidth,
      gridHeight: this.gridHeight,
      offsetX: this.offsetX,
      offsetZ: this.offsetZ
    };
  }

  createGridGeometry() {
    const vertices = [];

    // Horizontal lines
    for (let y = 0; y <= this.gridHeight; y++) {
      vertices.push(0, 0, y * this.tileSize);
      vertices.push(this.gridWidth * this.tileSize, 0, y * this.tileSize);
    }

    // Vertical lines
    for (let x = 0; x <= this.gridWidth; x++) {
      vertices.push(x * this.tileSize, 0, 0);
      vertices.push(x * this.tileSize, 0, this.gridHeight * this.tileSize);
    }

    const verticesFloat32 = new Float32Array(vertices);
    this.linesGeometry = new THREE.BufferGeometry();
    this.linesGeometry.setAttribute('position', new THREE.BufferAttribute(verticesFloat32, 3));
  }

  renderGrid() {
    if (!this.linesGeometry) {
      console.error("linesGeometry is not initialized. Call createGridGeometry() first.");
      return;
    }

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.5
    });

    const gridLines = new THREE.LineSegments(this.linesGeometry, lineMaterial);
    gridLines.position.set(this.offsetX, 0.1, this.offsetZ);
    this.scene.add(gridLines);
  }
}

export default SceneGridOverlay;
