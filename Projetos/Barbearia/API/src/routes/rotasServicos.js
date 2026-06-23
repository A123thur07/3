import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

//Criando o endpoint para listar todos os usuarios
router.get('/servicos', autenticarToken, async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT * FROM servicos ORDER BY id_servico`

        //cria uma variavel para receber o retorno do sql
        const servicos = await BD.query(query);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(servicos.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar serviços', error.message);
        return res.status(500).json({ error: 'Erro ao listar serviços' })
    }
})

//Endpoint seguro contra sql Injection
router.post('/servicos', autenticarToken, async (req, res) => {
    const { nome, preco, descricao } = req.body;
    try {
        const comando = `INSERT INTO SERVICOS(nome, preco, descricao) VALUES($1, $2, $3)`
        const valores = [nome, preco, descricao];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Serviço cadastrado.");
    } catch (error) {
        console.error('Erro ao cadastrar serviços', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar serviços' })
    }
})

// endpoint para atualizar um unico serviço
// recebendo o parametro pelo id e buscando o serviço
router.put('/servicos/:id_servico', autenticarToken, async (req, res) => {
    // Id recebido via parametro
    const { id_servico } = req.params;

    // Dados do serviço recebido via Corpo da página
    const { nome, preco, descricao } = req.body;
    try {
        //Verificar se o serviço existe
        const verificarServico = await BD.query(`SELECT * FROM SERVICOS
            WHERE id_servico = $1`, [id_servico])
        if (verificarServico.rows.length === 0) {
            return res.status(404).json({ message: 'Serviço não encontrado ' })
        }
        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE SERVICOS SET nome = $1, descricao = $2, preco = $3 WHERE
        id_servico = $4`;
        const valores = [nome, descricao, preco, id_servico];
        await BD.query(comando, valores);
        return res.status(200).json('Serviço foi atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar serviços', error.message);
        const valores = [nome, descricao, preco, id_servico];
        console.log(valores);
        return res.status(500).json({ error: 'Erro ao atualizar serviços' })
    }
})

router.delete('/servicos/:id_servico', autenticarToken, async (req, res) => {
    const { id_servico } = req.params;
    try {
        //Executa o comando de delete
        const comando = `DELETE FROM SERVICOS WHERE id_servico = $1`
        await BD.query(comando, [id_servico])
        return res.status(200).json({ message: "Serviço removido com sucesso" })
    } catch (error) {
        console.error('Erro ao remover serviço', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})





export default router