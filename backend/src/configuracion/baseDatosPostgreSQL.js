const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mi_base_de_datos_usuario',
    password: 'admin',
    port: 5432,
});

// Este bloque es opcional para verificar la conexión al iniciar
pool.connect()
    .then(() => console.log('Conexión exitosa a PostgreSQL'))
    .catch(err => console.error('Error al conectar a PostgreSQL:', err.message));

module.exports = pool;
