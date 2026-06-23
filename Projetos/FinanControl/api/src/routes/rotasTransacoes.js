import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

//Criando o endpoint para listar todos os usuarios
router.get('/transacoes', autenticarToken, async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT t.id_transacao, 
        t.valor, 
        t.descricao, 
        TO_CHAR(t.data_registro,'DD/MM/YYY') AS data_registro,
        TO_CHAR(t.data_vencimento,'DD/MM/YYY') AS data_vencimento,
        TO_CHAR(t.data_pagamento,'DD/MM/YYY') AS data_pagamento,
        t.tipo,
        c.nome AS nome_categoria,
        s.nome AS nome_subcategoria,
        u.nome AS nome_usuario
        FROM transacoes t
        LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
        LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
        LEFT JOIN usuarios u ON t.id_usuario = u.id_usuario
        `

        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(query);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(transacoes.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar transacoes', error.message);
        return res.status(500).json({ error: 'Erro ao listar transacoes' })
    }
})

//Endpoint seguro contra sql Injection
router.post('/transacoes', autenticarToken, async (req, res) => {
    const { valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria } = req.body;
    try {
        const comando = `INSERT INTO TRANSACOES(valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria) VALUES($1, $2, $3, $4, $5, $6, $7)`
        const valores = [valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Transação cadastrada.");
    } catch (error) {
        console.error('Erro ao cadastrar transacoes', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar transacoes' })
    }
})

// endpoint para atualizar um unico usuário
// recebendo o parametro pelo id e buscando o usuario
router.put('/transacoes/:id_transacao', autenticarToken, async (req, res) => {
    // Id recebido via parametro
    const { id_transacao } = req.params;

    // Dados da transacao recebido via Corpo da página
    const { valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria } = req.body;
    try {
        //Verificar se a transacao existe
        const verificarTransacao = await BD.query(`SELECT * FROM TRANSACOES
            WHERE id_transacao = $1`, [id_transacao])
        if (verificarTransacao.rows.length === 0) {
            return res.status(404).json({ message: 'Transação não encontrada' })
        }
        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE TRANSACOES SET valor = $1, descricao = $2, data_vencimento = $3, data_pagamento = $4, tipo = $5, id_subcategoria = $6, id_categoria = $7 WHERE
        id_transacao = $8`;
        const valores = [valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria, id_transacao];
        await BD.query(comando, valores);

        return res.status(200).json('Transação foi atualizada!');
    } catch (error) {
        console.error('Erro ao atualizar transacoes', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar transacoes' + error.message })
    }
})

//Rota patch atualizando parcialmente as informações
router.patch('/transacoes/:id_transacao', autenticarToken, async (req, res) => {
    const { id_transacao } = req.params;
    const { valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria } = req.body;

    try {
        //Verificar se a transacao existe
        const verificarTransacao = await BD.query(`SELECT * FROM TRANSACOES
            WHERE id_transacao = $1`, [id_transacao])
        if (verificarTransacao.rows.length === 0) {
            return res.status(404).json({ message: 'Transação não encontrada' })
        }

        //Montar o update dinamicamente(apenas campos enviados)
        const campos = [];
        const valores = [];
        let contador = 1;

        if (valor !== undefined) {
            campos.push(`valor = $${contador}`);
            valores.push(valor);
            contador++;
        }
        if (descricao !== undefined) {
            campos.push(`descricao = $${contador}`);
            valores.push(descricao);
            contador++;
        }
        if (data_vencimento !== undefined) {
            campos.push(`data_vencimento = $${contador}`);
            valores.push(data_vencimento);
            contador++;
        }
        if (data_pagamento !== undefined) {
            campos.push(`data_pagamento = $${contador}`);
            valores.push(data_pagamento);
            contador++;
        }
        if (tipo !== undefined) {
            campos.push(`tipo = $${contador}`);
            valores.push(tipo);
            contador++;
        }
        if (id_subcategoria !== undefined) {
            campos.push(`id_subcategoria = $${contador}`);
            valores.push(id_subcategoria);
            contador++;
        }
        if (id_categoria !== undefined) {
            campos.push(`id_categoria = $${contador}`);
            valores.push(id_categoria);
            contador++;
        }


        //se nenhum campo foi enviado
        if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo a atualizar" })
        }

        //Adicionando ID ao final de valores
        valores.push(id_transacao);

        //montando a query dinamicamente
        const comando = `UPDATE TRANSACOES SET ${campos.join(', ')} WHERE id_transacao = $${contador}`
        await BD.query(comando, valores)

        return res.status(200).json('Transação atualizada com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar transacao', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

router.delete('/transacoes/:id_transacao', autenticarToken, async (req, res) => {
    const { id_transacao } = req.params;
    try {
        //Executa o comando de delete
        const comando = `DELETE FROM TRANSACOES WHERE id_transacao = $1`
        await BD.query(comando, [id_transacao])
        return res.status(200).json({ message: "Transação removida com sucesso" })
    } catch (error) {
        console.error('Erro ao remover transacao', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

router.get('/transacoes/tipo/:tipo', autenticarToken, async (req, res) => {
    const { tipo } = req.params;

    try {
        if (tipo !== 'E' && tipo !== 'S') {
            return res.status(400).json({ message: 'Tipo inválido. Use E para entrada e S para saída' })
        }

        const query = `SELECT t.id_transacao, 
        t.valor, 
        t.descricao, 
        to_char(t.data_registro, 'DD/MM/YYYY') AS data_registro,
        to_char(t.data_vencimento, 'DD/MM/YYYY') AS vencimento,
        to_char(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
        t.tipo,
        c.nome as nome_categoria,
        s.nome as nome_subcategoria
        From transacoes t
        left join categorias as c on t.id_categoria = c.id_categoria
        left join subcategorias s on t.id_subcategoria = s.id_subcategoria
        where t.tipo = $1
        order by t.data_registro DESC`

        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(query, [tipo]);
        return res.status(200).json(transacoes.rows);
    } catch (error) {
        console.error('Erro ao listar tipo', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})
router.get('/transacoes/categoria/:id_categoria', autenticarToken, async (req, res) => {
    const { id_categoria } = req.params;

    try {
        const query = `SELECT t.id_transacao, 
        t.valor, 
        t.descricao, 
        to_char(t.data_registro, 'DD/MM/YYYY') AS data_registro,
        to_char(t.data_vencimento, 'DD/MM/YYYY') AS vencimento,
        to_char(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
        t.tipo,
        c.nome as nome_categoria,
        s.nome as nome_subcategoria
        From transacoes t
        left join categorias as c on t.id_categoria = c.id_categoria
        left join subcategorias s on t.id_subcategoria = s.id_subcategoria
        where t.id_categoria = $1
        order by t.data_registro DESC`

        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(query, [id_categoria]);
        return res.status(200).json(transacoes.rows);
    } catch (error) {
        console.error('Erro ao listar categoria', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

router.get('/transacoes/subcategoria/:id_subcategoria', autenticarToken, async (req, res) => {
    const { id_subcategoria } = req.params;
    try {
        const query = `SELECT t.id_transacao, 
        t.valor, 
        t.descricao, 
        to_char(t.data_registro, 'DD/MM/YYYY') AS data_registro,
        to_char(t.data_vencimento, 'DD/MM/YYYY') AS vencimento,
        to_char(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
        t.tipo,
        c.nome as nome_categoria,
        s.nome as nome_subcategoria
        From transacoes t
        left join categorias as c on t.id_categoria = c.id_categoria
        left join subcategorias s on t.id_subcategoria = s.id_subcategoria
        where t.id_subcategoria = $1
        order by t.data_registro DESC`

        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(query, [id_subcategoria]);
        return res.status(200).json(transacoes.rows);
    } catch (error) {
        console.error('Erro ao listar subcategoria', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

router.post('/transacoes/agendar', autenticarToken, async (req, res) => {
    const { valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria } = req.body;
    const id_usuario = req.usuario.id_usuario; // Obtém o ID do usuário autenticado
    try {
        const consulta = `SELECT * FROM TRANSACOES 
        WHERE id_usuario = $1       
        AND data_vencimento = TO_DATE($2, 'DD/MM/YYYY') 
        AND id_categoria = $3`
        const conflito = await BD.query(consulta, [id_usuario, data_vencimento, id_categoria]);

        if (conflito.rows.length > 0) {
            return res.status(409).json({ message: "Conflito: Já existe uma transação agendada para esta data e categoria" })
        }

        const comando = `INSERT INTO TRANSACOES(valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria, id_usuario) 
        VALUES($1, $2, $3, TO_DATE($4, 'DD/MM/YYYY'), $5, $6, $7, $8)`

        const valores = [valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria, id_usuario];
        await BD.query(comando, valores);
        return res.status(201).json({ message: "Transação agendada com sucesso" });
    } catch (error) {
        console.error('Erro ao agendar transação', error.message);
        return res.status(500).json({ message: "Erro interno do servidor" + error.message })
    }
});


export default router