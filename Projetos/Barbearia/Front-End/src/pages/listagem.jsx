import { useState, useEffect } from 'react'

function Listagem({ tipo, endpoint }) {
  const [dados, setDados] = useState([])

  async function buscarDados() {
    try {
      const resposta = await fetch(`http://localhost:3000/${endpoint}`)
      const resultado = await resposta.json()
      setDados(resultado)
    } catch (error) {
      console.error("Erro ao buscar dados:", error)
    }
  }
  useEffect(() => {
    buscarDados();
  }, [endpoint]); // Reexecuta a busca sempre que o endpoint mudar

  async function excluirItem(item) {
    // 1. Descobrir qual é a chave de ID (ex: id_usuario ou id_servico)
    // Geralmente é a primeira chave do objeto
    const chaveId = Object.keys(item)[0];
    const idValue = item[chaveId];

    if (!confirm(`Tem certeza que deseja excluir este ${tipo.toLowerCase()}?`)) return;

    try {
      const resposta = await fetch(`http://localhost:3000/${endpoint}/${idValue}`, {
        method: 'DELETE',
      });

      if (resposta.ok) {
        alert("Excluído com sucesso!");
        // 2. Atualizar a lista local para sumir o item sem precisar recarregar a página
        setDados(dados.filter(dado => dado[chaveId] !== idValue));
      } else {
        alert("Erro ao excluir item.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  // Identifica as colunas pegando as chaves do primeiro objeto retornado (ex: id_usuario, nome, email)
  const colunas = dados.length > 0 ? Object.keys(dados[0]) : []

  return (
    <div style={{ marginTop: '150px' }}>
      <h1>Listagem de {tipo}</h1>
      {dados.length > 0 ? (
        <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#ffffff', color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
              {colunas.map(nomeDaColuna => (
                <th key={nomeDaColuna}>{nomeDaColuna}</th>
              ))}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* Gera as linhas da tabela */}
            {dados.map((item, contador) => (
              <tr key={contador}>
                {/* Gera as células baseadas nas colunas identificadas */}
                {colunas.map(nomeDaColuna => (
                  <td key={nomeDaColuna} style={{ padding: '8px' }}>
                    {item[nomeDaColuna]}
                  </td>
                ))}
                <td className='acoes'>
                  <button style={{ fontWeight: 'bold' }}>Editar</button>
                  <button style={{ color: 'red', fontWeight: 'bold' }} onClick={() => excluirItem(item)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum {tipo.toLowerCase()} encontrado.</p>
      )}
    </div>
  )
}

export default Listagem