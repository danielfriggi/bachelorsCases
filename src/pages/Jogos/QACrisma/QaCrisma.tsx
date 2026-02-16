import { useState } from "react"
import "./qacrisma.css"

import perguntasFacil from "./facil"
import perguntasMedio from "./medio"
import perguntasDificil from "./dificil"

type Nivel = "facil" | "medio" | "dificil"

type Pergunta = {
  pergunta: string
  alternativas: string[]
  correta: string
}

const perguntas: Record<Nivel, Pergunta[]> = {
  facil: perguntasFacil,
  medio: perguntasMedio,
  dificil: perguntasDificil
}

function shuffleArray(array: string[]) {
  return [...array]
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export default function QaCrisma() {
  const [nivelAtual, setNivelAtual] = useState<Nivel | null>(null)
  const [perguntaAtual, setPerguntaAtual] = useState<Pergunta | null>(null)
  const [alternativas, setAlternativas] = useState<string[]>([])
  const [respondido, setRespondido] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)

  const [pontuacao, setPontuacao] = useState({
    facil: { acertos: 0, erros: 0 },
    medio: { acertos: 0, erros: 0 },
    dificil: { acertos: 0, erros: 0 }
  })

  const [usadas, setUsadas] = useState<Record<Nivel, number[]>>({
    facil: [],
    medio: [],
    dificil: []
  })

  function iniciarPergunta(nivel: Nivel) {
    const restantes = perguntas[nivel]
      .map((p, i) => ({ p, i }))
      .filter(item => !usadas[nivel].includes(item.i))

    if (restantes.length === 0) {
      alert("Você já respondeu todas as perguntas desse nível!")
      return
    }

    const sorteada = restantes[Math.floor(Math.random() * restantes.length)]

    setNivelAtual(nivel)
    setPerguntaAtual(sorteada.p)
    setAlternativas(shuffleArray(sorteada.p.alternativas))
    setRespondido(false)
  }

  function responder(alt: string) {
    if (!perguntaAtual || !nivelAtual || respondido) return

    const acertou = alt === perguntaAtual.correta

    setPontuacao(prev => ({
      ...prev,
      [nivelAtual]: {
        acertos: prev[nivelAtual].acertos + (acertou ? 1 : 0),
        erros: prev[nivelAtual].erros + (!acertou ? 1 : 0)
      }
    }))

    setRespondido(true)
  }

  return (
    <div className="qacrisma">
    <div className="container">
      <button id="howToPlayBtn" onClick={() => setModalAberto(true)}>?</button>

      {modalAberto && (
        <div className="modal" onClick={() => setModalAberto(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-modal" onClick={() => setModalAberto(false)}>&times;</span>
            <h2>Como Jogar</h2>
            <p>Escolha a dificuldade e responda às perguntas.</p>
          </div>
        </div>
      )}

      <h1>Jogo de Perguntas - Crisma</h1>

      <div>
        <button onClick={() => iniciarPergunta("facil")}>Fácil</button>
        <button onClick={() => iniciarPergunta("medio")}>Médio</button>
        <button onClick={() => iniciarPergunta("dificil")}>Difícil</button>
      </div>

      <div id="scoreBoard">
        <h3>Pontuação</h3>
        <p>Fácil: {pontuacao.facil.acertos} / {pontuacao.facil.erros}</p>
        <p>Médio: {pontuacao.medio.acertos} / {pontuacao.medio.erros}</p>
        <p>Difícil: {pontuacao.dificil.acertos} / {pontuacao.dificil.erros}</p>
      </div>

      {perguntaAtual && (
        <div id="questionContainer">
          <h2>{perguntaAtual.pergunta}</h2>
          <ul>
            {alternativas.map((alt, i) => {
              const correta = alt === perguntaAtual.correta
              return (
                <li
                  key={i}
                  onClick={() => responder(alt)}
                  style={{
                    color:
                      respondido && correta
                        ? "#62db5c"
                        : respondido && alt !== perguntaAtual.correta
                        ? "#db5c5c"
                        : "white",
                    fontWeight: respondido && correta ? "bold" : "normal"
                  }}
                >
                  {alt}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
    </div>
  )
}
