let selectedWords = [];

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
    if (event.target.classList.contains('word') && selectedWords.length < 9) {
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
        cell.textContent = selectedWords[index] || '';
    });
}

confirmSelectionBtn.addEventListener('click', () => {
    if (selectedWords.length < 9) {
        alert('Escolha exatamente 9 palavras antes de confirmar.');
    } else {
        alert('Escolhas confirmadas! Boa sorte no jogo.');
        // Desabilita a seleção de novas palavras após confirmação
        wordsContainer.style.pointerEvents = 'none';
        confirmSelectionBtn.disabled = true;
    }
});