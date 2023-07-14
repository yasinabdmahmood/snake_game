class Game{
    constructor(specifications){
        const {
             numRows,
             numColumns,
             snakeBody,
        } = specifications;
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.snakeBody = snakeBody;
        this.direction = 'right';
        this.oldDirection = 'right';
        this.seed = this.generateNewSeed();

    }
    

    calculateNextState(){
      const direction =this.direction;
      const oldDirection = this.oldDirection;
      const snakeBody = this.snakeBody;
      const headCoordinate = snakeBody[snakeBody.length - 1];
      const tailCoordinate = snakeBody[0];
      const x = headCoordinate[0];
      const y = headCoordinate[1];
      let newX = null;
      let newY= null;
      switch (direction) {
        case 'up':
           newX = x;
           newY = this.adjust(y - 1);
          break;
        case 'down':
           newX = x;
           newY = this.adjust(y + 1);
          break;
        case 'right':
           newX = this.adjust( x + 1);
           newY = y;
          break;
        case 'left':
           newX = this.adjust( x - 1);;
           newY = y;
          break;
      }
      const newHeadCoordinate = [newX, newY];
      snakeBody.push(newHeadCoordinate);
      snakeBody.shift();
      

    }


    adjust(number,range = 25) {
      // Handle the case where the adjusted number is outside the range
      if (number < 0) {
        number += range;
      } else if (number >= range) {
        number -= range;
      }
    
      return number;
    }

    setDirection(newDirection){
      // check if the change in direction is valid
      const condition1 = this.direction === 'right' && newDirection === 'left';
      const condition2 = this.direction === 'left' && newDirection === 'right';
      const condition3 = this.direction === 'up' && newDirection === 'down';
      const condition4 = this.direction === 'down' && newDirection === 'up';
      if(condition1 || condition2 || condition3 || condition4) return;
      this.oldDirection = this.direction;
      this.direction = newDirection;
    }

    checkForCollision(){
      const snakeBody = this.snakeBody
      const headCoordinate = snakeBody[snakeBody.length - 1];
      const headX = headCoordinate[0];
      const headY = headCoordinate[1];
      for(let i = 0; i < snakeBody.length - 1; ++i){
        const item = snakeBody[i];
        const xCoordinate = item[0];
        const yCoordinate = item[1];
        if(headX === xCoordinate && headY === yCoordinate) return true
      }
      return false
    }

    generateNewSeed(min = 0, max = 24) {
      function generateRandomSeed(){
        const randomSeed = [];
        // Generate two random numbers between min and max
        for (let i = 0; i < 2; i++) {
          const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
          randomSeed.push(randomNumber);
        }
        return randomSeed;
      }

      const isSeedOnSnakeBody =(seed,snakeBody) => {
        snakeBody.forEach(element => {
          if(element[0] === seed[0] && element[1] === seed[1]){
            return true
          }
          else{
            return false
          }
        });
      }

      let seed = generateRandomSeed();
      while(isSeedOnSnakeBody(seed,this.snakeBody)){
        seed = generateRandomSeed();
      }
      
      console.log(seed)
      return seed;
    }
    
    isSeedEaten(){
      const snakeBody = this.snakeBody
      const headCoordinate = snakeBody[snakeBody.length - 1];
      const headX = headCoordinate[0];
      const headY = headCoordinate[1];
      const seedX = this.seed[0];
      const seedY = this.seed[1];
      if(seedX === headX && seedY === headY){
        return true
      }else{
        return false
      }
    }
}

