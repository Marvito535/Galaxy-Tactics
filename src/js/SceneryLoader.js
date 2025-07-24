import ModelBase from './ModelBase.js';

export default function SceneryLoader (Scenery,scene) {
for (let i = 0; i < Scenery.length; i++) {
  const { path, scale, rotation, position } = Scenery[i];
  const figure = new ModelBase(path, scale, rotation, position, scene);
  figure.loadModel();
 }
}