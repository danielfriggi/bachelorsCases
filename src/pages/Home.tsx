//import { Link } from "react-router-dom"
import "../styles/home.css"
import Header from "../components/Header/Header"
import Apresentacao from "../components/Presentation/Apresentacao"
import Footer from "../components/Footer/Footer"
import StackSlider from "../components/Stacks/StackSlider"
import RecomendacoesCarousel from "../components/Recomendacoes/Recomendations"

function Home() {
  return (
     <div className="home">
      <Header/>
      <Apresentacao/>
      <StackSlider/>
      <RecomendacoesCarousel/>
      <Footer/>
    </div>
   
  )
}

export default Home
