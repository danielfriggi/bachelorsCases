import { useState, useRef } from "react";
import emailjs from "emailjs-com";
import "../styles/contato.css";
import Header from "../components/Header/Header";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const enviarEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("Enviando...");

    emailjs
      .sendForm(
        "service_at6ie0i",
        "template_xso8sqo",
        formRef.current,
        "725Wl450d-OPDanqt"
      )
      .then(
        () => {
          setStatus("Mensagem enviada! Entrarei em contato em breve.");
          setNome("");
          setEmail("");
          setMensagem("");
        },
        (err) => {
          console.error(err);
          setStatus("Erro ao enviar. Tente novamente mais tarde.");
        }
      );
  };

  return (
    <div>
      <Header />
      <main className="contato-page">
        <h1>Fale comigo</h1>

        <section className="contato-form">
          <form ref={formRef} onSubmit={enviarEmail}>
            <label>
              Nome
              <input
                type="text"
                name="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                aria-required="true"
              />
            </label>
            <label>
              E-mail
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
              />
            </label>
            <label>
              Mensagem
              <textarea
                name="message"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                rows={5}
                required
                aria-required="true"
              ></textarea>
            </label>
            <button type="submit">Enviar</button>
            {status && <p className="status" role="status">{status}</p>}
          </form>
        </section>

        <section className="contato-cards" role="region" aria-label="Contatos e links">
          <div className="card">
            <svg viewBox="0 0 40 40" height="40" preserveAspectRatio="xMidYMid meet" fill="none"><title>wa-square-icon</title><rect width="40" height="40" rx="2" fill="#25D366"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M7.16382 19.8867C7.16666 12.8126 12.9486 7.05882 20.0527 7.05882C23.4986 7.06024 26.7359 8.39611 29.1691 10.8205C31.6023 13.2448 32.9425 16.4695 32.9412 19.897C32.9383 26.9711 27.156 32.7255 20.0526 32.7255C17.9484 32.7248 15.8827 32.2146 14.0352 31.2426L7.58219 32.9272C7.27122 33.0084 6.989 32.7225 7.07425 32.4126L8.79752 26.1482C7.72503 24.2382 7.16292 22.0869 7.16382 19.8867ZM20.0463 30.4359H20.042C18.1611 30.4352 16.3163 29.9322 14.7069 28.9817L14.3241 28.7556L10.3569 29.7914L11.4158 25.9417L11.1666 25.547C10.1173 23.886 9.56313 21.9663 9.56399 19.9951C9.56629 14.2432 14.2686 9.5636 20.0505 9.5636C22.8502 9.56454 25.482 10.6511 27.4612 12.6231C29.4402 14.5949 30.5294 17.216 30.5283 20.0035C30.526 25.7559 25.8237 30.4359 20.0463 30.4359ZM23.5806 21.4974C23.8678 21.6029 25.4084 22.3667 25.7217 22.5247C25.7829 22.5556 25.84 22.5834 25.893 22.6092C26.1116 22.7156 26.2593 22.7875 26.3223 22.8935C26.4006 23.0252 26.4006 23.6574 26.1395 24.3951C25.8784 25.1326 24.6265 25.8058 24.0245 25.8964C23.4846 25.9777 22.8015 26.0116 22.0509 25.7713C21.5958 25.6258 21.0121 25.4315 20.2645 25.1061C17.3272 23.8281 15.3422 20.9596 14.9667 20.4169C14.9403 20.3789 14.9219 20.3522 14.9116 20.3384L14.9091 20.335C14.7433 20.1122 13.6321 18.6183 13.6321 17.0721C13.6321 15.6177 14.3411 14.8553 14.6675 14.5044C14.6898 14.4803 14.7104 14.4582 14.7288 14.4379C15.0161 14.1219 15.3556 14.0429 15.5645 14.0429C15.7733 14.0429 15.9824 14.0448 16.165 14.054C16.1875 14.0551 16.211 14.055 16.2352 14.0548C16.4178 14.0538 16.6455 14.0525 16.87 14.5959C16.9562 14.8047 17.0823 15.114 17.2153 15.4403C17.4852 16.1024 17.7836 16.8347 17.8361 16.9405C17.9145 17.0985 17.9667 17.2829 17.8622 17.4937C17.8466 17.5253 17.8321 17.5551 17.8182 17.5836C17.7398 17.745 17.6821 17.8637 17.5489 18.0204C17.4968 18.0818 17.4429 18.1479 17.389 18.2141C17.281 18.3466 17.1729 18.4792 17.0789 18.5736C16.922 18.731 16.7587 18.9019 16.9415 19.218C17.1243 19.5341 17.7532 20.5681 18.6846 21.4053C19.686 22.3054 20.5563 22.6858 20.9974 22.8786C21.0835 22.9162 21.1533 22.9467 21.2045 22.9725C21.5178 23.1307 21.7007 23.1042 21.8834 22.8935C22.0662 22.6828 22.6667 21.9715 22.8756 21.6554C23.0845 21.3395 23.2934 21.3921 23.5806 21.4974Z" fill="white" ></path></svg>

            <a
              href="https://wa.me/5512988189023"
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir WhatsApp do Daniel Friggi"
            >
              +55 12 98818-9023
            </a>
          </div>

          <div className="card">
             <svg width="800px" height="800px" viewBox="0 -2.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
            </defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -922.000000)" fill="#000000">
                        <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path d="M262,764.291 L254,771.318 L246,764.281 L246,764 L262,764 L262,764.291 Z M246,775 L246,766.945 L254,773.98 L262,766.953 L262,775 L246,775 Z M244,777 L264,777 L264,762 L244,762 L244,777 Z" id="email-[#1573]">
            </path>
                        </g>
                    </g>
                </g>
            </svg>

            <a
              href="mailto:friggidaniel@gmail.com"
              aria-label="Enviar email para Daniel Friggi"
            >
              friggidaniel@gmail.com
            </a>
          </div>

          <div className="card">
        <svg xmlns="http://www.w3.org/2000/svg" id="linkedin-bug-blue-medium" width="34" height="34" aria-hidden="false" data-supported-dps="34x34" viewBox="0 0 34 34" data-token-id="417"   role="img" aria-label="LinkedIn" ><path fill="#0a66c2" d="M34 2.5v29a2.5 2.5 0 0 1-2.5 2.5h-29A2.5 2.5 0 0 1 0 31.5v-29A2.5 2.5 0 0 1 2.5 0h29A2.5 2.5 0 0 1 34 2.5M10 13H5v16h5zm.45-5.5a2.88 2.88 0 0 0-2.86-2.9H7.5a2.9 2.9 0 0 0 0 5.8 2.88 2.88 0 0 0 2.95-2.81zM29 19.28c0-4.81-3.06-6.68-6.1-6.68a5.7 5.7 0 0 0-5.06 2.58h-.14V13H13v16h5v-8.51a3.32 3.32 0 0 1 3-3.58h.19c1.59 0 2.77 1 2.77 3.52V29h5z" display="var(--svgDisplayLight)"></path><path fill="#0a66c2" d="M34 2.5v29a2.5 2.5 0 0 1-2.5 2.5h-29A2.5 2.5 0 0 1 0 31.5v-29A2.5 2.5 0 0 1 2.5 0h29A2.5 2.5 0 0 1 34 2.5M10 13H5v16h5zm.45-5.5a2.88 2.88 0 0 0-2.86-2.9H7.5a2.9 2.9 0 0 0 0 5.8 2.88 2.88 0 0 0 2.95-2.81zM29 19.28c0-4.81-3.06-6.68-6.1-6.68a5.7 5.7 0 0 0-5.06 2.58h-.14V13H13v16h5v-8.51a3.32 3.32 0 0 1 3-3.58h.19c1.59 0 2.77 1 2.77 3.52V29h5z" display="var(--svgDisplayDark)"></path></svg>

            <a
              href="https://www.linkedin.com/in/danielfriggi"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn do Daniel Friggi"
            >
              linkedin.com/in/danielfriggi
            </a>
          </div>

          <div className="card">
                <svg aria-hidden="true" focusable="false"  viewBox="0 0 24 24" width="32" height="32" fill="currentColor" display="inline-block" overflow="visible" ><path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path></svg>

            <a
              href="https://github.com/danielfriggi"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub do Daniel Friggi"
            >
              github.com/danielfriggi
            </a>
          </div>

          <div className="card">
            <a
              href="public/cv.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Baixar currículo em PDF"
            >
              Baixar Currículo
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
