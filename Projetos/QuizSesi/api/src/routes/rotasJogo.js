import { Router } from "express";
import { BD } from "../../db.js";

const rotas = Router();


rotas.get('/temas', async (req, res) => {
    try {
        const query = `SELECT * FROM temas`
        const temas = await BD.query(query);
        const todosTemas = temas.rows
        const numeroTodosTemas = todosTemas.length
        if (numeroTodosTemas === 0) {
            return res.status("Ops! Parece que não tem jogos para exibir")
        }
        return res.status(200).json({
            temas: todosTemas
        })

    } catch (error) {
        console.error('Erro ao listar temas', error.message);
        return res.status(500).json({ error: 'Erro ao listar temas' })
    }
})

export default rotas