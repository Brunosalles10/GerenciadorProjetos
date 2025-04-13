import { useNavigate } from "react-router-dom";
import ProjetoForm from "../project/ProjetoForm";
import styles from "./NovoProjeto.module.css";

function NovoProjeto() {
  const navigate = useNavigate();
  function createPost(project) {
    project.cost = 0;
    project.services = [];
    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        navigate("/Projetos", {
          state: { message: "Projeto criado com sucesso!" },
        });
      });
  }

  return (
    <div className={styles.novoprojeto_container}>
      <h1>Novo Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjetoForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  );
}

export default NovoProjeto;
