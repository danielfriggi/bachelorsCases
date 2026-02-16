import { useTheme } from "../../context/data-theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema entre claro e escuro"
      title="Alternar tema"
      className="theme-toggle"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
