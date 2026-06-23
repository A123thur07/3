import pkg from 'pg';
const { Pool } = pkg;

const BD = new Pool({
    connectionString: "postgres://postgres.iaidxydimobereldrnfr:6E2ynoSlF6pmvtTd@aws-1-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require",
    ssl: {
        rejectUnauthorized: false // O Supabase requer SSL
    }

});




// import { Pool } from 'pg';

// const BD = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     password: 'admim',
//     database: 'bd_barbearia_3A',
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