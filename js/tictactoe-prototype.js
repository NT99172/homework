let ulElement = document.querySelector('.square'),
    resetButton = document.getElementById('reset'),
    result = document.querySelector('.result'),
    turnInfo = document.querySelector('.turnInfo'),
    liElement = Array.prototype.slice.call(ulElement.children),
    availableLiElement = liElement,
    row,
    column,
    liElementIndex = [[null, null, null], [null, null, null], [null, null, null]],
    turn,
    isMyTurn = true,
    randomIndex,
    dimmed = document.createElement("DIV"),
    layerWrapper = document.createElement('DIV');

dimmed.className = 'dimmed';
layerWrapper.className = 'layer_choice';
document.body.append(dimmed, layerWrapper);
layerWrapper.innerHTML = '<h2>턴 선택</h2><button type="button" class="x">X</button><button type="button" class="o">O</button><strong>&#8251; X는 <span>선공</span>, O는 <span>후공</span>입니다.</strong>';

[...layerWrapper.getElementsByTagName('button')].forEach(function (eachButton) {
    eachButton.onclick = function () {
        turn = eachButton.textContent;
        if (turn === 'X') {
            turnInfo.textContent = '당신 : X,      컴퓨터 : O';
        } else {
            turnInfo.textContent = '당신 : O,      컴퓨터 : X';
            randomIndex = Math.floor(Math.random() * liElement.length);
            isMyTurn = false;
            turn = 'X';
            setTimeout(function () {
                availableLiElement[randomIndex].children[0].click();
            }, 700)
        }
        dimmed.style.display = 'none';
        layerWrapper.style.display = 'none';
    }
});

liElement.forEach(function (item) {
    item.addEventListener('click', selectThisBox);
});

function selectThisBox (e) {
    if (e.target.textContent === '' && e.target.tagName === 'BUTTON') { 
        row = Math.floor(liElement.indexOf(e.target.parentElement) / 3);
        column = liElement.indexOf(e.target.parentElement) % 3;
        e.target.textContent = turn;
        liElementIndex[row][column] = turn;
        
        availableLiElement = liElement.filter(function (item) {
            return item.children[0].textContent === '';
        });

        if (availableLiElement.length <= 4) {
            if (checkWinner(row, column)) {
                liElement.forEach(function (item) {
                    item.removeEventListener('click', selectThisBox);
                });

                return false;
            }
        }

        turn = turn === 'X' ? 'O' : 'X';
        isMyTurn = !isMyTurn;
        
        //컴퓨터가 랜덤으로 클릭
        if (!isMyTurn && availableLiElement.length) {
            randomIndex = Math.floor(Math.random() * availableLiElement.length);
            setTimeout(function () {
                availableLiElement[randomIndex].children[0].click();
            }, 700)
        }
        
        if (!availableLiElement.length) {
            result.textContent = '무승부 입니다';
        }
    }
}

function checkWinner (row, column) {
    let verticalData = [],
        diagonalData = [];

    //가로 체크
    if (liElementIndex[row].every(item => item === turn)) {
        if (isMyTurn) {
            result.textContent = '당신이 가로 3칸 완료로 승리하셨습니다.';
        } else {
            result.textContent = '컴퓨터가 가로 3칸 완료로 승리하였습니다.';
        }
        
        return true;
    }
    
    // //세로 체크
    for (let i = 0; i < 3; i++) {
        verticalData.push(liElementIndex[i][column]);
    }
    if (verticalData.every(item => item === turn)) {
        if (isMyTurn) {
            result.textContent = '당신이 세로 3칸 완료로 승리하셨습니다.';
        } else {
            result.textContent = '컴퓨터가 세로 3칸 완료로 승리하였습니다.';
        }

        return true;
    }

    // 대각선 체크
    if (row - column === 0) {
        for (let i = 0; i < 3; i++) {
            diagonalData.push(liElementIndex[i][i]);
        }
        
        if (diagonalData.every(item => item === turn)) {
            if (isMyTurn) {
                result.textContent = '당신이 좌대각선 3칸 완료로 승리하셨습니다.';
            } else {
                result.textContent = '컴퓨터가 좌대각선 3칸 완료로 승리하였습니다.';
            }
            
            return true;
        }
    }

    if (row + column === 2) {
        for (let i = 0, j = 3; i < 3; i++) {
            j--;
            diagonalData.push(liElementIndex[i][j]);
        }

        if (diagonalData.every(item => item === turn)) {
            if (isMyTurn) {
                result.textContent = '당신이 우대각선 3칸 완료로 승리하셨습니다.';
            } else {
                result.textContent = '컴퓨터가 우대각선 3칸 완료로 승리하였습니다.';
            }

            return true;
        }
    }

    return false;
}

resetButton.onclick = function () {
    result.textContent = '';
    turnInfo.textContent = '';
    isMyTurn = true;
    availableLiElement = liElement;
    liElementIndex = [[null, null, null], [null, null, null], [null, null, null]];

    liElement.forEach(function (item) {
        item.children[0].textContent = '';
        item.addEventListener('click', selectThisBox);
    });

    dimmed.style.display = 'block';
    layerWrapper.style.display = 'block';
}