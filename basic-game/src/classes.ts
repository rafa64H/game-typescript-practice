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
  public playerSpeedX: number;
  public playerSpeedY: number;
  public movingUp: boolean;
  public movingRight: boolean;
  public movingDown: boolean;
  public movingLeft: boolean;
  constructor(
    public parentCanvas: CanvasView,
    public playerPosition: { x: number; y: number },
    public playerWidth: number,
    public playerHeight: number,
    public player: number
  ) {
    this.playerPosition = playerPosition;
    this.playerWidth = playerWidth;
    this.playerHeight = playerHeight;
    this.playerSpeedX = 20;
    this.playerSpeedY = 0;
    this.movingUp = false;
    this.movingRight = false;
    this.movingDown = false;
    this.movingLeft = false;
    this.player = player;

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

  movePlayer(): void {
    if (this.movingUp) {
      this.playerSpeedY = -10;
      this.playerPosition.y += this.playerSpeedY;
    }
    if (this.movingRight) {
      this.playerPosition.x += this.playerSpeedX;
    }
    if (this.movingDown) {
      this.playerSpeedY += 2;
    }
    if (this.movingLeft) {
      this.playerPosition.x += -this.playerSpeedX;
    }

    // if (this.movingUp && this.movingRight) {
    //   this.playerSpeedY = -10;
    //   this.playerPosition.y += this.playerSpeedY;
    //   this.playerPosition.x += this.playerSpeedX;
    // }
  }

  handleKeyDown = (e: KeyboardEvent): void => {
    e.preventDefault();

    console.log(e.key);
    //Player one keys:
    if ((e.key === 'W' || e.key === 'w') && this.player === 1) {
      this.movingUp = true;
    }
    if ((e.key === 'D' || e.key === 'd') && this.player === 1) {
      this.movingRight = true;
    }
    if ((e.key === 'S' || e.key === 's') && this.player === 1) {
      this.movingDown = true;
    }
    if ((e.key === 'A' || e.key === 'a') && this.player === 1) {
      this.movingLeft = true;
    }

    //Player two keys:
    if (e.code === 'ArrowUp' && this.player === 2) {
    }
  };

  handleKeyUp = (e: KeyboardEvent): void => {
    e.preventDefault();

    //Player one keys:
    if ((e.key === 'W' || e.key === 'w') && this.player === 1) {
      this.movingUp = false;
    }
    if ((e.key === 'D' || e.key === 'd') && this.player === 1) {
      this.movingRight = false;
    }
    if ((e.key === 'S' || e.key === 's') && this.player === 1) {
      this.movingDown = false;
    }
    if ((e.key === 'A' || e.key === 'a') && this.player === 1) {
      this.movingLeft = false;
    }

    //Player two keys:
    if (e.code === 'ArrowUp' && this.player === 2) {
    }
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
      }
    });
  }
}

export class Collision {
  collisionOnBorders(canvas: CanvasView, playersArr: Player[]): void {
    playersArr.forEach((player) => {
      const borderTop = 0;
      const borderRight = canvas.width - player.playerWidth;
      const borderBottom = canvas.height - player.playerHeight;
      const borderLeft = 0;

      if (player.playerPosition.x <= borderLeft) {
        player.playerPosition.x = borderLeft;
      }
      if (player.playerPosition.x >= borderRight) {
        player.playerPosition.x = borderRight;
      }
      if (player.playerPosition.y <= borderTop) {
        player.playerPosition.y = borderTop;
      }
      if (player.playerPosition.y >= borderBottom) {
        player.playerPosition.y = borderBottom;
      }
    });
  }
}
