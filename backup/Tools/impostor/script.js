let players = [];
let currentPlayerIndex = 0;
let commonWord = "";
let impostorIndex = -1;
let timerInterval = null;
let timerValue = 0;

const palavrasJSON = {
  "frutas": ["maçã","banana","laranja","uva","manga"],
  "animais": ["cachorro","gato","elefante","leão","tigre"],
  "objetos": ["cadeira","mesa","caneta","livro","garrafa"],
  "cores": ["vermelho","azul","verde","amarelo","roxo"],
  "profissoes": ["médico","engenheiro","professor","advogado","arquiteto"],
  "esportes": ["futebol","basquete","tênis","natação","voleibol"]
};

function startProgressiveTimer() {
    const timeEl = document.getElementById("timeLeft");

    // reset visual do timer
    timerValue = 0;
    timeEl.textContent = timerValue;

    // se já existir um timer, limpa
    if (timerInterval) clearInterval(timerInterval);

    // inicia novo timer
    timerInterval = setInterval(() => {
        timerValue++;
        timeEl.textContent = timerValue;
    }, 1000);
}

// ===================
// Adicionar jogador
// ===================
function addPlayer() {
    const nameInput = document.getElementById("playerName");
    const name = nameInput.value.trim();
    if(name){
        players.push(name);
        const li = document.createElement("li");
        li.textContent = name;
        document.getElementById("playerList").appendChild(li);
        nameInput.value = "";
    }
}

// ===================
// Iniciar jogo
// ===================
function startGame() {
    if(players.length < 3){
        alert("Adicione pelo menos 3 jogadores!");
        return;
    }

    const categorySelect = document.getElementById("category");
    const category = categorySelect ? categorySelect.value : null;

    commonWord = getRandomWord(category);
    impostorIndex = Math.floor(Math.random() * players.length);

    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";
    currentPlayerIndex = 0;

    showCurrentTurn();
}

// ===================
// Selecionar palavra aleatória
// ===================
function getRandomWord(category){
    let words = [];
    if(category && palavrasJSON[category]){
        words = palavrasJSON[category];
    } else {
        Object.values(palavrasJSON).forEach(arr => {
            words = words.concat(arr);
        });
    }
    return words[Math.floor(Math.random() * words.length)];
}

// ===================
// Mostrar turno atual
// ===================
function showCurrentTurn() {
    const playerTurn = document.getElementById("playerTurn");
    const wordEl = document.getElementById("word");
    const revealBtn = document.getElementById("revealWordBtn");
    const nextBtn = document.querySelector(".primary-btn[onclick='nextPlayer()']");
    const impostorBtn = document.getElementById("revealImpostorBtn");

    wordEl.style.display = "none";
    impostorBtn.style.display = "none";

    playerTurn.textContent = `Vez de: ${players[currentPlayerIndex]}`;

    revealBtn.style.display = "inline-block";
    revealBtn.textContent = "Mostrar palavra";

    if(currentPlayerIndex === players.length - 1){
        // último jogador
        nextBtn.style.display = "none";
        revealBtn.onclick = revealWordForLastPlayer;
    } else {
        nextBtn.style.display = "inline-block";
        revealBtn.onclick = revealWordNormal;
    }
}

// ===================
// Mostrar/esconder palavra normal (não último jogador)
function revealWordNormal() {
    const wordEl = document.getElementById("word");
    const revealBtn = document.getElementById("revealWordBtn");

    if(wordEl.style.display === "none"){
        wordEl.style.display = "block";
        wordEl.textContent = currentPlayerIndex === impostorIndex ? "IMPOSTOR" : commonWord;
        revealBtn.textContent = "Esconder palavra";
    } else {
        wordEl.style.display = "none";
        revealBtn.textContent = "Mostrar palavra";
    }
}

// ===================
// Mostrar palavra último jogador e depois começar jogo
function revealWordForLastPlayer() {
    const wordEl = document.getElementById("word");
    const revealBtn = document.getElementById("revealWordBtn");
    const timeEl = document.getElementById("timeLeft");
    
    if(revealBtn.textContent === "Mostrar palavra"){
        wordEl.style.display = "block";
        wordEl.textContent = currentPlayerIndex === impostorIndex ? "IMPOSTOR" : commonWord;
        revealBtn.textContent = "Começar o jogo";
    } else if(revealBtn.textContent === "Começar o jogo"){
    wordEl.style.display = "none";
    revealBtn.style.display = "none";
    document.getElementById("playerTurn").style.display = "none";

    const impostorBtn = document.getElementById("revealImpostorBtn");
    impostorBtn.style.display = "inline-block"; 
    document.getElementById("endGame").style.display = "block"; 

    startProgressiveTimer();
}

}

// ===================
// Próximo jogador
// ===================
function nextPlayer() {
    currentPlayerIndex++;
    if(currentPlayerIndex < players.length){
        showCurrentTurn();
    }
}

// ===================
// Revelar impostor
// ===================
function revealImpostor() {
    if(confirm("Tem certeza que quer revelar o impostor?")){
        document.getElementById("impostorReveal").textContent = `${players[impostorIndex]}`;
    }
}

// ===================
// Resetar jogo
// ===================
function resetGame() {
    const manter = confirm("Deseja manter jogadores e categoria?");

    if(!manter){
        players = [];
        document.getElementById("playerList").innerHTML = "";
        document.getElementById("category").value = "";


    }

    currentPlayerIndex = 0;
    commonWord = "";
    impostorIndex = -1;

    document.getElementById("game").style.display = manter ? "block" : "none";
    document.getElementById("setup").style.display = manter ? "none" : "block";
    document.getElementById("impostorReveal").textContent = "";
    document.getElementById("word").style.display = "none";
    document.getElementById("revealWordBtn").style.display = "inline-block";
    document.getElementById("revealWordBtn").textContent = "Mostrar palavra";
    document.getElementById("revealImpostorBtn").style.display = "none";
    document.getElementById("playerTurn").style.display = "block";
    document.getElementById("endGame").style.display = "none"; 

    if(manter){
        commonWord = getRandomWord(document.getElementById("category").value);
        impostorIndex = Math.floor(Math.random() * players.length);
        showCurrentTurn();
    }
}

