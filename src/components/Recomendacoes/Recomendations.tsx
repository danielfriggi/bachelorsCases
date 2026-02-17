import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { recomendacoes } from "./recomendacoes";
import "./Recomendations.scss";

export default function RecomendacoesCarousel() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    mode: "snap",
    slides: { perView: 3, spacing: 20 },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
  });


  return (
    <section className="recomendacoes-carousel" aria-label="Depoimentos de colegas">
      <h3>Depoimentos</h3>
      <div ref={sliderRef} className="keen-slider">
        {recomendacoes.map((rec, index) => (
          <div
            key={index}
            className="keen-slider__slide"
            tabIndex={0} // permite foco por teclado
            aria-label={`Depoimento de ${rec.nome}, cargo: ${rec.cargo}`}
          >
            <div className="card">
              <h3>{rec.nome}</h3>
              <p className="cargo">{rec.cargo}</p>
              <p className="depoimento">{rec.depoimento}</p>
            </div>
          </div>
        ))}
      </div>

    
    </section>
  );
}
