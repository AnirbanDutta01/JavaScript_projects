const cells=document.querySelectorAll(".cell");
const statusText=document.querySelector("#statusText");
const startBtn=document.querySelector("#startBtn");
const resetBtn=document.querySelector("#resetBtn");
const winCondition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let currentPlayer="X";
let option=["","","","","","","","",""];
let running=false;
startBtn.addEventListener("click",startGame);
function startGame(){
    cells.forEach(cell=>cell.addEventListener("click",cellClicked));
    resetBtn.addEventListener("click",restartGame);
    statusText.textContent=`${currentPlayer}'s turn`;
    running=true;
};
function cellClicked(){
    const cellIndex=this.getAttribute("cellIndex");
    if(option[cellIndex]!="" || !running){  //!running is used to stop game after running
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();
};
function updateCell(cell,index){
    option[index]=currentPlayer;
    cell.textContent=currentPlayer;
};
function checkWinner(){
    let roundWon=false;
    for(i=0;i<winCondition.length;i++){
        const condition=winCondition[i];
        const cellA=option[condition[0]];
        const cellB=option[condition[1]];
        const cellC=option[condition[2]];
        if(cellA==""||cellB==""||cellC==""){
            continue;
        }
        if(cellA==cellB && cellB==cellC){
            roundWon=true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent=`${currentPlayer} WINS!`
        running=false;
        disable(cellClicked);
        //startBtn.classList.add("display");
    }
    else if(!option.includes("")){
        statusText.textContent=`GAME DRAW!`
        running=false;
    }
    else{
        changePlayer();
    }
};
function changePlayer(){
    currentPlayer=(currentPlayer=="X")?"O":"X";
    statusText.textContent=`${currentPlayer}'s turn`
};
function restartGame(){
    currentPlayer="X";
    option=["","","","","","","","",""];
    statusText.textContent=`${currentPlayer} turn`
    cells.forEach(cell=>cell.textContent="");
    running=false;
};