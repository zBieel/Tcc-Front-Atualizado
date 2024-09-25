import './login.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";

const Login = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      nome, // Mantém 'nome' como está
      senha,
    };
  
    try {
      const response = await api.post("/academico/api/v1/login", userData); // Endpoint correto
      console.log('Response:', response.data);
  
      // Verifica se a resposta contém um token
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/home'); // Redireciona para a página Home
      } else {
        alert('Login falhou. Verifique suas credenciais.'); // Feedback para o usuário
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocorreu um erro ao tentar fazer login.'); // Feedback para o usuário
    }
  };  

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="app-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <img src="img/logo.png" alt="Logo" className="logo" />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Usuário"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className="form-group buttons-group">
          <button type="submit">Entrar</button>
          <span onClick={toggleTheme} className="theme-toggle-button">
            {theme === 'light' ? '🌙' : '☀️'}
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
