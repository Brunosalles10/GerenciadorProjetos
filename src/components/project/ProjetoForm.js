import React, { useEffect, useState } from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "./ProjetoForm.module.css";

function ProjetoForm({ handleSubmit, btnText, projectData }) {
  {
    /* SETA PARA ARRAY VAZIO ESPERANDO RESPOSTA DA API */
  }
  const [project, setProject] = useState(projectData || {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      mathod: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const submit = (event) => {
    event.preventDefault();
    handleSubmit(project);
  };

  function handleChange(event) {
    setProject({
      ...project,
      [event.target.name]: event.target.value,
    });
  }

  function handleCategory(event) {
    setProject({
      ...project,
      category: {
        id: event.target.value,
        name: event.target.options[event.target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name}
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={project.bugdet}
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ""}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjetoForm;
