import { useState } from 'react';

function Cadastro_Usuario() {
  // 1. Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUser, setTipoUser] = useState('cliente'); // Valor padrão

  // Função para lidar com o clique do botão
  async function botaoAdicionar(e) {
    e.preventDefault(); // Impede a página de recarregar

    const novoUsuario = {
      nome: nome,
      email: email,
      senha: senha,
      tipo: tipoUser
    };

    try {
      const envio = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
      });

      if (envio.ok) {
        alert("Usuário cadastrado com sucesso!");
        // Limpa os campos após o sucesso
        setNome('');
        setEmail('');
        setSenha('');
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Servidor offline ou erro de rede.");
    }
  }

  return (
    <div className="cadastro-container">
      <h1>Cadastrar Usuário</h1>
      
      <form onSubmit={botaoAdicionar} className="formulario-padrao">
        <div className="campo-grupo">
          <label>Nome:</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </div>

        <div className="campo-grupo">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="campo-grupo">
          <label>Senha:</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
          />
        </div>

        <div className="campo-grupo">
          <label>Tipo de Usuário:</label>
          <select value={tipoUser} onChange={(e) => setTipoUser(e.target.value)}>
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button type="submit">Salvar Usuário</button>
      </form>
    </div>
  );
}

export default Cadastro_Usuario;