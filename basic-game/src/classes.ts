export class CanvasView {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D | null;
  public width: number;
  public height: number;

  constructor(canvasName: string) {
    this.canvas = document.getElementById(canvasName) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
    this.width = 1024;
    this.height = 768;
  }

  clear(): void {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  create(): void {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context?.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export class Player {
  constructor(
    public playerPosition: { x: number; y: number },
    public playerWidth: number,
    public playerHeight: number,
    public playerSpeedX: number,
    public playerSpeedY: number
  ) {
    this.playerPosition = playerPosition;
    this.playerWidth = playerWidth;
    this.playerHeight = playerHeight;
    this.playerSpeedX = playerSpeedX;
    this.playerSpeedY = playerSpeedY;

    // Event Listeners
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  drawPlayer(canvas: CanvasView): void {
    canvas.context!.fillStyle = 'red';

    canvas.context?.fillRect(
      this.playerPosition.x,
      this.playerPosition.y,
      this.playerWidth,
      this.playerHeight
    );
  }

  jumpPlayer(): void {
    this.playerSpeedY = -10;

    this.playerPosition.y += this.playerSpeedY;
  }

  handleKeyUp = (e: KeyboardEvent): void => {
    // if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') this.moveLeft = false;
    // if (e.code === 'ArrowRight' || e.key === 'ArrowRight')
    //   this.moveRight = false;

    if (e.code === 'KeyW' || e.key === 'w') this.jumpPlayer();
  };

  handleKeyDown = (e: KeyboardEvent): void => {
    // if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') this.moveLeft = true;
    // if (e.code === 'ArrowRight' || e.key === 'ArrowRight')
    //   this.moveRight = true;
  };
}

export class Gravity {
  gravityOnDrawings(canvas: CanvasView, playersArr: Player[]): void {
    let gravityAccel = 0.4;

    playersArr.forEach((player) => {
      if (player.playerPosition.y < canvas.height - player.playerHeight) {
        player.playerSpeedY += gravityAccel;

        player.playerPosition.y += player.playerSpeedY;
      } else {
        player.playerSpeedY = 0;
        player.playerPosition.y = canvas.height - player.playerHeight;
      }
    });
  }
}
