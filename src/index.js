import Game from './Game';
import PlayScene from './PlayScene';

function main() {
  const game = new Game();
  game.changeScene(new PlayScene());
  game.start();
}

main();
