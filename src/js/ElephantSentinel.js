import ModelBase from './ModelBase.js';

function setUserDataIsCharacter(object) {
  object.userData.isCharacter = true;
  object.children.forEach(setUserDataIsCharacter);
}

class ElephantSentinel {
  constructor(scene, gridConfig) {
    const gridMap = gridConfig.gridMap || {}; // Sicherheits-Check, falls Map fehlt
    const position = gridMap["E3"]; // Position auf Feld A1 holen

    if (!position) {
      console.error("GridMap enthält keine Position für A1.");
      return;
    }

    const model = new ModelBase(
      '../public/assets/figures/Elephant_Sentinel.glb',
      [7, 7, 7],
      Math.PI * 0,
      position,
      scene
    );

    model.loadModel((gltfModel) => {
      setUserDataIsCharacter(gltfModel);
    });
  }
}

export default ElephantSentinel;