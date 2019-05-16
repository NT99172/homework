let lottoNumber = [],
    candidateLottoNumber = [],
    bonusNumber,
    bonus = document.querySelector('.bonus'),
    result = document.querySelector('.result');

for (let i = 1; i < 46; i++) {
    candidateLottoNumber.push(i);
}

while (lottoNumber.length < 7) {
    let randomNumber = Math.floor(Math.random() * candidateLottoNumber.length);
    lottoNumber.push(candidateLottoNumber[randomNumber]);
    candidateLottoNumber.splice(randomNumber, 1);
}
bonusNumber = lottoNumber.pop();
lottoNumber.sort((a, b) => a - b);


let clearID = setInterval(printLotto, 1000);
window.setTimeout(function() {
    bonus.innerHTML = '<span class="ball" data-level="' + Math.ceil(bonusNumber / 10) + '">' + bonusNumber + '</span>' + ' ';
}, 7000);

function printLotto () {
    if (lottoNumber.length) {
        firstLottoNumber = lottoNumber.shift();
        return result.innerHTML += '<span class="ball" data-level="' + Math.ceil(firstLottoNumber / 10) + '">' + firstLottoNumber + '</span>' + ' ';
    } else {
        clearInterval(clearID);
    }
}
  