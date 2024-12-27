let selectedWords = [];
let markedWords = new Set();

const wordsContainer = document.querySelector('.words-container');
const bingoTable = document.querySelector('.bingo-table');
const confirmSelectionBtn = document.getElementById('confirmSelection');
const userNameInput = document.getElementById('userNameInput');
const startGameBtn = document.getElementById('startGame');
const userNameDisplay = document.getElementById('userNameDisplay');

startGameBtn.addEventListener('click', () => {
    const userName = userNameInput.value.trim();
    if (userName === '') {
        alert('Por favor, insira seu nome para iniciar o jogo.');
        return;
    }

    userNameDisplay.textContent = `Bem-vindo, ${userName}!`;
    userNameDisplay.style.display = 'block';
    wordsContainer.style.display = 'flex';
    bingoTable.style.display = 'table';
});

wordsContainer.addEventListener('click', (event) => {
    if (!confirmSelectionBtn.disabled && event.target.classList.contains('word') && selectedWords.length < 9) {
        const word = event.target.textContent;
        if (!selectedWords.includes(word)) {
            selectedWords.push(word);
            event.target.classList.add('selected');
            updateTable();
        } else {
            alert('Essa palavra já foi selecionada!');
        }
    }
});

function updateTable() {
    const cells = bingoTable.querySelectorAll('td');
    cells.forEach((cell, index) => {
        const word = selectedWords[index] || '';
        cell.textContent = word;
        if (word && markedWords.has(word)) {
            cell.classList.add('marked');
        }
    });
}

bingoTable.addEventListener('click', (event) => {
    if (confirmSelectionBtn.disabled && event.target.tagName === 'TD') {
        const word = event.target.textContent;
        if (word) {
            if (markedWords.has(word)) {
                markedWords.delete(word);
                event.target.classList.remove('marked');
            } else {
                markedWords.add(word);
                event.target.classList.add('marked');
            }
            checkWin();
        }
    }
});

function checkWin() {
    const cells = Array.from(bingoTable.querySelectorAll('td'));
    const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];
    const cols = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];
    const diagonals = [
        [0, 4, 8],
        [2, 4, 6]
    ];

    const patterns = [...rows, ...cols, ...diagonals];
    
    for (let pattern of patterns) {
        if (pattern.every(index => cells[index].classList.contains('marked'))) {
            alert('BINGO! Você venceu!');
            return;
        }
    }
}

confirmSelectionBtn.addEventListener('click', () => {
    if (selectedWords.length < 9) {
        alert('Escolha exatamente 9 palavras antes de confirmar.');
    } else {
        alert('Escolhas confirmadas! Clique nas palavras sorteadas para marcá-las.');
        wordsContainer.style.pointerEvents = 'none';
        confirmSelectionBtn.disabled = true;
    }
});