import { Router } from "express";
import { BD } from "../../db.js";

const rotas = Router();


rotas.get('/jogo', async (req, res) => {
    try {
        const query = `SELECT * FROM questoes `
        const perguntas = await BD.query(query);
        const todasQuestoes = perguntas.rows
        const numeroTodasQuestoes = todasQuestoes.length
        if (numeroTodasQuestoes === 0) {
            return res.status("Ops! Parece que não tem questões para exibir")
        }
        const indice = Math.floor(Math.random() * numeroTodasQuestoes);
        const perguntaSorteada = todasQuestoes[indice]
        const opcoes = [
            perguntaSorteada.opcao_1,
            perguntaSorteada.opcao_2,
            perguntaSorteada.opcao_3,
            perguntaSorteada.opcao_4
        ];
        const resposta = perguntaSorteada.resposta_correta


        return res.status(200).json({
            imagem: perguntaSorteada.foto,
            opcoes: opcoes,
            respostaCorreta: resposta
        })
    } catch (error) {
        console.error('Erro ao listar questoes', error.message);
        return res.status(500).json({ error: 'Erro ao listar questoes' })
    }
})

export default rotas