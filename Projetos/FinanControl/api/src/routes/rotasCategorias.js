import { Router } from "express";
import { BD } from "../../db.js";
import {autenticarToken} from "../middlewares/autenticacao.js";

const router = Router();

//Criando o endpoint para listar todos os usuarios
router.get('/categorias', autenticarToken, async(req, res) =>{
    try{
        //cria uma variavel para enviar o comando sql
        const query = `SELECT * FROM categorias ORDER BY id_categoria`

        //cria uma variavel para receber o retorno do sql
        const categorias = await BD.query(query);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
       return res.status(200).json(categorias.rows);//200 ok
    }catch(error){
        console.error('Erro ao listar categorias', error.message);
        return res.status(500).json({error: 'Erro ao listar categorias'})
    }
})

//Endpoint seguro contra sql Injection
router.post('/categorias', autenticarToken, async(req, res) => {
    const {nome, descricao, cor, icone, tipo, ativo} = req.body;
    try{
        const comando = `INSERT INTO CATEGORIAS(nome, descricao, cor, icone, tipo, ativo) VALUES($1, $2, $3, $4, $5, $6)`
        const valores = [nome, descricao, cor, icone, tipo, ativo];

        await BD.query(comando, valores)
        console.log(comando,valores);

    return res.status(201).json("Categoria cadastrada.");
    }catch(error){
        console.error('Erro ao cadastrar categorias', error.message);
        return  res.status(500).json({error: 'Erro ao cadastrar categorias '})
    }
})

// endpoint para atualizar um unico usuário
// recebendo o parametro pelo id e buscando o usuario
router.put('/categorias/:id_categoria', autenticarToken, async(req, res) =>{
    // Id recebido via parametro
    const {id_categoria} = req.params;

    // Dados da categoria recebido via Corpo da página
    const {nome, descricao, cor, icone, tipo, ativo} = req.body;
    try{
        //Verificar se a categoria existe
        const verificarCategoria = await BD.query(`SELECT * FROM CATEGORIAS
            WHERE id_categoria = $1`, [id_categoria])
        if(verificarCategoria.rows.length === 0){
            return res.status(404).json({message: 'Categoria não encontrada '})
        }
        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE CATEGORIAS SET nome = $1, descricao = $2, cor = $3, icone = $4, tipo = $5, ativo = $6 WHERE
        id_categoria = $7`;
        const valores = [nome, descricao, cor, icone, tipo, ativo, id_categoria];
        await BD.query(comando, valores);

        return res.status(200).json('Categoria foi atualizada!');
    }catch(error){
        console.error('Erro ao atualizar categorias', error.message);
        return  res.status(500).json({error: 'Erro ao atualizar categorias'})
    }
})

//Rota patch atualizando parcialmente as informações
router.patch('/categorias/:id_categoria', autenticarToken, async(req,res) =>{
    const { id_categoria } = req.params;
    const {nome, descricao, cor, icone, tipo, ativo} = req.body;

    try{
         //Verificar se a categoria existe
        const verificarCategoria = await BD.query(`SELECT * FROM CATEGORIAS
            WHERE id_categoria = $1`, [id_categoria])
        if(verificarCategoria.rows.length === 0){
            return res.status(404).json({message: 'Categoria não encontrada '})
        }

        //Montar o update dinamicamente(apenas campos enviados)
        const campos = [];
        const valores = [];
        let contador = 1;

        if(nome !== undefined){
            campos.push(`nome = $${contador}`);
            valores.push(nome);
            contador++;
        }
        if(descricao !== undefined){
            campos.push(`descricao = $${contador}`);
            valores.push(descricao);
            contador++;
        }
        if(cor !== undefined){
            campos.push(`cor = $${contador}`);
            valores.push(cor);
            contador++;
        }
        if(icone !== undefined){
            campos.push(`icone = $${contador}`);
            valores.push(icone);
            contador++;
        }
        if(tipo !== undefined){
            campos.push(`tipo = $${contador}`);
            valores.push(tipo);
            contador++;
        }
        if(ativo !== undefined){
            campos.push(`ativo = $${contador}`);
            valores.push(ativo);
            contador++;
        }


        //se nenhum campo foi enviado
        if(campos.length === 0 ){
            return res.status(400).json({message: "Nenhum campo a atualizar"})
        }

        //Adicionando ID ao final de valores
        valores.push(id_categoria)
        
        //montando a query dinamicamente
        const comando = `UPDATE CATEGORIAS SET ${campos.join(', ')} WHERE id_categoria = $${contador}`
        await BD.query(comando, valores)

        return res.status(200).json('Categoria atualizada com sucesso');
    }catch(error){
        console.error('Erro ao atualizar categoria', error.message)
        return res.status(500).json({message: "Erro interno so servidor" + error.message})
    }
})

router.delete('/categorias/:id_categoria', autenticarToken, async(req, res) =>{
    const {id_categoria} = req.params;
    try{
        //Executa o comando de delete
        const comando = `DELETE FROM CATEGORIAS WHERE id_categoria = $1`
        await BD.query(comando, [id_categoria])
        return res.status(200).json({message: "Categoria removida com sucesso"})
    }catch(error){
        console.error('Erro ao remover categoria', error.message)
        return res.status(500).json({message: "Erro interno so servidor" + error.message})
    }
})





export default router