import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import Message from "../layout/Menssage";
import ProjetoCard from "../project/ProjetoCard";
import styles from "./Projetos.module.css";
function Projetos() {
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  let message = location.state ? location.state.message : "";

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/NovoProjeto" text="Criar Projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjetoCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category}
              key={project.id}
            />
          ))}
        {projects.length === 0 && <p>Não há projetos cadastrados</p>}
      </Container>
    </div>
  );
}

export default Projetos;
