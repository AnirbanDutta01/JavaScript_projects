const gameBoard=document.querySelector("#gameBoard");
const ctx=gameBoard.getContext('2d');
const scoreText=document.querySelector("#scoreText");
const resetBtn=document.querySelector("#resetBtn");
const startBtn=document.querySelector("#startBtn");
const pauseBtn=document.querySelector("#pauseBtn");
const continueBtn=document.querySelector("#continueBtn");
const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height;
const boardBackground="forestgreen";
const paddle1Color="lightblue";
const paddle2Color="red";
const paddleBorder="black";
const ballColor="yellow";
const ballBorderColor="black";
const ballRadius=12.5;
const paddleSpeed=50;
let savedGameState=null;
let running=false;
let intervalID;
let ballSpeed=1;
let ballX=gameWidth/2;  
let ballY=gameHeight/2;
let ballXdirection=0;
let ballYdirection=0;
let player1Score=0;
let player2Score=0;
let paddle1={
    width:25,
    height:100,
    x:0,    
    y:0
}
let paddle2={
    width:25,
    height:100,
    x:gameWidth-25,    
    y:gameHeight-100
}
window.addEventListener("keydown",changeDirection);
resetBtn.addEventListener("click",resetGame);
//gameStart();
startBtn.addEventListener("click",gameStart);
pauseBtn.addEventListener("click",gamePause);
continueBtn.addEventListener("click",continueGame);
function gameStart(){
    running=true;
    clearTimeout(intervalID);
    createBall();
    nextTick();
    //startBtn.style.visibility="hidden";
    //resetBtn.style.display="block";
};
function gamePause(){
    if(running){
        running=false;
        savedGameState={
            ballX:ballX,
            ballY:ballY,
            ballXdirection:ballXdirection,
            ballYdirection:ballYdirection,
            paddle1Y:paddle1.y,
            paddle2Y:paddle2.y,
            player1Score:player1Score,
            player2Score:player2Score
        };
    }
}
/*function continueGame(ballXdirection,ballYdirection,ballSpeed){
    if(!running){
        moveBall(ballXdirection,ballYdirection,ballSpeed);
    }
}*/
function continueGame(){
    if(!running && savedGameState!==null){
        ballX=savedGameState.ballX;
        ballY=savedGameState.ballY;
        ballXdirection=savedGameState.ballXdirection;
        ballXdirection=savedGameState.ballYdirection;
        paddle1.y=savedGameState.paddle1Y,
        paddle2.y=savedGameState.paddle2Y,
        player1Score=savedGameState.player1Score,
        player2Score=savedGameState.player2Score;
        running=true;
        savedGameState=null;
        nextTick();
    }
}
function nextTick(){
    if(running){
    intervalID=setTimeout(()=>{
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX,ballY);
        checkCollision();
        nextTick();
    },10)
    }
};
function clearBoard(){
    ctx.fillStyle=boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function drawPaddles(){
    ctx.strokeStyle=paddleBorder;
    ctx.fillStyle=paddle1Color;
    ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);// left coordinates and height and width to fill the color
    ctx.strokeRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height)//to add border
    
    ctx.fillStyle=paddle2Color;
    ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
    ctx.strokeRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
    
};
function createBall(){
    ballSpeed=1;    
    if(Math.round(Math.random())==1){   
        ballXdirection=1;   
    }
    else{
        ballXdirection=-1;
    }
    if(Math.round(Math.random())==1){
        ballYdirection=1; 
    }
    else{
        ballYdirection=-1;
    }
    ballX=gameWidth/2;
    ballY=gameHeight/2 
    drawBall(ballX,ballY);
    //gamePause(ballXdirection,ballYdirection,ballSpeed);
};
function moveBall(){
    ballX+=(ballSpeed*ballXdirection);
    ballY+=(ballSpeed*ballYdirection);
};
function checkCollision(){
    if(ballY<=0+ ballRadius){ 
        ballYdirection*=-1;             
    }
    if(ballY>=gameHeight-ballRadius){   
        ballYdirection *=-1 
    }
    if(ballX<=0){
        player2Score+=1;    
        updateScore();
        createBall();
        return;
    }
    if(ballX>=gameWidth){
        player1Score+=1;    
        updateScore();
        createBall();
        return;
    }
    
    if(ballX<=(paddle1.x+paddle1.width+ballRadius)){    
        
        
        if(ballY>paddle1.y && ballY<paddle1.y+paddle1.height){
            ballX=(paddle1.x+paddle1.width)+ballRadius;
            ballXdirection*=-1;     
            ballSpeed+=1;   
        }
    }
    if(ballX>=(paddle2.x-ballRadius)){
        if(ballY>paddle2.y && ballY<paddle2.y+paddle2.height){
            ballX=paddle2.x-ballRadius;
            ballXdirection*=-1;     
            ballSpeed+=1;   
        }
    }
};
function drawBall(ballX,ballY){
    ctx.fillStyle=ballColor;
    ctx.strokeStyle=ballBorderColor;
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.arc(ballX,ballY,ballRadius,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
};
function changeDirection(event){
    const keyPressed=event.keyCode;
    //console.log(keyPressed);
   const paddle1Up=87;
   const paddle1Down=83;
   const paddle2Up=38;
   const paddle2Down=40;
   switch(keyPressed){
    case(paddle1Up):
        if(paddle1.y>0){
            paddle1.y -=paddleSpeed 
        }
        break;
    case(paddle1Down):
        if(paddle1.y<gameHeight-paddle1.height){
            paddle1.y +=paddleSpeed 
        }
        break;
    case(paddle2Up):
        if(paddle2.y>0){
            paddle2.y-=paddleSpeed;
        }
        break;
    case(paddle2Down):
        if(paddle2.y<gameHeight-paddle2.height){
            paddle2.y+=paddleSpeed;
        }
        break;
   }
};
function updateScore(){
    scoreText.textContent=`${player1Score}:${player2Score}`
};
function resetGame(){
    player1Score=0
    player2Score=0;
    paddle1={
        width:25,
        height:100,
        x:0,   
        y:0
    };
    paddle2={
        width:25,
        height:100,
        x:gameWidth-25,    
        y:gameHeight-100
    };
    ballSpeed=1;
    ballX=0;
    ballY=0;
    ballXdirection=0;
    ballYdirection=0;
    running=true;
    startBtn.style.visibility="visible";
    updateScore();
    clearInterval(intervalID);
    gameStart();
};