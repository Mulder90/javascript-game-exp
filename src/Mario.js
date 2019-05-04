import { KEY_LEFT, KEY_RIGHT, KEY_SPACE } from './Keys';

export default class Mario {
  constructor({ screenWidth, screenHeight }) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.width = 20;
    this.height = 20;

    this.position = {
      x: 0,
      y: this.screenHeight - this.height
    };
    this.velocity = {
      x: 0.0,
      y: 0.0
    };

    this.maxXVelocity = 0.6;
    this.maxYVelocity = 0.6;
    this.jumpVelocity = -1.5;
    this.gravity = 0.2;

    this.onGround = true;

    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.inputHandler = {
      [KEY_LEFT]: {
        true: () => {
          this.velocity.x = this.maxXVelocity;
        },
        false: () => {
          this.velocity.x = 0.0;
        }
      },
      [KEY_RIGHT]: {
        true: () => {
          this.velocity.x = -this.maxXVelocity;
        },
        false: () => {
          this.velocity.x = 0.0;
        }
      },
      [KEY_SPACE]: {
        true: () => {
          if (this.onGround) {
            this.velocity.y = this.jumpVelocity;
            this.onGround = false;
          }
        },
        false: () => {
          this.velocity.y = 0.0;
        }
      }
    };
  }

  processInput(state = {}) {
    for (let [key, value] of Object.entries(state)) {
      if (this.inputHandler[key]) {
        this.inputHandler[key][value]();
      }
    }
  }

  setXPos(delta) {
    let newXPos = this.position.x + this.velocity.x * delta;

    if (newXPos < 0) {
      newXPos = 0;
    }

    if (newXPos + this.width > this.screenWidth) {
      newXPos = this.screenWidth - this.width;
    }

    this.position.x = newXPos;
  }

  setYPos(delta) {
    this.velocity.y = Math.min(
      this.velocity.y + this.gravity,
      this.maxYVelocity
    );

    let newYPos = this.position.y + this.velocity.y * delta;

    if (newYPos >= this.screenHeight - this.height) {
      newYPos = this.screenHeight - this.height;
      this.onGround = true;
    }

    this.position.y = newYPos;
  }

  update(delta) {
    this.lastPosition = Object.assign({}, this.position);
    this.setXPos(delta);
    this.setYPos(delta);
  }

  draw(interp) {
    const interpXPos =
      this.lastPosition.x + (this.position.x - this.lastPosition.x) * interp;
    const interpYPos =
      this.lastPosition.y + (this.position.y - this.lastPosition.y) * interp;

    this.ctx.beginPath();
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(interpXPos, interpYPos, this.width, this.height);
    this.ctx.closePath();
  }
}
