import * as THREE from 'three';

class SceneGridOverlay {
  constructor(scene, gridWidth, gridHeight, tileSize) {
    this.scene = scene;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.tileSize = tileSize;

    this.offsetX = -(this.gridWidth * this.tileSize) / 2;
    this.offsetZ = -(this.gridHeight * this.tileSize) / 2;

    this.linesGeometry = null;

    // Erzeuge das interne Kachel-Mapping
    this.gridMap = this.generateGridMap();

    this.createGridGeometry();
    this.renderGrid();
  }

  // Gibt die Grid-Konfiguration zurück (z. B. für andere Klassen)
  getGridConfig() {
    return {
      tileSize: this.tileSize,
      gridWidth: this.gridWidth,
      gridHeight: this.gridHeight,
      offsetX: this.offsetX,
      offsetZ: this.offsetZ
    };
  }

  // Gibt die Map "A1" → {x, z} zurück
  getGridMap() {
    return this.gridMap;
  }

  // Optional: Wandelt eine Weltposition zurück in die Kachelkennung (z. B. "C2")
  getTileKeyFromPosition(x, z) {
    const relX = x - this.offsetX;
    const relZ = z - this.offsetZ;

    const tileX = Math.floor(relX / this.tileSize);
    const tileZ = Math.floor(relZ / this.tileSize);

    if (
      tileX < 0 || tileX >= this.gridWidth ||
      tileZ < 0 || tileZ >= this.gridHeight
    ) {
      return null; // außerhalb des Grids
    }

    return `${String.fromCharCode(65 + tileX)}${tileZ + 1}`;
  }

  // Interne Methode: Erzeugt Mapping wie { "A1": {x, z}, ... }
  generateGridMap() {
    const map = {};

    for (let x = 0; x < this.gridWidth; x++) {
      for (let z = 0; z < this.gridHeight; z++) {
        const key = `${String.fromCharCode(65 + x)}${z + 1}`;
        const worldX = x * this.tileSize + this.offsetX + this.tileSize / 2;
        const worldZ = z * this.tileSize + this.offsetZ + this.tileSize / 2;
        map[key] = { x: worldX, z: worldZ };
      }
    }

    return map;
  }

  // Zeichnet die Gitterlinien
  createGridGeometry() {
    const vertices = [];

    for (let y = 0; y <= this.gridHeight; y++) {
      vertices.push(0, 0, y * this.tileSize);
      vertices.push(this.gridWidth * this.tileSize, 0, y * this.tileSize);
    }

    for (let x = 0; x <= this.gridWidth; x++) {
      vertices.push(x * this.tileSize, 0, 0);
      vertices.push(x * this.tileSize, 0, this.gridHeight * this.tileSize);
    }

    const verticesFloat32 = new Float32Array(vertices);
    this.linesGeometry = new THREE.BufferGeometry();
    this.linesGeometry.setAttribute('position', new THREE.BufferAttribute(verticesFloat32, 3));
  }

  // Rendert das Gitter in die Szene
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

