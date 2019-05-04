import InputManager from './InputManager';
import Mario from './Mario';
import Goomba from './Goomba';

export default class PlayScene {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.keysDebugger = document.getElementById('keys-debugger');

    this.inputManager = new InputManager();

    this.mario = new Mario({
      screenWidth: this.canvas.width,
      screenHeight: this.canvas.height
    });

    this.goomba = new Goomba({
      screenWidth: this.canvas.width,
      screenHeight: this.canvas.height
    });
  }

  processInput() {
    this.mario.processInput(this.inputManager.getState());
  }

  update(delta) {
    this.mario.update(delta);
    this.goomba.update(delta);
  }

  draw(interp) {
    this.inputManager.clearState();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.mario.draw(interp);
    this.goomba.draw(interp);

    this.keysDebugger.textContent = `KEYS: ${JSON.stringify(
      this.inputManager.getState()
    )}`;
  }
}
