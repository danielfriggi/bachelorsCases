import "./StackSlider.scss";
import logos from "./logos";

export default function StackSlider() {
  const logosLoop = [...logos, ...logos];

  return (
    <section className="stack-slider" aria-label="Tecnologias que utilizo">
      <div className="slider-track">
        {logosLoop.map((logo, idx) => (
          <div className="slider-item" key={idx}>
            <img 
              src={logo.src} 
              alt={logo.alt || `Logo da tecnologia ${idx + 1}`} 
              role="img"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
