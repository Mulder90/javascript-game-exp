import GameLoop from './GameLoop';

export default class Game {
  constructor() {
    this.gameLoop = new GameLoop();
  }

  start() {
    this.gameLoop.start();
  }

  stop() {
    this.gameLoop.stop();
  }

  changeScene(scene) {
    this.gameLoop.changeScene(scene);
  }
}
