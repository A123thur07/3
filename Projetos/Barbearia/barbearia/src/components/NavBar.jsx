const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>Barbearia</h2>
      </div>
      <div className="nav-menu">
        <a href="/listar_usuario">Listar Usuários</a>
        <a href="/listar_servico">Listar Serviços</a>
        <a href="/listar_agendamento">Listar Agendamentos</a>
      </div>
    </nav>
  )
}

export default NavBar