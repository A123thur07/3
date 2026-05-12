import { useState, useEffect } from 'react'

function Listagem({ tipo, endpoint }) {
  const [dados, setDados] = useState([])

  useEffect(() => {
    // Faz a chamada para a sua API baseada no endpoint do Swagger
    fetch(`http://localhost:3000/${endpoint}`)
      .then(res => res.json())
      .then(resultado => setDados(resultado))
      .catch(err => console.error("Erro ao buscar dados:", error))
  }, [endpoint])

  // Identifica as colunas pegando as chaves do primeiro objeto retornado (ex: id_usuario, nome, email)
  const colunas = dados.length > 0 ? Object.keys(dados[0]) : []

  return (
    <div>
      <h1>Listagem de {tipo}</h1>
      {dados.length > 0 ? (
        <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              {/* Gera os cabeçalhos das colunas dinamicamente */}
              {colunas.map(col => (
                <th key={col} style={{ padding: '8px' }}>
                  {col.replace('_', ' ').toUpperCase()}
                </th>
              ))}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* Gera as linhas da tabela */}
            {dados.map((item, i) => (
              <tr key={i}>
                {/* Gera as células baseadas nas colunas identificadas */}
                {colunas.map(col => (
                  <td key={col} style={{ padding: '8px' }}>
                    {item[col]}
                  </td>
                ))}
                <td>
                  <button>Editar</button>
                  <button style={{ color: 'red' }}>Excluir</button>
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