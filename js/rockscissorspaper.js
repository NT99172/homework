let image = document.querySelector('.img'),
    buttonsElement = Array.prototype.slice.call(document.getElementsByClassName('button')),
    resetButton = document.querySelector('.reload'),
    data = ['rock', 'scissors', 'paper'],
    userData,
    timerID;

    let index = 0;
    function roulette () {

        timerID = setInterval(() => {
            if (index === data.length) {
                index = 0;
            }
        
            image.className = 'img' + ' ' + data[index];
            index++;
        }, 100);
    }

    buttonsElement.forEach(item => item.addEventListener('click', (e) => {
            clearInterval(timerID);
            userData = e.target.getAttribute('data-hands');
            console.log('내가 낸 값' + userData + '\n' + '컴퓨터가 낸 값' + data[index]);
        })
    );
    resetButton.addEventListener('click', roulette);
    roulette();




