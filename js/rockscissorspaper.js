let image = document.querySelector('.img'),
    buttonsElement = Array.prototype.slice.call(document.getElementsByClassName('button')),
    resetButton = document.querySelector('.reload'),
    resultElement = document.querySelector('.result'),
    handsData = ['rock', 'scissors', 'paper'],
    convertData = {
        rock: 0,
        scissors: 1,
        paper: -1
    },
    timerID,
    userWinElement = document.querySelector('.userWin'),
    computerWinElement = document.querySelector('.computerWin'),
    drawElement = document.querySelector('.draw');

    let index = 0;
    function roulette () {
        timerID = setInterval(() => {
            image.className = `img ${handsData[index]}`;
            index++;
            if (index === handsData.length) {
                index = 0;
            }
        }, 100);
    }

    function initialize () {
        roulette();
        buttonsElement.forEach(item => {
            item.style.backgroundColor = '';
            item.style.border = '';
            item.removeAttribute('disabled');
            item.addEventListener('click', shoot);
        });
        resultElement.textContent = '가위? 바위? 보? 뭘 낼까요?';
        resetButton.style.display = 'none';
    }

    function shoot (e) {
        clearInterval(timerID);

        let playerHands = e.target.getAttribute('data-hands'),
            computerHands = convertData[image.classList[1]];

        checkWinner(playerHands, computerHands, e);
        

        buttonsElement.forEach(item => {
            if (item === e.target) {
                item.style.backgroundColor = '#ccc';
                item.style.border = '2px solid #333';
            } else {
                item.setAttribute('disabled', '');
            }
            item.removeEventListener('click',shoot)
        });
        resetButton.style.display = 'inline-block';
    }

    function checkWinner (a, b, e) {
        if ((a - b) === -1 || (a - b) === 2) {
            resultElement.textContent = `${e.target.textContent}를 내서 이겼답니다.`;
            userWinElement.textContent++;
        } else if ((a - b) === 0) {
            resultElement.textContent = `${e.target.textContent}를 내서 비겼답니다.`;
            drawElement.textContent++;
        } else {
            resultElement.textContent = `${e.target.textContent}를 내서 졌답니다.`;
            computerWinElement.textContent++;
        }
    }

    resetButton.addEventListener('click', initialize);

    initialize();