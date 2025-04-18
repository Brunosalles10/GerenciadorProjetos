import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Container from "../layout/Container";
import Loading from "../layout/Loading";
import Message from "../layout/Menssage";
import ProjetoForm from "../project/ProjetoForm";
import ServiceForm from "../service/ServiceForm";
import styles from "./Projects.module.css";
function Projects() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [Type, setType] = useState("");
  const [showServiceForm, setShowServiceForm] = useState(false);

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  };

  const toggleServiceForm = () => {
    setShowServiceForm(!showServiceForm);
  };

  const createService = (project) => {
    setMensagem("");
    //pegando o ultimo serviço
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    //maximo valor do orçamento
    if (newCost > parseFloat(project.budget)) {
      setMensagem("Orçamento ultrapassado, verifique o valor do serviço");
      setType("error");
      project.services.pop();
      return false;
    }

    // adicionando serviço
    project.cost = newCost;

    //update project
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowServiceForm(false);
        setMensagem("Serviço adicionado com sucesso");
        setType("success");
        setProject(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProject(data);
        })
        .catch((err) => console.log(err));
    }, 3000);
  }, [id]);

  function editPost(project) {
    setMensagem("");
    if (project.budget < project.cost) {
      setMensagem("O orçamento não pode ser menor que o custo do projeto");
      setType("error");
      return false;
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMensagem("Projeto atualizado com sucesso");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {mensagem && <Message type={Type} msg={mensagem} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Fechar detalhes"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    {" "}
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    {" "}
                    <span>Total de Orçamento:</span> R$ {project.budget}
                  </p>
                  <p>
                    {" "}
                    <span>Total Utilizado:</span> R$ {project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjetoForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar Serviço" : "Fechar detalhes"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
          </Container>
          <h2>Serviços</h2>
          <Container customClass="start">
            <p>intens serviços</p>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
export default Projects;
