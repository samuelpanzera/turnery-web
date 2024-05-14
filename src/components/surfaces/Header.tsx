import { Link } from "react-router-dom";
import "../../styles/header.css";

function Header() {
  return (
    <header>
      <h1>Filmes</h1>

      <nav>
        <li>
          <Link to="/"> Home </Link>
        </li>
        <li>
          <Link to="./sobre">Sobre</Link>
        </li>
        <li>
          <Link to="./contato">Contato</Link>
        </li>
      </nav>
    </header>
  );
}

export default Header;
