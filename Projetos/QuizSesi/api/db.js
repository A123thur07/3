import pkg from 'pg';
const { Pool } = pkg;

const BD = new Pool({
    connectionString: "postgres://postgres.drrqhalmeavshldxxdzq:lvcSaziG4ysrWG7J@aws-1-us-east-1.pooler.supabase.com:5432/postgres",    
    ssl: {
        rejectUnauthorized: false // O Supabase requer SSL
    }

});

//  const BD = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     password: 'admim',
//     database: 'bd_jogo_bandeiras_3A',
//     port: 5432
// })

const testarConexao = async () => {
    try {
        const cliente = await BD.connect(); // Realiza a conexão
        console.log('Conexão estabelecida');
        cliente.release(); // Libera a conexão
    } catch (error) {
        console.error('Erro ao conectar com o banco', error.message);
    }
}

export { BD, testarConexao }