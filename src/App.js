import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Contato from "./components/pages/Contato";
import Home from "./components/pages/Home";
import NovoProjeto from "./components/pages/NovoProjeto";
import Projects from "./components/pages/Projects";
import Projetos from "./components/pages/Projetos";
import Sobre from "./components/pages/Sobre";

function App() {
  return (
    <Router>
      <Navbar />

      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/Sobre" element={<Sobre />} />

          <Route path="/Contato" element={<Contato />} />

          <Route path="/Novoprojeto" element={<NovoProjeto />} />

          <Route path="/Projetos" element={<Projetos />} />

          <Route path="/Projects/:id" element={<Projects />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
