let playerChoice = "";
const flipSound = new Audio("/485726__spacejoe__coin-flip-3.wav");
let coinFlip = function () {
  flipSound.play();
};

document.querySelector("#heads").addEventListener("click", flipCoin);
document.querySelector("#tails").addEventListener("click", flipCoin);

async function flipCoin() {
  playerChoice = this.id;
  console.log(playerChoice);
  const res = await fetch(`/api?flipRequest=${playerChoice}`);
  console.log(res);
  const data = await res.json();
  console.log(data);
  coinFlip();
  document.querySelector("#flipResult").textContent = data.result;
  document.getElementById("message").src = [data.message];
}
