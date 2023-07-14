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

   
}

