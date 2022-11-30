

// entering details of player 1&2
var player1 = prompt("Player One: Enter Your Name: ","Player1");
alert("Your Color is Blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter Your Name: ","Player2");
alert("Your Color is Red");
var player2Color = 'rgb(255, 45, 73)';

// ==================================================================
// table ke andr tr store kra
var table = $('table tr');

// coxlor change krega buttons ke // find is used to find the descendent i.e tr ka child component jo h td then td ka child jo h button
function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color)
}
// color btayega buttons ke
function ReportColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color')
}
// col ke bottom mai konse row bhre h btayega
function checkBottom(colIndex) {
    var colorReport = ReportColor(5, colIndex);
    for (var row = 5; row >= 0; row--) {
        colorReport = ReportColor(row, colIndex)
        if (colorReport === 'rgb(128, 128, 128)') {
            return row
        }
    }
}
function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one != 'rgb(128, 128, 128)' && one != undefined)
}
function horizontalWinCheck() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (colorMatchCheck(ReportColor(row, col), ReportColor(row, col + 1), ReportColor(row, col + 2), ReportColor(row, col + 3))) {
                return true;
            }
            else {
                continue;
            }
        }
    }
}

function verticalWinCheck() {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if (colorMatchCheck(ReportColor(row, col), ReportColor(row + 1, col), ReportColor(row + 2, col), ReportColor(row + 3, col))) {
                return true;
            }
            else {
                continue;
            }
        }
    }
}

function diagonalWinCheck() {
    for (let col = 0; col < 5; col++) {
        for (let row = 0; row < 7; row++) {
            if (colorMatchCheck(ReportColor(row, col), ReportColor(row + 1, col + 1), ReportColor(row + 2, col + 2), ReportColor(row + 3, col + 3))) {
                return true;
            }
            else if (colorMatchCheck(ReportColor(row, col), ReportColor(row - 1, col + 1), ReportColor(row - 2, col + 2), ReportColor(row - 3, col + 3))) {
                return true;
            }
        }
    }
}

currentPlayer = 1;
currentPlayerName = player1;
currentPlayerColor = player1Color;
$('h2').text(player1 + ": it is your turn, please pick a column to drop your blue chip.");

$('button').on("click", function () {
    var col = $(this).closest("td").index();
    var bottomAvail = checkBottom(col);
    changeColor(bottomAvail, col, currentPlayerColor);
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        $('body').css('background-color','black')
        $('h1').css('font-size', '5em')
        $('h1').text(currentPlayerName + ": You Won the Game");
        $('h1').fadeOut(2500);
        console.log("before")
        setTimeout(async ()=>{
            $('h1').fadeIn()
            $('h1').text("Thank You for Playing")
            console.log("st")
       },3000)
       console.log("after")

        $('h2').fadeOut('fast');
        $('table').fadeOut('fast');
        $('#playAgain').css({'display':'inline-block','font-size':'3em','position':'absolute','top':'5em','left':'11em'});        
        $('#playAgain').click(()=>location.reload())
       }
    else {
        currentPlayer = currentPlayer * -1;
        if (currentPlayer === 1) {
            currentPlayerName = player1;
            $('h2').text(currentPlayerName + ": it is your turn, please pick a column to drop your blue chip.");
            currentPlayerColor = player1Color;
        } else {
            currentPlayerName = player2
            $('h2').text(currentPlayerName + ": it is your turn, please pick a column to drop your red chip.");
            currentPlayerColor = player2Color;
        }
    }

})