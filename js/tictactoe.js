let ulElement = document.querySelector('.square');
let liElement = Array.prototype.slice.call(ulElement.children);
let liElementIndex = [[null, null, null], [null, null, null], [null, null, null]];
let turnFlag = true;  // true = my turn,  false = AI's turn
let turnCount = 0;

//모든 LI에 클릭 이벤트 걸기
liElement.forEach(function(item, index) {
    item.addEventListener('click', function() {
        if (turnFlag) {
            // 내 턴
            let row = Math.floor(index / 3);
            let column = index % 3;

            turnFlag = false;
            turnCount++;

            liElementIndex[row][column] = 'O';
            liElement[index].children[0].textContent = 'O';
            item.children[0].setAttribute('disabled', 'disabled');

            if (turnCount < 9) {
                setTimeout(executeAI, 700);
            }
        }
    });
});

// AI 턴 
function executeAI () {
    let randomIndex, randomRow, randomColumn;

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

//승자 체크
function checkWinner () {
    for (let i = 0; i < liElementIndex.length; i++) {
        if (liElementIndex[i].every(function (element) {
            if (element !== null) {
                return liElementIndex[i][0] === element;
            }
        })) {
            alert(`Congraturations! '${liElementIndex[i][0]}'Player Win!!`);
            break;
        }
    }

    

    return false;
}
