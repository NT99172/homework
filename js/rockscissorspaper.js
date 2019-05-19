let image = document.querySelector('.img'),
    buttonsElement = Array.prototype.slice.call(document.getElementsByClassName('button')),
    resetButton = document.querySelector('.reload'),
    resultElement = document.querySelector('.result'),
    data = ['rock', 'scissors', 'paper'],
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
            if (index === data.length) {
                index = 0;
            }
        
            image.className = `img ${data[index]}`;
            index++;
        }, 100);
    }

    buttonsElement.forEach(item => item.addEventListener('click', shoot));

    function shoot (e) {
        clearInterval(timerID);

        let checkWin = e.target.getAttribute('data-hands') - convertData[data[index - 1]];
        if (checkWin === -1 || checkWin === 2) {
            resultElement.textContent = `${e.target.textContent}를 내서 이겼답니다.`;
            userWinElement.textContent = (userWinElement.textContent = parseInt(userWinElement.textContent) + 1) || 1;
        } else if (checkWin === 0) {
            resultElement.textContent = `${e.target.textContent}를 내서 비겼답니다.`;
            drawElement.textContent = (drawElement.textContent = parseInt(drawElement.textContent) + 1) || 1;
        } else {
            resultElement.textContent = `${e.target.textContent}를 내서 졌답니다.`;
            computerWinElement.textContent = (computerWinElement.textContent = parseInt(computerWinElement.textContent) + 1) || 1;
        }

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

    resetButton.style.display = 'none';
    resultElement.textContent = '가위? 바위? 보? 뭘 낼까요?';

    resetButton.addEventListener('click', () => {
        roulette();
        buttonsElement.forEach(item => {
            item.style.backgroundColor = '';
            item.style.border = '';
            item.removeAttribute('disabled');
            item.addEventListener('click', shoot)
        });
        resultElement.textContent = '가위? 바위? 보? 뭘 낼까요?';
        resetButton.style.display = 'none';
    });
    roulette();