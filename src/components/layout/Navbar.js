import { Link } from "react-router-dom";

import logo from "../../img/costs_logo.png";
import Container from "./Container";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to={"/"}>
          <img src={logo} alt="costs" />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="/Sobre">Sobre</Link>
          </li>
          <li className={styles.item}>
            <Link to="/Contato">Contato</Link>
          </li>
          <li className={styles.item}>
            <Link to="/Novoprojeto">Novo Projeto</Link>
          </li>
          <li className={styles.item}>
            <Link to="/Projetos">Projetos</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
