import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./ProjetoCard.module.css";
function ProjetoCard({ id, name, budget, category, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <div className={styles.projeto_card}>
      <h4>{name}</h4>
      <p>
        <span>Custo:</span> R$ {budget}
      </p>
      <p className={styles.categoria_text}>
        <span className={`${styles[category?.name?.toLowerCase()]}`}>:</span>
        {category?.name}
      </p>
      <div className={styles.projeto_card_actions}>
        <Link to={`/Projects/${id}`}>
          <BsPencil />
          Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  );
}
export default ProjetoCard;
