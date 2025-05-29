import perguntasFacil from './facil.js';
import perguntasMedio from './medio.js';
import perguntasDificil from './dificil.js';

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
});

function showQuestion(nivel) {
  const restantes = perguntas[nivel].filter((_, i) => !usadas[nivel].includes(i));
  
  if (restantes.length === 0) {
    alert("Você já respondeu todas as perguntas desse nível!");
    return;
  }

  const idx = Math.floor(Math.random() * restantes.length);
  const pergunta = restantes[idx];
  const indexReal = perguntas[nivel].indexOf(pergunta);
  usadas[nivel].push(indexReal);

  document.getElementById("questionText").textContent = pergunta.pergunta;

  const answersList = document.getElementById("answersList");
  answersList.innerHTML = "";
  pergunta.alternativas.forEach((alt) => {
    const li = document.createElement("li");
    li.textContent = alt;
    if (alt === pergunta.correta) {
      li.style.fontWeight = "bold";
      li.style.color = "#62db5c";
    }
    answersList.appendChild(li);
  });

  document.getElementById("questionContainer").classList.remove("hidden");
  document.getElementById("nextButtons").classList.remove("hidden");
}

