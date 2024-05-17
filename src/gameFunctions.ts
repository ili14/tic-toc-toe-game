import multiplication from "./assets/multiplication.png";
import minus from "./assets/minus.png";

export type GameData = { gamer: 1 | 2; winner?: 1 | 2; clickedCount: number };
let gameData: GameData = { gamer: 1, clickedCount: 0 };

export function setGamerF({
    element,
    andDo,
}: {
    element: HTMLButtonElement;
    andDo: (options: GameData) => void;
}) {
    element.onclick = function () {
        gameData.clickedCount += 1;
        if (gameData.clickedCount <= 9) {
            console.log("gamer", gameData.gamer);
            const image = document.createElement("img");
            if (gameData.gamer === 1) {
                image.src = multiplication;
                image.className = "imageBtn";
                element.appendChild(image);
            } else if (gameData.gamer === 2) {
                image.src = minus;
                image.className = "imageBtn";
                element.appendChild(image);
            }
            element.disabled = true;
        }
        andDo(gameData);
    };
}

function resetGamer() {
    gameData = {
        clickedCount: 0,
        gamer: 1,
        winner: undefined,
    };
}

export const setGame = {
    setGamer: setGamerF,
    setReset: resetGamer,
};

const winnerRows = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
];
export function winnerChecker(gamerChecked: number[]) {
    let winner = false;
    winnerRows.forEach(winnerRow => {
        let rowChecked = 0;
        gamerChecked.forEach(gamerCheck => {
            if (winnerRow.includes(gamerCheck)) {
                rowChecked++;
            }
        });

        if (rowChecked >= 3) {
            winner = true;
            console.log("winnerRow", winnerRow);
            return;
        }
    });
    return winner;
}
