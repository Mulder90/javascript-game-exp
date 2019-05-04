import { KEY_LEFT, KEY_RIGHT, KEY_SPACE, KEY_UP, KEY_ESC } from './Keys';
import { filter } from './Utils';

export default class InputManager {
  constructor() {
    this.state = {
      [KEY_LEFT]: false,
      [KEY_RIGHT]: false,
      [KEY_SPACE]: false,
      [KEY_ESC]: false
    };
    this.attachListener();
  }

  attachListener() {
    document.addEventListener('keydown', evt => {
      switch (evt.keyCode) {
        case KEY_LEFT:
          this.setState(KEY_LEFT, true);
          break;
        case KEY_RIGHT:
          this.setState(KEY_RIGHT, true);
          break;
        case KEY_SPACE:
        case KEY_UP:
          this.setState(KEY_SPACE, true);
          break;
        default:
          break;
      }
    });

    document.addEventListener('keyup', evt => {
      switch (evt.keyCode) {
        case KEY_LEFT:
          this.setState(KEY_LEFT, false);
          break;
        case KEY_RIGHT:
          this.setState(KEY_RIGHT, false);
          break;
        case KEY_SPACE:
        case KEY_UP:
          this.setState(KEY_SPACE, false);
          break;
        case KEY_ESC:
          this.setState(KEY_ESC, !this.state[KEY_ESC]);
          break;
        default:
          break;
      }
    });
  }

  setState(key, value) {
    Object.assign(this.state, {
      [key]: value
    });
  }

  getState() {
    return this.state;
  }

  clearState() {
    this.state = filter(this.state, value => value === true);
  }
}
