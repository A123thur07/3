import jwt from 'jsonwebtoken';

const secretKey = "sua_chave_secreta"; // Substitua por uma chave secreta forte

export function autenticarToken(req, res, next) {
    const cabecalho = req.headers['authorization'];
    const token = cabecalho && cabecalho.split(' ')[1]; // Extrai o token do header

    if (!token) {
        return res.status(401).json({ error: 'Acesso não autorizado: Token não fornecido' });
    }

    jwt.verify(token, secretKey, (erro, usuario) => {
        if (erro) {
            return res.status(401).json({ error: 'Acesso não autorizado: Token inválido' });
            return res.status(403).json({ error: 'Acesso não autorizado: Token expirado' });
        }

        req.usuario = usuario; // Adiciona informações do usuário ao objeto da requisição
        next(); // Chama o próximo middleware
    });
}