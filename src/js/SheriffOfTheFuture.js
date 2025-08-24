import ModelBase from './ModelBase.js';

function setUserDataIsCharacter(object) {
  object.userData.isCharacter = true;
  object.children.forEach(setUserDataIsCharacter);
}

class SheriffOfTheFuture {
  constructor(scene, gridConfig) {
    const gridMap = gridConfig.gridMap || {}; // Sicherheits-Check, falls Map fehlt
    const position = gridMap["E2"]; // Position auf Feld A1 holen

    if (!position) {
      console.error("GridMap enthält keine Position für C1.");
      return;
    }

    const model = new ModelBase(
      '../public/assets/figures/Sheriff_of_the_Future.glb',
      [7, 7, 7],
      Math.PI * 1.5,
      position,
      scene
    );

    model.loadModel((gltfModel) => {
  setUserDataIsCharacter(gltfModel);
  gltfModel.name = "SheriffOfTheFuture";

  // kleine Verzögerung, damit scene.add schon passiert ist
  setTimeout(() => {
    console.log("Found in scene:", scene.getObjectByName("SheriffOfTheFuture"));
  }, 100);
});

  }
}

export default SheriffOfTheFuture;