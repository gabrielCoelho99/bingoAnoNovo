// Lista de todas as palavras disponíveis
const words = [
    "Paz", "Felicidade", "Amor", "Alegria", "Fé", "Saúde", "Esperança", "Afeto", 
    "Harmonia", "Sorte", "Prosperidade", "Sucesso", "Carinho", "Amizade", "Coragem",
    "Sabedoria", "Força", "Bondade", "Otimismo", "Sinceridade", "Justiça", 
    "Fraternidade", "Inteligência", "Disponibilidade", "Caridade", "Fidelidade",
    "Dignidade", "Responsabilidade", "Tolerância", "Solidariedade", "Perseverança",
    "Respeito", "Compreensão", "Oração", "Vitória", "Perdão", "Espiritualidade",
    "Diálogo", "Confiança", "Partilha", "Comunhão", "Unidade"
];

let drawnWords = [];

const drawWordBtn = document.getElementById('drawWord');
const drawnWordDisplay = document.getElementById('drawnWord');
const drawnWordsList = document.getElementById('drawnWordsList');

drawWordBtn.addEventListener('click', () => {
    if (drawnWords.length === words.length) {
        alert('Todas as palavras já foram sorteadas!');
        return;
    }

    let randomWord;
    do {
        randomWord = words[Math.floor(Math.random() * words.length)];
    } while (drawnWords.includes(randomWord));

    drawnWords.push(randomWord);
    drawnWordDisplay.textContent = randomWord;
    updateDrawnWordsList();
});

function updateDrawnWordsList() {
    drawnWordsList.textContent = 'Palavras já sorteadas: ' + drawnWords.join(', ');
}