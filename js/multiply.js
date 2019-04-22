window.onload = function() {
    let question = document.querySelector('.question');
    let input = document.querySelector('#input_answer');
    let timer = document.querySelector('#timer');
    let result = document.querySelector('#result');
    let limitTime = 10;
    let n1 = random();
    let n2 = random();
    let isOVer = false;

    question.textContent = `${n1} X ${n2} = ??`;

    function random () {
        return Math.floor(Math.random() * 8) + 2;
    }

    // setTimeout(function () {
    //     isOVer = true;
    //     alert('시간초과! 게임 오버');
    // }, (limitTime + 2) * 1000);

    let timerID = setInterval(function () {
        timer.textContent = limitTime;
        limitTime--;
        if (limitTime === -1) {
            clearInterval(timerID);
            alert('게임오버! 시간초과랍니다.')
        }
    }, 1000);

    document.querySelector('#form').addEventListener('submit', function (e) {
        e.preventDefault();
        if (isOVer) {
            return;
        }
        if (n1 * n2 === parseInt(input.value)) {
            n1 = random();
            n2 = random();
            question.textContent = `${n1} X ${n2} = ??`;
            result.textContent = '오! 정답입니다.';
        } else {
            result.textContent = '땡! 틀렸습니다.';   
        }

        input.focus();
        input.value = '';
    });
}
