// JavaScript Document
$(document).ready(function () {
    const x = "x";
    const o = "o";
    let winner = "";
    let count = 0;
    let boardSize = 3;
    const winCount = {
        o: 0,
        x: 0
    }

    const BOARD_MIN_SIZE = 3;
    const MAX_TILES = boardSize * boardSize;
    const MOVES_TO_WIN = 5;

    function resetGame() {
        $("#game li").text("+");
        $("#game li").removeClass('disable o x btn-primary btn-info');
        count = 0;
        winner = "";
    }

    function isWinner(player, currentSelectedTile) {
        const row = parseInt(currentSelectedTile.getAttribute('row'));
        const col = parseInt(currentSelectedTile.getAttribute('col'));

        const nw = $(`#game li.${player}[row='${row - 1}'][col='${col - 1}']`).length === 1;
        if (nw && $(`#game li.${player}[row='${row - 2}'][col='${col - 2}']`).length === 1) {
            return true;
        }
        const se = $(`#game li.${player}[row='${row + 1}'][col='${col + 1}']`).length === 1;
        if (nw && se) {
            return true;
        }
        if (se && $(`#game li.${player}[row='${row + 2}'][col='${col + 2}']`).length === 1) {
            return true;
        }

        const n = $(`#game li.${player}[row='${row - 1}'][col='${col}']`).length === 1;
        if (n && $(`#game li.${player}[row='${row - 2}'][col='${col}']`).length === 1) {
            return true;
        }
        const s = $(`#game li.${player}[row='${row + 1}'][col='${col}']`).length === 1;
        if (n && s) {
            return true;
        }
        if (s && $(`#game li.${player}[row='${row + 2}'][col='${col}']`).length === 1) {
            return true;
        }

        const ne = $(`#game li.${player}[row='${row - 1}'][col='${col + 1}']`).length === 1;
        if (ne && $(`#game li.${player}[row='${row - 2}'][col='${col + 2}']`).length === 1) {
            return true;
        }
        const sw = $(`#game li.${player}[row='${row + 1}'][col='${col - 1}']`).length === 1;
        if (ne && sw) {
            return true;
        }
        if (sw && $(`#game li.${player}[row='${row + 2}'][col='${col - 2}']`).length === 1) {
            return true;
        }

        const e = $(`#game li.${player}[row='${row}'][col='${col + 1}']`).length === 1;
        if (e && $(`#game li.${player}[row='${row}'][col='${col + 2}']`).length === 1) {
            return true;
        }
        const w = $(`#game li.${player}[row='${row}'][col='${col - 1}']`).length === 1;
        if (e && w) {
            return true;
        }
        if (w && $(`#game li.${player}[row='${row}'][col='${col - 2}']`).length === 1) {
            return true;
        }

        return false;
    }

    function changeBoardSize(newSize) {
        if (boardSize != newSize) {
            boardSize = Math.max(newSize, BOARD_MIN_SIZE);
            loadBoard();
            resetGame();
        } else {
            alert("No change in size. Please input a different value to change board size");
        }
    }

    function clickTile(e) {
        if (winner !== "") {
            alert(`${winner.toUpperCase()} has won the game. Start a new game`);
            resetGame();
            return;
        }

        if ($(this).hasClass('disable')) {
            if (count == MAX_TILES) {
                alert('Its a tie. It will restart.')
                resetGame();
            } else {
                alert('Already selected');
            }
            return;
        }

        const currentPlayer = count % 2 == 0 ? o : x;
        count++;

        $(this).text(currentPlayer.toUpperCase());
        $(this).addClass(`disable ${currentPlayer} ${currentPlayer === o ? "btn-primary" : "btn-info"}`);

        if (count >= MOVES_TO_WIN && isWinner(currentPlayer, this)) {
            winner = currentPlayer;
            winCount[currentPlayer]++;
            alert(`${currentPlayer.toUpperCase()} wins`);
            $(`#${currentPlayer}_win`).text(winCount[currentPlayer]);
        }
    }

    function loadBoard() {
        const totalTiles = boardSize * boardSize;
        $('#game').empty();
        document.documentElement.style.setProperty("--rowCount", boardSize);
        document.documentElement.style.setProperty("--colCount", boardSize);
        for (let counter = 0; counter < totalTiles; counter++) {
            $('#game').append(`<li class="btn span1" row="${Math.floor(counter / boardSize)}" col="${counter % boardSize}">+</li>`);
        }

        $('#game li').click(clickTile);
    }

    $("#reset").click(resetGame);
    $("#change").click(() => {
        changeBoardSize($("#board-input").val());
    });

    loadBoard();
});
