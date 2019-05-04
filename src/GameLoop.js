export default class GameLoop {
  constructor() {
    this.delta = 0;
    this.lastFrameTimeMs = 0;
    this.maxFPS = 60;
    this.fps = 60;
    this.maxUpdateIteration = 240;
    this.timeStep = 1000 / this.maxFPS;
    this.framesSinceLastFpsUpdate = 0;
    this.lastFpsUpdate = 0;
    this.fpsAlpha = 0.9;

    this.fpsDisplay = document.getElementById('fps-counter');
  }

  changeScene(scene) {
    this.scene = scene;
  }

  loop(timeStamp) {
    this.delta += timeStamp - this.lastFrameTimeMs;
    this.lastFrameTimeMs = timeStamp;

    if (timeStamp > this.lastFpsUpdate + 1000) {
      this.fps =
        (this.fpsAlpha * this.framesSinceLastFpsUpdate * 1000) /
          (timeStamp - this.lastFpsUpdate) +
        (1 - this.fpsAlpha) * this.fps;

      this.lastFpsUpdate = timeStamp;
      this.framesSinceLastFpsUpdate = 0;
    }

    this.framesSinceLastFpsUpdate++;

    this.processInput();

    let numUpdateSteps = 0;
    while (this.delta >= this.timeStep) {
      this.update(this.timeStep);
      this.delta -= this.timeStep;

      if (++numUpdateSteps >= this.maxUpdateIteration) {
        this.recover();
        break;
      }
    }

    this.draw(this.delta / this.timeStep);
    this.rafID = window.requestAnimationFrame(this.loop.bind(this));
  }

  recover() {
    this.delta = 0;
  }

  start() {
    this.rafID = window.requestAnimationFrame(this.loop.bind(this));
  }

  stop() {
    window.cancelAnimationFrame(this.rafID);
  }

  processInput() {
    this.scene.processInput();
  }

  update(delta) {
    this.scene.update(delta);
  }

  draw(interp) {
    this.fpsDisplay.textContent = `${Math.round(this.fps)} FPS`;
    this.scene.draw(interp);
  }
}
