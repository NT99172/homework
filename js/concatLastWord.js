// let word = '바나나';
// let inputWord;

// while (true) {
//     inputWord = prompt(word);

//     if (inputWord === null) break;
    
//     if (word[word.length - 1] === inputWord[0]) {
//         alert('정답.');
//         word = inputWord; 
//     } else {
//         alert('오답');
//     }
// }
window.onload = function() {
    let word, input;

    document.querySelector('#form').addEventListener('submit', function(e){
        e.preventDefault();
        word = document.querySelector('.word');
        input = document.querySelector('#input_word');
        
        if (word.textContent[word.textContent.length - 1] === input.value[0]) {
            word.textContent = input.value;
        } else {
            alert('땡!');
        }
        
        input.value= '';
        input.focus();
    });
}
