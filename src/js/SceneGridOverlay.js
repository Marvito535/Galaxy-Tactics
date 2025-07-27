import * as THREE from 'three';                      // Import the entire THREE.js library as THREE

class GeometryLines {
  constructor(gridHeight, gridWidth, tileSize, scene, offsetX, offsetZ) {
    this.gridHeight = gridHeight;
    this.gridWidth = gridWidth;
    this.tileSize = tileSize;
    this.scene = scene;
    this.offsetX = offsetX;
    this.offsetZ = offsetZ;
    this.linesGeometry = null;
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
      console.error("linesGeometry is not initialized. Call geometryPosition() first.");
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

export default GeometryLines;