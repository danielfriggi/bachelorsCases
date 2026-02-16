import { useState } from "react"; // Importe o useState
import { Link } from "react-router-dom";
import "./Header.css";
import ThemeToggle from "../Acessibility/ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-bar" role="banner">
      <div className="header-left">
        <Link to="/" className="logo" aria-label="Ir para a página inicial">
          Daniel Friggi
        </Link>
      </div>

      {/* Adicionamos a classe 'active' dinamicamente */}
      <nav className={`header-right ${isMenuOpen ? "active" : ""}`} role="navigation" aria-label="Menu principal">
        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/Ferramentas" className="nav-link" onClick={() => setIsMenuOpen(false)}>Ferramentas</Link>
        <Link to="/Jogos" className="nav-link" onClick={() => setIsMenuOpen(false)}>Jogos</Link>
        <Link to="/Contato" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contato</Link>
      </nav>

      <div className="header-controls">
        <ThemeToggle aria-label="Alternar tema claro/escuro" />
        
        {/* Botão Hambúrguer */}
        <button className="hamburger" onClick={toggleMenu} aria-label="Abrir menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
}