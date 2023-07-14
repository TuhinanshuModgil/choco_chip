// Game Constants And Vraibales

let direction = { x: 1, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");

let lastTime = 0; // timer to set the how framerate
let speed = 8; // speed of movement of snake

const board = document.getElementById("board"); // gets the board HTML
let snake = [{ x: 2, y: 9 }];
let food = { x: 7, y: 9 };
let collision = false;

// Game Funstions

function main(stime) {
  window.requestAnimationFrame(main); // Need to understand it more
  if ((stime - lastTime) / 1000 < 1 / speed) {
    return;
  }
  //console.log(stime);

  lastTime = stime;
  gameEngin();
}

function gameEngin() {
  // Update the snake location and food
  collisionSelf();
  collisonDetection(snake[0]);
  createFood();
  moveSnake();
  if(!collision) renderUpdatedBoard();
  
  console.log(direction);
  // console.log(snake);
}

function collisionSelf() {
  snake.forEach((e, i) => {
    if (snake[0].x == e.x && snake[0].y == e.y && i>0) {
      collision = true;
      const gameOver = document.getElementsByClassName("game-over");
      gameOver[0].classList.add("show"); // gameOver.classList.add('show');
      console.log(gameOver);
      direction = { x: 0, y: 0 };
    }
  });
}

function moveSnake() {
  const nextHeadPosition = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };
  let tempStore = { xTemp: snake[0].x, yTemp: snake[0].y };
  snake = snake.map((snakecell, index) => {
    if (index !== 0) {
      snakecell = { x: snake[index - 1].x, y: snake[index - 1].y };
    } else {
      snakecell = nextHeadPosition;
    }
    return snakecell; // I was forgetting to return the snakecell
  });
}

function renderUpdatedBoard() {
  // Display the updates on the screen

  // rendering the snake
  board.innerHTML = "";
  snake.forEach((snakecell, index) => {
    //console.log(snakecell);
    const div = document.createElement("div"); //    creates a new container for current snake cell
    div.style.gridRowStart = snakecell.y; // defines the y and x postion of that cell in css
    div.style.gridColumnStart = snakecell.x;
    div.innerHTML=index;
    div.classList.add("head"); // add the class name to the cells to give them css properties
    board.appendChild(div); // add them to the board

    // rendering the food particle
    const div2 = document.createElement("div");
    div2.style.gridRowStart = food.y;
    div2.style.gridColumnStart = food.x;
    div2.classList.add("food");
    board.appendChild(div2);
  });
}

function collisonDetection(snakeHead) {
  if (
    snakeHead.x > 18 ||
    snakeHead.y > 18 ||
    snakeHead.x < 0 ||
    snakeHead.y < 0
  ) {
    console.log("collieded");
    collision = true;
    const gameOver = document.getElementsByClassName("game-over");
    gameOver[0].classList.add("show"); // gameOver.classList.add('show');
    console.log(gameOver);
    direction = { x: 0, y: 0 };

    //console.log(`request Frame ID =${frameRequestID}`);
  }
}

function createFood() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    // console.err('food hit');
    const foodX = Math.floor(Math.random() * 18 + 1);
    const foodY = Math.floor(Math.random() * 18 + 1);
    food = { x: foodX, y: foodY };

    snake.push({
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
    });
  }
}

window.addEventListener("keydown", (keydown) => {
  if (keydown.key === "ArrowUp" && direction.x !== 0 && direction.y!== 1) {
    direction = { x: 0, y: -1 };
  }
  if (keydown.key === "ArrowDown" && direction.x !== 0 && direction.y!== -1) {
    direction = { x: 0, y: 1 };
  }
  if (keydown.key === "ArrowRight"&& direction.x !==-1  && direction.y!== 0) {
    direction = { x: 1, y: 0 };
  }
  if (keydown.key === "ArrowLeft"&& direction.x !== 1 && direction.y!== 0) {
    direction = { x: -1, y: 0 };
  }
  if (keydown.key === "Enter" && collision) {
    snake = [{ x: 2, y: 9 }];
    food = { x: 7, y: 9 };
    direction = { x: 1, y: 0 };
    const gameOver = document.getElementsByClassName("game-over");
    gameOver[0].classList.remove("show");
    collision = false;
  }
  //   console.log("keydown", keydown);
});

// Game Logic Start

// So window request frame is will call the main function evertime the window is reday to de repained
// undersanding the above line is the key to understand this function.
// this meathod passses the a timestamp to the function that is called inside of it as a parameter.
const frameRequestID = window.requestAnimationFrame(main);
