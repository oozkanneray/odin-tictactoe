const xANDo = document.querySelectorAll(".pick");
const plate = document.querySelectorAll(".plate");
const resetGameBtn = document.querySelector(".resetGame");
const winnerScreen = document.querySelector(".winnerScreen");
const winnerTab = document.querySelector(".winnerTab")
const playAgainBtn = document.querySelector(".playAgainBtn")
const chooseBtn = document.querySelector(".chooseBtn")
const chooseScreen = document.querySelector(".chooseScreen")


let gameBoard = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

let turn = true
let gameTour = 0;


let player1
let player2


xANDo.forEach(el => {
    el.onclick = (e) => {
        document.querySelector(".chooseScreen").style.display = "none";

        if(e.target.innerHTML == "X"){
            player1 = "X"
            player2 = "Y"
        } else {
            player1 = "Y"
            player2 = "X"
        }


    }
});

chooseBtn.onclick = () => changePick();


resetGameBtn.onclick = () => {
   gameBoard = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
}

resetGameBtn.onclick = () => resetGame()


plate.forEach(plt => {


    plt.onclick = (e) =>{
        let index = parseInt(plt.getAttribute("data"))
        if(plt.innerHTML != "") return
        if(turn){
            e.target.innerHTML = player1;
            gameBoard[index] = player1;
            turn = false
            e.target.style.color = "blue"

        }else{
            e.target.innerHTML = player2;
            gameBoard[index] = player2;
            turn = true
            e.target.style.color = "red"
        }
        checkWinner()
        gameTour++ 
        if(gameTour == 9){
            finishGame("draw")
        }
    }
});


function resetGame(){
    gameBoard = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    plate.forEach(plt => {
        plt.innerHTML = ""
    });

    winnerScreen.style.display = "none"
    gameTour = 0
}



function checkWinner(){
    const winner =
    [[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

        const allEqual = arr => arr.every( v => v === arr[0])


        for (let i=0; i<8; i++) {
            let tmp = [];

            for (let j=0; j<3; j++) {
                tmp.push(gameBoard[winner[i][j]]);

            }
            if(allEqual(tmp)){
                finishGame(tmp[0])
            }


        }
}


function finishGame(winner){

    winnerScreen.style.display = "flex"

    if(winner == "draw"){
        document.querySelector(".winnerTabText").innerHTML = `Game is ${winner}`
        
    }
    else{
        document.querySelector(".winnerTabText").innerHTML = `Winner is ${winner}`

    }


    playAgainBtn.onclick = () => {
        resetGame()
        changePick();
        turn = true;
        gameTour = 0
    }

}


function changePick(){
    chooseScreen.style.display = "flex";
    resetGame();

    turn = true

}

