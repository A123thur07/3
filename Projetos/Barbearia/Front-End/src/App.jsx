
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import NavBar from './components/NavBar'
import Listagem from './pages/listagem' // Importe com letra maiúscula
import Cadastro_Usuario from './pages/cadastro_usuario'
import Cadastro_Servico from './pages/cadastro_servicos' // Importe o componente genérico de cadastro
import Cadastro_Agendamento from './pages/cadastro_agendamentos' // Importe o componente genérico de cadastro
import Principal from './pages/Principal'
import Login from './pages/Login'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="">
      <BrowserRouter>
        
        <main className='conteudo-principal'>

          <Routes>
            {/* Rotas de Listagem */}
            <Route path="/Principal" element={<Principal />} />
            <Route path="/" element={<Login />} />

            <Route path="/listar_usuario" element={<Listagem tipo="Usuários" endpoint="usuarios" />} />
            <Route path="/listar_servico" element={<Listagem tipo="Serviços" endpoint="servicos" />} />
            <Route path="/listar_agendamento" element={<Listagem tipo="Agendamentos" endpoint="agendamentos" />} />

            {/* Rotas de Cadastro */}
            {/* Cadastro de Usuários */}
            <Route path="/cadastrar_usuario" element={
              <Cadastro_Usuario />
            } />

            {/* Cadastro de Serviços */}
            <Route path="/cadastrar_servico" element={
              <Cadastro_Servico />
            } />

            {/* Cadastro de Agendamentos */}
            <Route path="/cadastrar_agendamento" element={
              <Cadastro_Agendamento />
            } />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App