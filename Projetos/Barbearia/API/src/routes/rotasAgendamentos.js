import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//Criando o endpoint para listar todos os usuarios
router.get('/agendamentos', async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT a.id_agendamento, 
        a.status,
        TO_CHAR(a.data_hora,'DD/MM/YYYY HH24:MI') AS data_hora,
        u.nome AS nome_usuario,
        s.nome AS nome_servico
        FROM agendamentos a
        LEFT JOIN usuarios u ON a.id_cliente = u.id_usuario
        LEFT JOIN servicos s ON a.id_servico = s.id_servico
        `

        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(query);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(transacoes.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar agendamentos', error.message);
        return res.status(500).json({ error: 'Erro ao listar agendamentos' })
    }
})

//Endpoint seguro contra sql Injection
router.post('/agendamentos', async (req, res) => {
    const { id_cliente, id_servico, data_hora, status } = req.body;
    try {
        const comando = `INSERT INTO AGENDAMENTOS(id_cliente, id_servico, data_hora, status) VALUES($1, $2, $3, $4)`
        const valores = [id_cliente, id_servico, data_hora, status];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Agendamento cadastrado.");
    } catch (error) {
        console.error('Erro ao cadastrar agendamentos', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar agendamentos' })
    }
})

// endpoint para atualizar um unico usuário
// recebendo o parametro pelo id e buscando o usuario
router.put('/agendamentos/:id_agendamento', async (req, res) => {
    // Id recebido via parametro
    const { id_agendamento } = req.params;

    // Dados do agendamento recebido via Corpo da página
    const { id_cliente, id_servico, status, data_hora } = req.body;
    try {
        //Verificar se o agendamento existe
        const verificarAgendamento = await BD.query(`SELECT * FROM AGENDAMENTOS
            WHERE id_agendamento = $1`, [id_agendamento])
        if (verificarAgendamento.rows.length === 0) {
            return res.status(404).json({ message: 'Agendamento não encontrado' })
        }
        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE AGENDAMENTOS SET id_cliente = $1, id_servico = $2, status = $3, data_hora = $4 WHERE
        id_agendamento = $5`;
        const valores = [id_cliente, id_servico, status, data_hora, id_agendamento];
        await BD.query(comando, valores);

        return res.status(200).json('Agendamento foi atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar agendamentos', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar agendamentos' + error.message })
    }
})


router.delete('/agendamentos/:id_agendamento', async (req, res) => {
    const { id_agendamento } = req.params;
    try {
        //Executa o comando de delete
        const comando = `DELETE FROM AGENDAMENTOS WHERE id_agendamento = $1`
        await BD.query(comando, [id_agendamento])
        return res.status(200).json({ message: "Agendamento removido com sucesso" })
    } catch (error) {
        console.error('Erro ao remover agendamento', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})


export default router