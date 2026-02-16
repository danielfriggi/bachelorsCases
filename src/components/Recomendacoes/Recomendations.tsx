import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { recomendacoes } from "./recomendacoes";
import "./Recomendations.scss";

export default function RecomendacoesCarousel() {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    mode: "snap",
    slides: { perView: 3, spacing: 20 },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
  });

  const goPrev = () => slider?.current?.prev();
  const goNext = () => slider?.current?.next();

  return (
    <section className="recomendacoes-carousel" aria-label="Depoimentos de colegas">
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

      {/* Botões para desktop */}
      {window.innerWidth > 768 && (
        <div className="buttons" role="group" aria-label="Controle do carrossel de depoimentos">
          <button onClick={goPrev} aria-label="Depoimentos anteriores">
            &lt;
          </button>
          <button onClick={goNext} aria-label="Próximos depoimentos">
            &gt;
          </button>
        </div>
      )}
    </section>
  );
}
