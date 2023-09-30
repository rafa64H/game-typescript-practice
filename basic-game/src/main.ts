import { CanvasView, Collision, Gravity, Player } from './classes';

const canvas = new CanvasView('game-view');

canvas.create();

const playerOne = new Player(canvas, { x: 0, y: 0 }, 25, 100, 1);
const playerTwo = new Player(canvas, { x: 500, y: 0 }, 25, 100, 2);

const gravityInstance = new Gravity();

const collisionInstance = new Collision();

function gameLoop() {
  canvas.clear();
  canvas.create();

  playerOne.drawPlayer();
  playerTwo.drawPlayer();
  playerOne.movePlayer();
  playerTwo.movePlayer();

  gravityInstance.gravityOnDrawings(canvas, [playerOne, playerTwo]);

  collisionInstance.collisionOnBorders(canvas, [playerOne, playerTwo]);
  collisionInstance.collisionAttack(canvas, [playerOne, playerTwo]);

  requestAnimationFrame(() => {
    gameLoop();
  });
}

gameLoop();
