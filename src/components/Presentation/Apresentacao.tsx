import { Link } from "react-router-dom";
import "./Apresentacao.css";
import minhaFoto from "../../assets/profile.jpeg"; 

export default function Apresentacao() {
  return (
    <section className="apresentacao" aria-label="Seção de apresentação pessoal">
      <div className="apresentacao-container">
        <div className="apresentacao-imagem">
          <img 
            src={minhaFoto} 
            alt="Foto de Daniel, desenvolvedor de software" 
          />
        </div>
        <div className="apresentacao-texto">
          <h2>Olá, eu sou Daniel</h2>
          <p>
            Sou desenvolvedor de software e mentor de novos talentos na área de tecnologia,
            com experiência em Inteligência Artificial, análise de dados e desenvolvimento
            de ferramentas digitais. Além disso, atuo com modelagem 3D, impressão 3D e
            criação de projetos interativos, sempre buscando soluções criativas e eficientes
            para desafios reais. Aqui você encontra meus projetos, ferramentas e trabalhos
            que já realizei ao longo da minha carreira.
          </p>
          <Link to="/Contato">
            <button 
              className="btn-contato"
              aria-label="Entrar em contato com Daniel"
            >
              Entrar em contato
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
