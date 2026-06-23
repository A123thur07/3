import { useState, useEffect } from 'react'

function Cadastro_Agendamento() {
  // 1. Estados para os campos do formulário
  const [status, setStatus] = useState('');
  const [data_hora, setDataHora] = useState('');
  const [dadosUsuarios, setDadosUsuarios] = useState([]);
  const [dadosServicos, setDadosServicos] = useState([]);
  const [idUsuario, setIdUsuario] = useState('');
  const [idServico, setIdServico] = useState('');


  async function buscarDadosUsuarios() {
    try {
      const resposta = await fetch(`http://localhost:3000/usuarios`)
      const resultado = await resposta.json()
      setDadosUsuarios(resultado)
    } catch (error) {
      console.error("Erro ao buscar dados:", error)
    }
  }
  async function buscarDadosServicos() {
    try {
      const resposta = await fetch(`http://localhost:3000/servicos`)
      const resultado = await resposta.json()
      setDadosServicos(resultado)
    } catch (error) {
      console.error("Erro ao buscar dados:", error)
    }
  }
  useEffect(() => {
    buscarDadosUsuarios();
    buscarDadosServicos();
  }, []);


  // Função para lidar com o clique do botão
  async function botaoAdicionar(e) {
    e.preventDefault(); // Impede a página de recarregar

    const novoAgendamento = {
      id_cliente: Number(idUsuario),
      id_servico: Number(idServico),
      status: status,
      data_hora: data_hora
    };
    if (!idUsuario || !idServico) {
      alert("Por favor, selecione um cliente ou um serviço!");
      return;
    }
    console.log("ID do Usuário:", Number(idUsuario));
    console.log("ID do Serviço:", Number(idServico));


    try {
      const envio = await fetch('http://localhost:3000/agendamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoAgendamento)
      });

      if (envio.ok) {
        console.log("ID do Usuário:", Number(idUsuario));
        console.log("ID do Serviço:", Number(idServico));
        alert("Agendamento cadastrado com sucesso!");
        // Limpa os campos após o sucesso
        setIdServico('');
        setIdUsuario('');
        setStatus('');
        setDataHora('');
      } else {
        alert("Erro ao cadastrar agendamento.", error);
        console.log(error);
      }

    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Servidor offline ou erro de rede.");
    }
  }

  return (
    <div className="cadastro-container">
      <h1>Cadastrar Agendamento</h1>

      <form onSubmit={botaoAdicionar} className="formulario-padrao">
        <div className="campo-grupo">
          <label>Nome:</label>
          <select
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            required
          >
            <option value="">Selecione um usuário</option>
            {dadosUsuarios.map((usuario) => (
              <option key={usuario.id_usuario} value={usuario.id_usuario}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="campo-grupo">
          <label>Serviço:</label>
          <select
            value={idServico}
            onChange={(e) => setIdServico(e.target.value)}
            required
          >
            <option value="">Selecione um serviço</option>
            {dadosServicos.map((servico) => (
              <option key={servico.id_servico} value={servico.id_servico}>
                {servico.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="campo-grupo">
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Selecione um status</option>
            <option value="confirmado">confirmado</option>
            <option value="cancelado">cancelado</option>
          </select>
        </div>

        <div className="campo-grupo">
          <label>Data e Hora:</label>
          <input
            type="datetime-local"
            value={data_hora}
            onChange={(e) => setDataHora(e.target.value)}
            required
          />
        </div>

        <button type="submit">Salvar Agendamento</button>
      </form>
    </div>
  );
}

export default Cadastro_Agendamento;