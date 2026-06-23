process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import express from 'express';
import { BD, testarConexao } from './db.js';
import rotasUsuarios from './src/routes/rotasUsuarios.js'
import rotasServicos from './src/routes/rotasServicos.js'
import rotasAgendamentos from './src/routes/rotasAgendamentos.js'
import rotasDashboard from './src/routes/rotasDashboard.js'
// import rotasProdutos from './src/routes/rotasProdutos.js'
//usando swagger
import swaggerUi from 'swagger-ui-express';
import documentacao from './config/swagger.js';
import cors from 'cors'

const app = express();
app.use(express.json());
// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao))
app.get('/swagger', (req, res) => {

    res.send(`<!DOCTYPE html>
<html><head>
<title>API Ordens de Serviço</title>
<meta charset="utf-8"/>
<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
</head><body>
<div id="swagger-ui"></div>
<script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
<script>
SwaggerUIBundle({
spec: ${JSON.stringify(documentacao)},
dom_id: '#swagger-ui'})
</script>
</body></html>`);
});
app.use(cors())


app.get('/', async (req, res) => {
    try {
        await testarConexao();
        res.redirect('/swagger');
    } catch (error) {
        res.status(500).send("Erro ao conectar ao banco de dados. Verifique o console.");
    }
})

//Utilizando rotas
app.use(rotasUsuarios);
app.use(rotasServicos);
app.use(rotasAgendamentos);
app.use(rotasDashboard);
// app.use(rotasProdutos);

const porta = 3000;
app.listen(porta, () => {
    console.log(`http://localhost:${porta}`);
})