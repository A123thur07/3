import { useState } from 'react';

function Cadastro_Servico() {
  // 1. Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [duracao, setDuracao] = useState('');

  // Função para lidar com o clique do botão
  async function botaoAdicionar(e) {
    e.preventDefault(); // Impede a página de recarregar

    const novoServico = {
      nome: nome,
      descricao: descricao,
      preco: preco,
      duracao: duracao
    };

    try {
      const envio = await fetch('http://localhost:3000/servicos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoServico)
      });

      if (envio.ok) {
        alert("Serviço cadastrado com sucesso!");
        // Limpa os campos após o sucesso
        setNome('');
        setDescricao('');
        setPreco('');
      } else {
        alert("Erro ao cadastrar serviço.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Servidor offline ou erro de rede.");
    }
  }

  return (
    <div className="cadastro-container">
      <h1>Cadastrar Serviço</h1>
      
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
          <label>Descrição:</label>
          <input 
            type="text" 
            value={descricao} 
            onChange={(e) => setDescricao(e.target.value)} 
            required 
          />
        </div>

        <div className="campo-grupo">
          <label>Preço:</label>
          <input 
            type="number" 
            value={preco} 
            onChange={(e) => setPreco(e.target.value)} 
            required 
          />
        </div>


        <button type="submit">Salvar Serviço</button>
      </form>
    </div>
  );
}

export default Cadastro_Servico;