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
    if (cells.every(cell => cell.classList.contains('marked'))) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
        audio.play();
        setTimeout(() => {
            alert('BINGO! Você completou toda a cartela! 🎉');
        }, 500);
    }
}

const audioLink = document.createElement('link');
audioLink.rel = 'preload';
audioLink.href = 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3';
audioLink.as = 'audio';
document.head.appendChild(audioLink);

confirmSelectionBtn.addEventListener('click', () => {
    if (selectedWords.length < 9) {
        alert('Escolha exatamente 9 palavras antes de confirmar.');
    } else {
        alert('Escolhas confirmadas! Clique nas palavras sorteadas para marcá-las.');
        wordsContainer.style.pointerEvents = 'none';
        confirmSelectionBtn.disabled = true;
    }
});