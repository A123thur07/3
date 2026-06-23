import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();
const SECRET_KEY = "sua_chave_secreta";

router.get('/dashboard', autenticarToken, async (req, res) => {
    try {
        // 1. Resumo financeiro do mês atual (Garante 0 em vez de NULL se estiver vazio)
        const resumoMes = `
            SELECT
                COALESCE(SUM(CASE WHEN status = 'confirmado' THEN s.preco ELSE 0 END), 0) as saldo
            FROM agendamentos
            INNER JOIN servicos s ON agendamentos.id_servico = s.id_servico
            WHERE DATE_TRUNC('month', data_hora) = DATE_TRUNC('month', CURRENT_DATE);
        `;

        // 2. Serviços mais procurados - CORRIGIDO: mudado SUM para COUNT
        const ServicosMaisProcurados = `
            SELECT s.nome, COUNT(a.id_servico) as total
            FROM agendamentos a
            INNER JOIN servicos s ON a.id_servico = s.id_servico
            WHERE DATE_TRUNC('month', a.data_hora) = DATE_TRUNC('month', CURRENT_DATE)
            GROUP BY s.nome
            ORDER BY total DESC;
        `;

        // 3. Próximos agendamentos (Aqui vai aparecer o do dia 10/06/2026!)
        const ProximosAgendamentos = `
            SELECT s.nome as nome_servico, u.nome as nome_usuario, TO_CHAR(a.data_hora, 'DD/MM/YYYY') as data
            FROM agendamentos a
            INNER JOIN servicos s ON a.id_servico = s.id_servico
            INNER JOIN usuarios u ON a.id_cliente = u.id_usuario
            WHERE a.data_hora >= DATE_TRUNC('day', CURRENT_DATE)
            ORDER BY a.data_hora ASC
            LIMIT 5;
        `;

        // 4. Ranking de fidelidade dos clientes
        const fidelidade = `
            SELECT u.nome as nome_usuario, 
                   COUNT(CASE WHEN a.status = 'confirmado' THEN 1 END) as fidelidade,
                   COALESCE(SUM(CASE WHEN a.status = 'confirmado' THEN s.preco ELSE 0 END), 0) as total_gasto
            FROM agendamentos a
            INNER JOIN usuarios u ON a.id_cliente = u.id_usuario
            INNER JOIN servicos s ON a.id_servico = s.id_servico
            WHERE a.data_hora >= DATE_TRUNC('day', CURRENT_DATE)
            GROUP BY u.id_usuario, u.nome
            ORDER BY total_gasto DESC
            LIMIT 5;
        `;

        const resResumoMes = await BD.query(resumoMes);
        const resServicosMaisProcurados = await BD.query(ServicosMaisProcurados);
        const resProximosAgendamentos = await BD.query(ProximosAgendamentos);
        const resFidelidade = await BD.query(fidelidade);

        const dadosDashboard = {
            resumoMesAtual: resResumoMes.rows[0],
            resumoCategoria: resServicosMaisProcurados.rows,
            resumoMaioresGastos: resProximosAgendamentos.rows,
            resumoUltimosAgendamentos: resFidelidade.rows,
        };

        return res.status(200).json(dadosDashboard);
    } catch (error) {
        console.error(error); // Mostra o erro real no terminal do VS Code
        return res.status(500).json({ error: "Erro no servidor" });
    }
});

export default router;
