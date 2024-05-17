import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import cryingEmoji from "./assets/crying.jpg";
import resetIc from "./assets/icons8-reset-100.png";
import { setGame, winnerChecker, GameData } from "./gameFunctions.ts";
import minus from "./assets/minus.png";
import multiplication from "./assets/multiplication.png";

let gamer1Checked: number[] = [];
let gamer2Checked: number[] = [];

const gameSence = `
  <div class="rootContainer">
    <div class="container">
      <button class="gameBtn" data-no="1" ></button>
      <button class="gameBtn" data-no="2" ></button>
      <button class="gameBtn" data-no="3" ></button>
      <button class="gameBtn" data-no="4" ></button>
      <button class="gameBtn" data-no="5" ></button>
      <button class="gameBtn" data-no="6" ></button>
      <button class="gameBtn" data-no="7" ></button>
      <button class="gameBtn" data-no="8" ></button>
      <button class="gameBtn" data-no="9" ></button>
    </div>
    <div id="modal" class="hidden">
      <div id="resultWinner" class="hidden">result</div>
      <div id="loserResult" class="hidden">result<img class="rounded" width="40px" src="${cryingEmoji}"></div>
      <div id="noWinner" class="hidden">----No Winner----</div>
      <button class="resetGameBtn" >Reset Game <img width="50px" src="${resetIc}"></button>
    </div>
    <button id="resetGameBtn"  class="resetGameBtn">Reset Game <img width="50px" src="${resetIc}"></button>
    <img src="${minus}" hidden >
    <img src="${multiplication}" hidden >
  </div>
`;
function startGame() {
    document.querySelector<HTMLDivElement>("#app")!.innerHTML = gameSence;

    const gameBtns = document.querySelectorAll<HTMLButtonElement>(".gameBtn");
    const resultWinnerEl = document.querySelector<HTMLDivElement>(
        "#resultWinner"
    ) as HTMLDivElement;
    const loserResultEl = document.querySelector<HTMLDivElement>(
        "#loserResult"
    ) as HTMLDivElement;
    const noWinnerEl = document.querySelector<HTMLDivElement>(
        "#noWinner"
    ) as HTMLDivElement;
    const modalDivEl = document.querySelector<HTMLDivElement>(
        "#modal"
    ) as HTMLDivElement;

    gameBtns.forEach(gameBtn => {
        setGame.setGamer({
            element: gameBtn,
            andDo(gameData: GameData) {
                let haveWinner = false;
                const btnNO = Number(gameBtn.getAttribute("data-no")) as number;
                if (gameData.gamer === 1) {
                    gamer1Checked.push(btnNO);
                    if (winnerChecker(gamer1Checked)) {
                        resultWinnerEl.innerText = "gamer (X) winner";
                        loserResultEl.innerHTML =
                            loserResultEl.innerHTML.replace(
                                "result",
                                "gamer (-) loser"
                            );
                        resultWinnerEl.className = "winnerAnim";
                        loserResultEl.className = "loserAnim";
                        resultWinnerEl.classList.remove("hidden");
                        loserResultEl.classList.remove("hidden");
                        haveWinner = true;
                    }
                    gameData.gamer = 2;
                } else if (gameData.gamer === 2) {
                    gamer2Checked.push(btnNO);
                    if (winnerChecker(gamer2Checked)) {
                        resultWinnerEl.innerText = "gamer (-) winner";
                        loserResultEl.innerHTML =
                            loserResultEl.innerHTML.replace(
                                "result",
                                "gamer (X) loser"
                            );
                        resultWinnerEl.className = "winnerAnim";
                        loserResultEl.className = "loserAnim";
                        resultWinnerEl.classList.remove("hidden");
                        loserResultEl.classList.remove("hidden");
                        haveWinner = true;
                    }
                    gameData.gamer = 1;
                }
                if (gameData.clickedCount >= 9 && !haveWinner) {
                    noWinnerEl.classList.remove("hidden");
                    modalDivEl.classList.remove("hidden");
                    return;
                }
                if (haveWinner) {
                    modalDivEl.classList.remove("hidden");
                }
            },
        });
    });

    document
        .querySelectorAll<HTMLButtonElement>(".resetGameBtn")
        .forEach(item => {
            item.onclick = resetGame;
        });
    function resetGame() {
        startGame();
        gamer1Checked = [];
        gamer2Checked = [];
        setGame.setReset();
    }
}

startGame();
