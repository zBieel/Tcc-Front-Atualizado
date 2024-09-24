import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './agendarmesas.css';
import api from "../../services/api";

const DataList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("users")
      .then(response => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    toast.info(
      <div>
        <span>Tem certeza que deseja excluir este item?</span>
        <button 
          onClick={() => confirmDelete(id)} 
          className="confirm-button" // Adicionando a classe de estilo
        >
          Confirmar
        </button>
      </div>, 
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const confirmDelete = (id) => {
    api.delete(`users/${id}`)
      .then(() => {
        setData(data.filter(item => item.id !== id));
        toast.success("Usuário excluído com sucesso!");
      })
      .catch(error => {
        setError(error.message);
        toast.error("Erro ao excluir o usuário.");
      });
  };

  if (loading) return <p className="message">Carregando...</p>;
  if (error) return <p className="message error">Erro: {error}</p>;

  return (
    <div className="list-container"> {/* Adicionando a classe do container */}
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.nome}
            <br />
            <br />
            {item.email}
            <br />
            <br />
            <button onClick={() => handleDelete(item.id)} className="confirm-button">Excluir</button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default DataList;
