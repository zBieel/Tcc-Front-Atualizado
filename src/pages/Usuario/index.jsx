import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify"; // Importando ToastContainer e toast
import 'react-toastify/dist/ReactToastify.css'; // Importando os estilos do Toast
import './usuario.css';
import api from "../../services/api";

const Usuario = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("users", {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        tipoUsuario: "Funcionario",
        sobrenome: "null"
      });
      console.log(response.data);
      toast.success("Usuário cadastrado com sucesso!"); // Notificação de sucesso
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar usuário. Tente novamente."); // Notificação de erro
    }
  };

  return (
    <div className="app-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form-group">
        <div>
          <label>Nome</label>
          <input
            type="text"
            placeholder="Seu Nome"
            {...register("nome", { required: "Nome é obrigatório." })}
          />
          {errors.nome && <span className="error">{errors.nome.message}</span>}
        </div>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Seu Email"
            {...register("email", { 
              required: "E-mail é obrigatório.", 
              pattern: { 
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, 
                message: "E-mail inválido." 
              } 
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            placeholder="Sua Senha"
            {...register("senha", { required: "Senha é obrigatória." })}
          />
          {errors.senha && <span className="error">{errors.senha.message}</span>}
        </div>
        <div>
          <button type="submit">Criar Conta</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Usuario;
