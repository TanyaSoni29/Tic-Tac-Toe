const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");


let currentPlayer ;
let gameGrid; // this is created to check the status of game
const winningPositions = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8], 
    [0,4,8], 
    [2,4,6]
]

function initGame() {
    currentPlayer ="X";
    gameGrid= ["","","","","","","","",""]; // gamegrid is empty
    boxes.forEach( (box,index) => {
        box.innerText ="";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`; // this is to css again so that we have new boxes which are not green.
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}
initGame();

function swapTurn(){
    if (currentPlayer === "X"){
        currentPlayer = "O";
    }
    else {
        currentPlayer="X";
    }
    gameInfo.innerText =`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
let answer = "";

winningPositions.forEach((position) =>{
    if( (gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]])){
     
     if(gameGrid[position[0]] ==="X")
        answer = "X";
     else
        answer = "O";

     boxes.forEach((box) =>{
        box.style.pointerEvents ="none"; // this is written for not making another winning position after we have one winning position.
     })
     
     boxes[position[0]].classList.add("win");
     boxes[position[1]].classList.add("win");
     boxes[position[2]].classList.add("win");
    }
   
});

if(answer !==""){
    gameInfo.innerText =`Winner Player -${answer}`;
    newGameBtn.classList.add("active");
    return;
}
 //no winner is found match is tie 

 let fillCount =0;

 gameGrid.forEach((box) =>{
    if(box !==""){
        fillCount++;
    }
 });

 if (fillCount ===9){
    gameInfo.innerText ="Game Tied !";
    newGameBtn.classList.add("active");
 }
}
 
function handelClick(index) {
    if (gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer; // for ui updation
        gameGrid[index] = currentPlayer; // for game grid that we created here 
        boxes[index].style.pointerEvents = "none";
        //swapping of turn now
        swapTurn();
        // check winning
        checkGameOver(); 
        // make that box unclickable yeh hum alreeady likh chuke hai if ke ander empty hai bocx tabhi execute ho raha hai...

    }
}

boxes.forEach((box,index) => {
    box.addEventListener('click', () =>{
        handelClick(index)
    })
}) // here in handelclick function we are passing index so that we can identify which box is clicked 



newGameBtn.addEventListener('click', initGame);
