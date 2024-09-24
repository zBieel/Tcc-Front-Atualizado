import './header.css';
import { Link } from 'react-router-dom'

function Header(){

    return(
            <header>
                <a href="/" className="logo">RESERVAKI</a>
                <a href="/usuario" className="usuario">Cadastrar Usuário</a>
                <a href="/agendarmesas" className="usuario">Agendar Mesas</a>
            </header>

    )

}

export default Header;

