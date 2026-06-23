import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();
const secretKey = "sua_chave_secreta"; // Substitua por uma chave secreta forte
//Criando o endpoint para listar todos os usuarios
router.get('/usuarios', autenticarToken, async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const comando = `SELECT * FROM usuarios ORDER BY id_usuario`

        //cria uma variavel para receber o retorno do sql
        const usuarios = await BD.query(comando);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        console.log(usuarios.rows);
        return res.status(200).json(usuarios.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao listar usuarios' })
    }
})

//Endpoint seguro contra sql Injection
router.post('/usuarios', autenticarToken, async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    try {
        //definindo a força da criptografia
        const saltRounds = 10
        //gerando o hash da senha
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)

        const comando = `INSERT INTO USUARIOS(nome, email, senha, tipo) VALUES($1, $2, $3, $4)`
        const valores = [nome, email, senhaCriptografada, tipo];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Usuário cadastrado.");
    } catch (error) {
        console.error('Erro ao cadastrar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar usuarios' })
    }
})

// endpoint para atualizar um unico usuário
// recebendo o parametro pelo id e buscando o usuario
router.put('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    // Id recebido via parametro
    const { id_usuario } = req.params;

    // Dados do usuario recebido via Corpo da página
    const { nome, email, senha, tipo } = req.body;
    try {
        //Verificar se o usuario existe
        const verificarUsuario = await BD.query(`SELECT * FROM USUARIOS
            WHERE id_usuario = $1`, [id_usuario])
        if (verificarUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario não encontrado' })
        }
        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE USUARIOS SET nome = $1, email = $2, senha =$3, tipo = $4 WHERE
        id_usuario = $5`;
        const valores = [nome, email, senha, tipo, id_usuario];
        await BD.query(comando, valores);

        return res.status(200).json('Usuario foi atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar usuarios' })
    }
})

router.delete('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    const { id_usuario } = req.params;
    try {
        //Executa o comando de delete
        const comando = `DELETE FROM USUARIOS WHERE id_usuario = $1`
        await BD.query(comando, [id_usuario])
        return res.status(200).json({ message: "Usuario removido com sucesso" })
    } catch (error) {
        console.error('Erro ao atualizar usuario', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        //buscar usuario pelo email
        const comando = 'SELECT * FROM usuarios WHERE email = $1';
        const resultado = await BD.query(comando, [email])
        if (resultado.rows.length === 0) {
            return res.status(401).json({ message: 'email incorreto' })
        }
        const usuario = resultado.rows[0]
        console.log("Senha digitada:", senha);
        console.log("Senha no banco:", usuario.senha);
        //Comparar a senha enviada com a senha gravada no banco
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Senha incorreta' })
        }

        console.log("Resultado da comparação:", senhaCorreta);
        const token = jwt.sign({ id_usuario: usuario.id_usuario, nome: usuario.nome },
            secretKey,
            { expiresIn: '15minutes' })
        //Login realizado com sucesso
        return res.status(200).json({
            message: 'Login realizado',
            usuario: {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome
            },
            token: token
        })
    } catch (error) {
        console.error('Erro ao realizar login', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})


export default router