import '../App.css'

const NavBar = () => {
    return (
        <nav className="conteudo-principal">
            <div className="nav-brand">
                <h2 style={{fontSize: '40px', textShadow: '3px 4px 8px rgba(0, 0, 0, 0.3)' }}>-Barbearia-</h2>
            </div>
            <div className="nav-list">
                <h2>Listagem</h2>
                <button>
                    <a href="/listar_usuario">
                        Listar Usuários
                    </a>
                </button>
                <button>
                    <a href="/listar_servico">
                        Listar Serviços
                    </a>
                </button>
                <button>
                    <a href="/listar_agendamento" >
                        Listar Agendamentos
                    </a>
                </button>

            </div>
            <div className="nav-cadast">
                <h2>Cadastrar</h2>
                <button>
                    <a href="/cadastrar_usuario">
                        Cadastrar Usuário
                    </a>
                </button>
                <button>
                    <a href="/cadastrar_servico">
                        Cadastrar Serviços
                    </a>
                </button>
                <button>
                    <a href="/cadastrar_agendamento" >
                        Cadastrar Agendamentos
                    </a>
                </button>

            </div>
        </nav>
    )
}

export default NavBar