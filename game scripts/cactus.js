class Cactus {

  // unlike C#, constructors don't have the same name of the class
  constructor() {
    this.size = 75;
    this.x = width;
    this.y = height - this.size;

    // width is the width of the canvas
    // height is the height of the canvas
    // we are placing the cactus at the bottom of the canvas with this.y = height - this.size
  }

  // displaying/drawing the cactus on the canvas
  show() {
    image(cactusImage, this.x, this.y, this.size, this.size);
  }

  // moving the cactus on the x-axis
  // feel free to modify the speed by modifying the number 
  move() {
    this.x -= 8;
  }
}