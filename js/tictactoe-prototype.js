let ulElement = document.querySelector('.square'),
    resetButton = document.getElementById('reset'),
    liElement = Array.prototype.slice.call(ulElement.children),
    availableLiElement,
    row,
    column,
    liElementIndex = [[null, null, null], [null, null, null], [null, null, null]],
    turnMark = 'X',
    isMyTurn = true,
    random;


liElement.forEach(function (item, index) {
    item.addEventListener('click', selectThisBox(index));
});

function selectThisBox (index) {
    return function (e) {
        row = Math.floor(index / 3);
        column = index % 3;
        
        e.target.textContent = turnMark;
        liElementIndex[row][column] = turnMark;
        
        // isMyTurn = isMyTurn ? false : true;
        isMyTurn = !isMyTurn;
        turnMark = turnMark === 'X' ? 'O' : 'X';
        
        availableLiElement = liElement.filter(function (item) {
            return item.children[0].textContent === '';
        });

        if ( isMyTurn === false ) {
            random = Math.floor(Math.random() * availableLiElement.length);
            availableLiElement[random].children[0].click();
        }

        console.log(liElement, availableLiElement, liElementIndex);
    }
}
