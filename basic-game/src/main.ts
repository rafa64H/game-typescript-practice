import { CanvasView, Gravity, Player } from './classes';

const canvas = new CanvasView('game-view');

canvas.create();

const playerOne = new Player({ x: 0, y: 0 }, 25, 100, 0, 0);
const playerTwo = new Player({ x: canvas.width - 40, y: 0 }, 25, 100, 0, 0);

const gravityInstance = new Gravity();

function gameLoop() {
  canvas.clear();
  canvas.create();

  playerOne.drawPlayer(canvas);
  playerTwo.drawPlayer(canvas);

  gravityInstance.gravityOnDrawings(canvas, [playerOne, playerTwo]);

  requestAnimationFrame(() => {
    gameLoop();
  });
}

gameLoop();
