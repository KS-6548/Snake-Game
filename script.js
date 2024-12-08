const play_board = document.querySelector(".play-board");
const canvas = play_board.getContext("2d");
let scoreBoard = document.querySelector(".score");
let HighscoreBoard = document.querySelector(".high-score");
let replay_btn = document.querySelector(".replay");
let restart_btn = document.querySelector(".restart");

const boradWidth = play_board.width;
const boradHeight = play_board.height;

const unit= 10;
let foodX;
let foodY;
let velocityX = 10;
let velocityY = 0;
let score = 0;
let active = true;
let paused = false;
let started = false;

let highscore = localStorage.getItem("high-score") || 0;
HighscoreBoard.textContent = `High Score: ${highscore}`;

window.addEventListener("keydown",Keypress);

let Snake = [
    {x:unit*3,y:0},
    {x:unit*2,y:0},
    {x:unit,y:0},
    {x:0,y:0}
];

// let color;
// let randColor = ["red","yellow","green"]
// color = randColor[Math.floor(Math.random()*3)]

replay_btn.addEventListener("click",()=>location.reload())
restart_btn.addEventListener("click",()=>{
    location.reload();
    highscore = localStorage.clear()||0;
    HighscoreBoard.textContent = `High Score: ${highscore}`;

})


Initgame();

function Initgame()
{
    canvas.fillStyle = "#212837";
    canvas.fillRect(0,0,boradWidth,boradHeight);
    positionFood();
    createFood();
    drawSnake();
}

function positionFood()
{
    foodX = Math.floor(Math.random()*boradWidth/unit)*unit;
    foodY = Math.floor(Math.random()*boradHeight/unit)*unit;
}

function createFood()
{
    canvas.fillStyle = "red";
    canvas.fillRect(foodX,foodY,unit,unit);
}

function drawSnake()
{
    canvas.fillStyle = "aqua";
    canvas.storkeStyle = "#212837";
    Snake.forEach(Snakepart => {
        canvas.fillRect(Snakepart.x,Snakepart.y,unit,unit);
        canvas.strokeRect(Snakepart.x,Snakepart.y,unit,unit);
    });
}

function moveSnake()
{
    let head = {x:Snake[0].x+velocityX, y:Snake[0].y+velocityY};
    Snake.unshift(head);
    if(Snake[0].x == foodX && Snake[0].y == foodY)
    {
        score++
        highscore = score >= highscore ? score : highscore
        localStorage.setItem("high-score",highscore);
        scoreBoard.textContent = `Score: ${score}`;
        HighscoreBoard.textContent = `High Score: ${highscore}`;
        positionFood();
        createFood();
    }
    else{
        Snake.pop();
    }
}

function clearBoard()
{
    canvas.fillStyle = "#212837";
    canvas.fillRect(0,0,boradWidth,boradHeight);
}

function Timeset()
{
    if(active && !paused){
        setTimeout(()=>{
            clearBoard()
            createFood()
            moveSnake()
            drawSnake()
            Gameover()
            Timeset()
        }
        ,200);
    }
    else if(!active)
    {
        clearBoard();
        canvas.font = "bold 20px serif";
        canvas.fillStyle = "white";
        canvas.textAlign = "center";
        canvas.fillText("GAME OVER!!",boradWidth/2,boradHeight/2);
    }
    
}

function Keypress(event)
{
    if(!started){
        started = true;
        Timeset();
    }
    if(event.keyCode == 32)
        {
            if(paused)
                {
                    paused = false;
                    Timeset();
                }
            else
            {  
                paused = true;
            }
            console.log(active);
        }
    if(active){
        if(event.keyCode == 37 && velocityX!=unit)
        {
            velocityX = -unit;
            velocityY = 0;
        }
        else if (event.keyCode == 38 && velocityY!=unit)
        {
            velocityX = 0;
            velocityY = -unit;
        }
        else if (event.keyCode == 39 && velocityX!=-unit)
        {
            velocityX = unit;
            velocityY = 0;
        }
        else if (event.keyCode == 40 && velocityY!=-unit)
        {
            velocityX = 0;
            velocityY = unit;
        }
    }
}

function Gameover()
{
    
    switch (true) {
        case Snake[0].x<0:
        case Snake[0].x>=boradWidth:
        case Snake[0].y<0:
        case Snake[0].y>=boradHeight:

        active = false;    
            break;
    }

    for (let i = 1; i < Snake.length; i++) {
        if(Snake[i].x == Snake[0].x && Snake[i].y == Snake[0].y){
            active = false;
        }
    }
}
