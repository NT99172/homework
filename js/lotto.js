let lottoNumber = [],
    candidateLottoNumber = [],
    randomNumber;

for (let i = 1; i < 46; i++) {
    candidateLottoNumber.push(i);
}

while (lottoNumber.length < 7) {
    randomNumber = Math.floor(Math.random() * candidateLottoNumber.length);
    lottoNumber.push(candidateLottoNumber[randomNumber]);
    candidateLottoNumber.splice(randomNumber, 0);
}

lottoNumber.sort((a, b) => a - b);

