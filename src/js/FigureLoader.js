import FigureBase from './FigureBase.js';

 class FigureLoader {
  constructor(scene) {
    this.scene = scene;
  }

  loadFigure({ path, scale, rotation, position }) {
    const figure = new FigureBase(path, scale, rotation, position, this.scene);
    figure.loadModel();
  }

 loadFigures(figures) {
  for (let i = 0; i < figures.length; i++) {
    this.loadFigure(figures[i]);
  }
}
}

export default FigureLoader;