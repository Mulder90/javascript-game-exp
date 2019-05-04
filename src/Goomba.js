export default class Goomba {
  constructor({ screenWidth, screenHeight }) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.width = 10;
    this.height = 10;

    this.position = {
      x: 0,
      y: this.screenHeight - this.height
    };
    this.velocity = {
      x: 0.2,
      y: 0.0
    };

    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  setXPos(delta) {
    let newXPos = this.position.x + this.velocity.x * delta;

    if (newXPos < 0) {
      newXPos = 0;
      this.velocity.x *= -1;
    }

    if (newXPos + this.width > this.screenWidth) {
      newXPos = this.screenWidth - this.width;
      this.velocity.x *= -1;
    }

    this.position.x = newXPos;
  }

  update(delta) {
    this.lastPosition = Object.assign({}, this.position);
    this.setXPos(delta);
  }

  draw(interp) {
    const interpXPos =
      this.lastPosition.x + (this.position.x - this.lastPosition.x) * interp;
    const interpYPos =
      this.lastPosition.y + (this.position.y - this.lastPosition.y) * interp;

    this.ctx.beginPath();
    this.ctx.fillStyle = 'orange';
    this.ctx.fillRect(interpXPos, interpYPos, this.width, this.height);
    this.ctx.closePath();
  }
}
