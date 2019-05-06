let ulElement = document.querySelector('.square'),
    resetButton = document.getElementById('reset'),
    liElement = Array.prototype.slice.call(ulElement.children),
    liElementIndex = [[null, null, null], [null, null, null], [null, null, null]],
    turnCount = 0,
    turnFlag = true;

// 내 턴
function readyToPlay () {
    liElement.forEach(function(item, index) {
        item.addEventListener('click', function() {
            if (turnFlag) {    
                let row = Math.floor(index / 3);
                let column = index % 3;
                
                turnFlag = false;
                turnCount++;
                liElementIndex[row][column] = 'O';
                liElement[index].children[0].textContent = 'O';
                item.children[0].setAttribute('disabled', 'disabled');

                if (turnCount < 9) {
                    setTimeout(executeAI, 700);
                } else if (turnCount === 9) {
                    if (!checkWinner()) {
                        alert('무승부');
                    }
                }
            }
        });
    });
}

// AI 턴 
function executeAI () {
    let randomIndex, randomRow, randomColumn;

    if (turnCount > 4) {
        setTimeout(checkWinner, 0);
    }

    turnFlag = true;
    turnCount++;
    
    do {
        randomIndex = Math.floor(Math.random() * 9);
        randomRow = Math.floor(randomIndex / 3);
        randomColumn = randomIndex % 3;
    } while (liElementIndex[randomRow][randomColumn] !== null);

    liElementIndex[randomRow][randomColumn] = 'X';
    liElement[randomIndex].children[0].textContent = 'X';
    liElement[randomIndex].children[0].setAttribute('disabled', 'disabled');
}

function drawingLine (row) {
    let delayTime = 1;

    for (let j = row; j < row + 3; j++) {
        setTimeout(function () {
            liElement[j].children[0].className = 'line-through';
        }, delayTime * 1000);

        delayTime++;
    }
}

//승자 체크
function checkWinner () {
    for (let i = 0; i < liElementIndex.length; i++) {
        // 가로 체크
        if (liElementIndex[i].every(function (element) {
            if (element !== null) {
                return liElementIndex[i][0] === element;
            }
        })) {
            if (i === 0) {
                drawingLine(0);
            } else if (i === 1) {
                drawingLine(3);
            } else {
                drawingLine(6);
            }
            alert(`Congratulations! '${liElementIndex[i][0]}'Player Win!!`);
            disableAllButton();
            return true;
        }

        // 세로 체크
        if (liElementIndex[0][i] !== null && liElementIndex[0][i] === liElementIndex[1][i] && liElementIndex[0][i] === liElementIndex[2][i]) {
            alert(`Congratulations! '${liElementIndex[0][i]}'Player Win!!`);
            disableAllButton();
            return true;
        }
    }

    // 대각선 체크
    if (liElementIndex[0][0] !== null) {
        if (liElementIndex[0][0] === liElementIndex[1][1] && liElementIndex[0][0] === liElementIndex[2][2]) {
            alert(`Congratulations! '${liElementIndex[0][0]}'Player Win!!`);
            disableAllButton();
            return true;
        }
    } else if (liElementIndex[0][2] !== null) {
        if (liElementIndex[0][2] === liElementIndex[1][1] && liElementIndex[0][2] === liElementIndex[2][0]) {
            alert(`Congratulations! '${liElementIndex[0][2]}'Player Win!!`);
            disableAllButton();
            return true;
        }
    }

    return false;
}

// 모든 버튼 disabled 어트리뷰트 추가
function disableAllButton () {
    liElement.forEach(item => item.children[0].setAttribute('disabled', 'disabled'));
}


//게임 초기화
resetButton.addEventListener('click', function () {
    turnFlag = true;
    turnCount = 0;
    liElementIndex = [[null, null, null], [null, null, null], [null, null, null]];
    liElement.forEach(item => {item.children[0].textContent = ''; item.children[0].removeAttribute('disabled');item.children[0].removeAttribute('class')});
});

readyToPlay();