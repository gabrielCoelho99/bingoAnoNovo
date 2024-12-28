const words = [
  "Paz",
  "Felicidade",
  "Amor",
  "Alegria",
  "Fé",
  "Saúde",
  "Esperança",
  "Afeto",
  "Harmonia",
  "Sorte",
  "Prosperidade",
  "Sucesso",
  "Carinho",
  "Amizade",
  "Coragem",
  "Sabedoria",
  "Força",
  "Bondade",
  "Otimismo",
  "Sinceridade",
  "Justiça",
  "Fraternidade",
  "Inteligência",
  "Disponibilidade",
  "Caridade",
  "Fidelidade",
  "Dignidade",
  "Responsabilidade",
  "Tolerância",
  "Solidariedade",
  "Perseverança",
  "Respeito",
  "Compreensão",
  "Oração",
  "Vitória",
  "Perdão",
  "Espiritualidade",
  "Diálogo",
  "Confiança",
  "Partilha",
  "Comunhão",
  "Unidade",
];

let drawnWords = [];
// Defina o caminho do seu arquivo de áudio aqui
const bingoSound = new Audio("./assets/roda a roda.mp3");
const drawWordBtn = document.getElementById("drawWord");
const drawnWordDisplay = document.getElementById("drawnWord");
const drawnWordsList = document.getElementById("drawnWordsList");

function playDrawAnimation() {
  let shuffleDuration = 5000; // Duração do embaralhamento (5 segundos)
  let totalDuration = 7000; // Duração total do áudio (7 segundos)
  let wordCount = 50; // Quantidade de palavras mostradas durante o embaralhamento
  let interval = shuffleDuration / wordCount;
  let count = 0;

  // Inicia o áudio do início
  bingoSound.currentTime = 0;
  bingoSound.play();

  const animationInterval = setInterval(() => {
    drawnWordDisplay.textContent =
      words[Math.floor(Math.random() * words.length)];
    count++;

    if (count === wordCount) {
      clearInterval(animationInterval);
      // Aguarda até o momento de mostrar a palavra final (no quinto segundo)
      setTimeout(() => {
        const finalWord = getRandomWord();
        drawnWordDisplay.textContent = finalWord;
        drawnWordDisplay.classList.add("highlight");
        setTimeout(() => drawnWordDisplay.classList.remove("highlight"), 500);
        drawnWords.push(finalWord);
        updateDrawnWordsList();
      }, 5000 - shuffleDuration); // Ajusta o timing para coincidir com o áudio
    }
  }, interval);
}

function getRandomWord() {
  let availableWords = words.filter((word) => !drawnWords.includes(word));
  if (availableWords.length === 0) {
    alert("Todas as palavras já foram sorteadas!");
    drawWordBtn.disabled = true;
    return "BINGO FINALIZADO!";
  }
  return availableWords[Math.floor(Math.random() * availableWords.length)];
}

function updateDrawnWordsList() {
  drawnWordsList.innerHTML =
    "<strong>Palavras já sorteadas:</strong><br>" + drawnWords.join(", ");
}

drawWordBtn.addEventListener("click", () => {
  if (!drawWordBtn.disabled) {
    drawWordBtn.disabled = true;
    playDrawAnimation();
    // Habilita o botão novamente após o término completo da animação e áudio
    setTimeout(() => (drawWordBtn.disabled = false), 7000);
  }
});

// Preload do áudio
window.addEventListener("load", () => {
  bingoSound.load();
});

// Suporte para dispositivos móveis
document.addEventListener(
  "touchstart",
  () => {
    bingoSound.play().then(() => {
      bingoSound.pause();
      bingoSound.currentTime = 0;
    });
  },
  { once: true }
);
