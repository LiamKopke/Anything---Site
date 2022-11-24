class Cake{

    constructor() {
      this.size = 60;
      this.x = width;
      this.y = height / 2;
      this.startingY = height / 2;
      this.heightVariation = 0
      this.moveUp = false;
      this.eaten = false;
      this.speed = 0;
      }

      setup(){
        this.heightVariation = Math.random() + 0.2 * 200; // height variation is random between 70 and 200
        this.moveUp = Math.random() <= 0.5; //start going down half the time start going up half the time
        this.speed = Math.random() + 0.2 * 15; // speed is random between 3 and 15
      }

      show() {
        image(cakeImage, this.x, this.y, this.size, this.size / 2);
      }

      move() {
        this.x -= 8;

        // this.moveUp = this.direction();


        // if(this.moveUp){
        //   this.y -= this.speed;
        // }else{
        //   this.y += this.speed;
        // }

      }

      // returns true if moving up, false if moving down
      direction(){
        if(this.y <= this.startingY - 150) return false;
        if(this.y >= this.startingY + 150) return true;
        return this.moveUp;
      }
}

