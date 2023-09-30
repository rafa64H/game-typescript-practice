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
  public watchingToTheRight: boolean;
  public attacking: boolean;
  public attackBox: {
    position: { x: number; y: number };
    widthOfAttack: number;
    heightOfAttack: number;
  };
  public leftAttack: {
    position: { x: number; y: number };
    widthOfAttack: number;
    heightOfAttack: number;
  };
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
    this.playerSpeedX = 10;
    this.playerSpeedY = 0;
    this.movingUp = false;
    this.movingRight = false;
    this.movingDown = false;
    this.movingLeft = false;
    this.watchingToTheRight = true;
    this.attacking = false;
    this.attackBox = {
      position: {
        x: 0,
        y: 0,
      },
      widthOfAttack: 0,
      heightOfAttack: 0,
    };
    this.leftAttack = {
      position: {
        x: 0,
        y: 0,
      },
      widthOfAttack: 0,
      heightOfAttack: 0,
    };
    this.player = player;

    // Event Listeners
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  drawPlayer(): void {
    this.parentCanvas.context!.fillStyle = 'red';

    this.parentCanvas.context?.fillRect(
      this.playerPosition.x,
      this.playerPosition.y,
      this.playerWidth,
      this.playerHeight
    );

    if (this.watchingToTheRight) {
      this.parentCanvas.context!.fillStyle = 'white';

      this.parentCanvas.context?.fillRect(
        this.playerPosition.x + 12,
        this.playerPosition.y,
        this.playerWidth * 0.5,
        5
      );
    } else {
      this.parentCanvas.context!.fillStyle = 'white';

      this.parentCanvas.context?.fillRect(
        this.playerPosition.x,
        this.playerPosition.y,
        this.playerWidth * 0.5,
        5
      );
    }

    //When attacking
    if (this.watchingToTheRight && this.attacking) {
      this.parentCanvas.context!.fillStyle = 'lightblue';

      this.attackBox = {
        position: {
          x: this.playerPosition.x + this.playerWidth,
          y: this.playerPosition.y + 20,
        },
        widthOfAttack: this.playerWidth * 3,
        heightOfAttack: 5,
      };

      this.parentCanvas.context?.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.widthOfAttack,
        this.attackBox.heightOfAttack
      );
      setTimeout(() => {
        this.attacking = false;
      }, 500);
    } else if (!this.watchingToTheRight && this.attacking) {
      this.parentCanvas.context!.fillStyle = 'lightblue';

      this.attackBox = {
        position: {
          x: this.playerPosition.x - this.playerWidth * 3,
          y: this.playerPosition.y + 20,
        },
        widthOfAttack: this.playerWidth * 3,
        heightOfAttack: 5,
      };

      this.parentCanvas.context?.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.widthOfAttack,
        this.attackBox.heightOfAttack
      );
      setTimeout(() => {
        this.attacking = false;
      }, 500);
    }
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
    if (e.repeat) return;

    console.log(e.key);
    //Player one keys:
    if ((e.key === 'W' || e.key === 'w') && this.player === 1) {
      this.movingUp = true;
    }
    if ((e.key === 'D' || e.key === 'd') && this.player === 1) {
      this.movingRight = true;
      this.watchingToTheRight = true;
    }
    if ((e.key === 'S' || e.key === 's') && this.player === 1) {
      this.movingDown = true;
    }
    if ((e.key === 'A' || e.key === 'a') && this.player === 1) {
      this.movingLeft = true;
      this.watchingToTheRight = false;
    }
    if ((e.key === ' ' || e.key === ' ') && this.player === 1) {
      this.attacking = true;
    }

    //Player two keys:
    if (e.code === 'ArrowUp' && this.player === 2) {
    }
  };

  handleKeyUp = (e: KeyboardEvent): void => {
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
    if ((e.key === ' ' || e.key === ' ') && this.player === 1) {
      this.attacking = false;
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

  collisionAttack(canvas: CanvasView, playersArr: Player[]) {
    if (playersArr[0].attacking) {
      console.log(
        playersArr[0].attackBox.position.x,
        playersArr[0].attackBox.position.y,
        playersArr[0].attackBox.widthOfAttack,
        playersArr[0].attackBox.heightOfAttack
      );
      console.log(
        playersArr[1].playerPosition.x,
        playersArr[1].playerPosition.y,
        playersArr[1].playerWidth,
        playersArr[1].playerHeight
      );

      const attackX = playersArr[0].attackBox.position.x;
      const attackY = playersArr[0].attackBox.position.y;
      const attackWidth = playersArr[0].attackBox.widthOfAttack;
      const attackHeight = playersArr[0].attackBox.heightOfAttack;

      const enemyX = playersArr[1].playerPosition.x;
      const enemyY = playersArr[1].playerPosition.y;
      const enemyWidth = playersArr[1].playerWidth;
      const enemyHeight = playersArr[1].playerHeight;

      console.log(attackY + attackHeight);
      console.log(enemyY + enemyHeight);

      const logicCollisionOnX =
        attackX <= enemyX && attackX + attackWidth >= enemyX + enemyWidth;

      const logicCollisionOnY =
        attackY >= enemyY && attackY + attackHeight <= enemyY + enemyHeight;

      if (logicCollisionOnX && logicCollisionOnY) {
        console.log('connected');
      }
    }
  }
}