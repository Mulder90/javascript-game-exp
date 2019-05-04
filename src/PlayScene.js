import Box from './Box';

export default class PlayScene {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.box = new Box({
      screenWidth: this.canvas.width,
      screenHeight: this.canvas.height
    });
  }

  processInput(state) {
    this.box.processInput(state);
  }

  update(delta) {
    this.box.update(delta);
  }

  draw(interp) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.box.draw(interp);
  }
}
