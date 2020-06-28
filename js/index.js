// JavaScript Document
$(document).ready(function () {
    const x = "x";
    const o = "o";
    let count = 0;
    let winner = "";
    const winCount = {
        o: 0,
        x: 0
    }
    const MAX_TILES = 9;
    const MOVES_TO_WIN = 5;

    function resetGame() {
        $("#game li").text("+");
        $("#game li").removeClass('disable o x btn-primary btn-info');
        count = 0;
        winner = "";
    }

    function isWinner(player, currentSelectedTileId) {
        switch (currentSelectedTileId) {
            case "one":
                return $("#two").hasClass(player) && $("#three").hasClass(player) ||
                    $("#four").hasClass(player) && $("#seven").hasClass(player) ||
                    $("#five").hasClass(player) && $("#nine").hasClass(player);
            case "two":
                return $("#one").hasClass(player) && $("#three").hasClass(player) ||
                    $("#five").hasClass(player) && $("#eight").hasClass(player);
            case "three":
                return $("#one").hasClass(player) && $("#two").hasClass(player) ||
                    $("#six").hasClass(player) && $("#nine").hasClass(player) ||
                    $("#five").hasClass(player) && $("#seven").hasClass(player);
            case "four":
                return $("#five").hasClass(player) && $("#six").hasClass(player) ||
                    $("#one").hasClass(player) && $("#seven").hasClass(player);
            case "five":
                return $("#four").hasClass(player) && $("#six").hasClass(player) ||
                    $("#two").hasClass(player) && $("#eight").hasClass(player) ||
                    $("#one").hasClass(player) && $("#nine").hasClass(player) ||
                    $("#three").hasClass(player) && $("#seven").hasClass(player);
            case "six":
                return $("#four").hasClass(player) && $("#five").hasClass(player) ||
                    $("#three").hasClass(player) && $("#nine").hasClass(player);
            case "seven":
                return $("#eight").hasClass(player) && $("#nine").hasClass(player) ||
                    $("#one").hasClass(player) && $("#four").hasClass(player) ||
                    $("#three").hasClass(player) && $("#five").hasClass(player);
            case "eight":
                return $("#seven").hasClass(player) && $("#nine").hasClass(player) ||
                    $("#two").hasClass(player) && $("#five").hasClass(player);
            case "nine":
                return $("#seven").hasClass(player) && $("#eight").hasClass(player) ||
                    $("#three").hasClass(player) && $("#six").hasClass(player) ||
                    $("#one").hasClass(player) && $("#five").hasClass(player);
            default: return false;
        }
    }

    $('#game li').click(function () {
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

        if (count >= MOVES_TO_WIN && isWinner(currentPlayer, this.id)) {
            winner = currentPlayer;
            winCount[currentPlayer]++;
            alert(`${currentPlayer.toUpperCase()} wins`);
            $(`#${currentPlayer}_win`).text(winCount[currentPlayer]);
        }
    });

    $("#reset").click(resetGame);
});
