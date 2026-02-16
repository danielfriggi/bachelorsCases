
import perguntasFacil from './facil.js';
import perguntasMedio from './medio.js';
import perguntasDificil from './dificil.js';
document.addEventListener("DOMContentLoaded", () => {
let pontuacao = {
  facil: { acertos: 0, erros: 0 },
  medio: { acertos: 0, erros: 0 },
  dificil: { acertos: 0, erros: 0 }
};

let perguntas = {
  facil: perguntasFacil,
  medio: perguntasMedio,
  dificil: perguntasDificil
};

let usadas = {
  facil: [],
  medio: [],
  dificil: []
};

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("difficultyButtons").classList.remove("hidden");
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("scoreBoard").classList.remove("hidden");
});

document.getElementById("btnFacil").addEventListener("click", () => showQuestion('facil'));
document.getElementById("btnMedio").addEventListener("click", () => showQuestion('medio'));
document.getElementById("btnDificil").addEventListener("click", () => showQuestion('dificil'));

function showQuestion(nivel) {
  const restantes = perguntas[nivel].filter((_, i) => !usadas[nivel].includes(i));
  
  if (restantes.length === 0) {
    alert("Você já respondeu todas as perguntas desse nível!");
    return;
  }

  const idx = Math.floor(Math.random() * restantes.length);
  const pergunta = restantes[idx];
  const indexReal = perguntas[nivel].indexOf(pergunta);
 

  document.getElementById("questionText").textContent = pergunta.pergunta;

  const answersList = document.getElementById("answersList");
  answersList.innerHTML = "";
  answersList.classList.remove("respondido");


  function shuffleArray(array) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  const alternativasEmbaralhadas = shuffleArray(pergunta.alternativas);

  alternativasEmbaralhadas.forEach((alt) => {
    const li = document.createElement("li");
    li.textContent = alt;
    li.style.cursor = "pointer";
    li.style.color = "white"; 

    li.addEventListener("click", () => {
      if (answersList.classList.contains("respondido")) return;

      answersList.classList.add("respondido");

      if (alt === pergunta.correta) {
        li.style.color = "#62db5c";
        li.style.fontWeight = "bold";
        pontuacao[nivel].acertos++;
        usadas[nivel].push(indexReal);
      } else {
        li.style.color = "#db5c5c";
        li.style.fontWeight = "bold";
        pontuacao[nivel].erros++;
        usadas[nivel].push(indexReal);

        Array.from(answersList.children).forEach((item) => {
          if (item.textContent === pergunta.correta) {
            item.style.color = "#62db5c";
            item.style.fontWeight = "bold";
          }
        });
      }
      atualizarPlacar();
    });

    answersList.appendChild(li);
  });

  document.getElementById("questionContainer").classList.remove("hidden");
  document.getElementById("btnPular").classList.remove("hidden");
  document.getElementById("btnPular").onclick = () => {
    showQuestion(nivel); 
  };
}
const modal = document.getElementById("modalInstrucoes");
const btnHowToPlay = document.getElementById("howToPlayBtn");
const closeModal = document.querySelector(".close-modal");

btnHowToPlay.addEventListener("click", () => modal.classList.remove("hidden"));
closeModal.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

function atualizarPlacar() {
  document.getElementById("acertosFacil").textContent = pontuacao.facil.acertos;
  document.getElementById("errosFacil").textContent = pontuacao.facil.erros;

  document.getElementById("acertosMedio").textContent = pontuacao.medio.acertos;
  document.getElementById("errosMedio").textContent = pontuacao.medio.erros;

  document.getElementById("acertosDificil").textContent = pontuacao.dificil.acertos;
  document.getElementById("errosDificil").textContent = pontuacao.dificil.erros;
}
});