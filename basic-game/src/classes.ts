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
}

export class Gravity {
  gravityOnDrawings(canvas: CanvasView, playersArr: Player[]) {}
}
