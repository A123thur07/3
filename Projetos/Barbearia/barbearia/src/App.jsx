import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import NavBar from './components/NavBar'
import Listagem from './pages/listagem' // Importe com letra maiúscula
import Cadastro from './pages/cadastro'

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <NavBar /> */}
        <main className='conteudo-principal'>
          <Routes>
            {/* Rotas de Listagem */}
            <Route path="/listar_usuario" element={<Listagem tipo="Usuários"  endpoint="usuarios"/>} />
            <Route path="/listar_servico" element={<Listagem tipo="Serviços"  endpoint="servicos"/>} />
            <Route path="/listar_agendamento" element={<Listagem tipo="Agendamentos"  endpoint="agendamentos"/>} />

            {/* Rotas de Cadastro */}
            <Route path="/cadastrar_usuario" element={<Cadastro tipo="Usuário" />} />
            <Route path="/cadastrar_servico" element={<Cadastro tipo="Serviço" />} />
            <Route path="/cadastrar_agendamento" element={<Cadastro tipo="Agendamento" />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App