let ulElement = document.querySelector('.square'),
    resetButton = document.getElementById('reset'),
    liElement = Array.prototype.slice.call(ulElement.children),
    availableLiElement,
    row,
    column,
    liElementIndex = [[null, null, null], [null, null, null], [null, null, null]];
    turnMark = 'X';
    isMyTurn = true;


liElement.forEach(function (item, index) {
    item.addEventListener('click', selectThisBox(index));
});

function selectThisBox (index) {
    return function (e) {
        if (isMyTurn) {
            isMyTurn = false;
            console.log('my');
        } else {
            isMyTurn = true;
            console.log('AI\'s');
        }
        // row = Math.floor(index / 3);
        // column = index % 3;
        // e.target.textContent = turnMark;
        // liElementIndex[row][column] = turnMark;
        // isMyTurn === true ? isMyTurn = false : isMyTurn = true;
        // turnMark === 'X' ? turnMark = 'O' : turnMark = 'X';

        // availableLiElement = liElement.filter(function (item) {
        //     return item.children[0].textContent === '';
        // });
        
        // console.log(index, row, column,  liElement, availableLiElement, liElementIndex);
    }
}
