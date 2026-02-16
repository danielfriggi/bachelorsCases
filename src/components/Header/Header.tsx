import { Link } from "react-router-dom";
import "./Header.css";
import ThemeToggle from "../Acessibility/ThemeToggle";

export default function Header() {
  return (
    <header className="header-bar" role="banner">
      <div className="header-left">
        <Link to="/" className="logo" aria-label="Ir para a página inicial">
          Daniel Friggi
        </Link>
      </div>

      <nav className="header-right" role="navigation" aria-label="Menu principal">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/Ferramentas" className="nav-link">Ferramentas</Link>
        <Link to="/Jogos" className="nav-link">Jogos</Link>
        <Link to="/Contato" className="nav-link">Contato</Link>
      </nav>

      <ThemeToggle aria-label="Alternar tema claro/escuro" />
    </header>
  );
}
