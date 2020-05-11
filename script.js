const btn = document.querySelector('#btn');
const cont = document.getElementById("container");
const restart = document.querySelector('#restart');
const rdv = document.querySelectorAll("input");
const box = document.getElementsByClassName("box");
const status = document.getElementById("turn");

let value="";
let gameActive = true;

const winningConditions = [
	[0, 1, 2], 
	[0, 3, 6], 
	[3, 4, 5], 
	[6, 7, 8], 
	[1, 4, 7], 
	[2, 5, 8], 
	[0, 4, 8], 
	[2, 4, 6], 
	]

let gameState = ["", "", "", "", "", "", "", "", "", ];

const currentPlayer = () => `It's ${value}'s Turn`;
const winningMessage = () => `${value} has Won!!!`;
const drawMessage = () => `Round Draw!`;

function cellClicked(clickedCell,clickedCellIndex){
	gameState[clickedCellIndex] = value;
	clickedCell.innerHTML = value;
}

function resultValidation(){
	let roundWon = false;
	for (var i = 0; i < 8; i++) {
		const wincheck = winningConditions[i];
		let a = gameState[wincheck[0]];
		let b = gameState[wincheck[1]];
		let c = gameState[wincheck[2]];
		if(a === '' || b === '' || c === ''){
			continue;
		}
		else if(a === b && b === c){
			roundWon=true;
			break
		}
	}
	if(roundWon) {
		status.innerHTML= winningMessage();
		gameActive = false;
		return;
	}
	let roundDraw = !gameState.includes("");
	if(roundDraw){
		status.innerHTML = drawMessage();
		gameActive = false;
		return;
	}
	playerChange();
}

btn.onclick = function(){	
	rdv.forEach(function(xyz){
		if(xyz.checked){
			value=xyz.value;
			status.innerHTML = currentPlayer();
		}
	})
}

cont.onclick = function(event){

	const clickedCell = event.target;

	const clickedCellIndex = parseInt(
		clickedCell.getAttribute('index')
		);
	if(gameState[clickedCellIndex] !== "" || !gameActive){
		return;
	}
	cellClicked(clickedCell,clickedCellIndex);
	resultValidation();
}

restart.onclick = function(){
	gameActive =true;
	value="";
	gameState = ["", "", "", "", "", "", "", "", "", ];
	status.innerHTML="";
	for (var i = 0; i < box.length; i++) {
		box[i].innerHTML="";
	}
	for (var i = 0; i < rdv.length; i++) {
		rdv[i].checked=false;
	}
}

function playerChange() {
	if(value!==""){
	value = value==="X" ? "O" :"X";
	status.innerHTML= currentPlayer();
	}
}
