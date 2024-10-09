import mysql2 from 'mysql2/promise';

let database;

export async function connectDatabase() {
    if (!database) {
        database = await mysql2.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password123',
            database: 'plusaesthetics'
        });
        console.log('Conexão ao banco de dados bem-sucedida.');
    }
    return database;
}
