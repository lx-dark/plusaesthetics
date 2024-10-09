import { connectDatabase } from '../database/database.js';
import { getUserById } from '../database/getuserbyid.js';

let connection;

beforeAll(async () => {
    connection = await connectDatabase();
    await connection.query(`
        CREATE TABLE IF NOT EXISTS schendulings (
            idschenduling INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            phonenumber VARCHAR(20),
            email VARCHAR(255),
            schendulingdate DATETIME
        )
    `);

    await connection.query('INSERT INTO schendulings (name, phonenumber, email, schendulingdate) VALUES (?, ?, ?, ?)',
        ['Leandro Gomes', '01234567890', 'leandrogomes@mail.com', new Date()]);
});

afterAll(async () => {
    await connection.query('TRUNCATE TABLE schendulings');
    await connection.end();
});

describe('Testes para getUserById e agendamentos.', () => {

    test('1 - Verifique se um novo agendamento pode ser criado', async () => {
        const [result] = await connection.query(`
            INSERT INTO schendulings (name, phonenumber, email, schendulingdate)
            VALUES ('Ana Silva', '987654321', 'ana@mail.com', NOW())
        `);
        expect(result.affectedRows).toBe(1);
    });

    test('2 - Select em uma tabela', async () => {
        const [rows] = await connection.query('SELECT * FROM schendulings');
        expect(rows.length).toBeGreaterThan(0);
    });

    test('3 - Select com um nome específico', async () => {
        const user = await getUserById(1);
        expect(user).toHaveProperty('name', 'Leandro Gomes');
        expect(user).toHaveProperty('email', 'leandrogomes@mail.com');
    });

    test('4 - Select por parte do nome', async () => {
        const user = await getUserById(1);
        expect(user.name).toMatch(/Lean/);
    });

    test('5 - Select em um intervalo de datas específicas', async () => {
        await connection.query(`INSERT INTO schendulings (name, phonenumber, email, schendulingdate) VALUES (?, ?, ?, ?)`,
            ['João Almeida', '123456789', 'joao@mail.com', new Date()]);
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1);
        const [rows] = await connection.query('SELECT * FROM schendulings WHERE schendulingdate BETWEEN ? AND ?',
            [new Date(), futureDate]);
        expect(rows.length).toBeGreaterThan(0);
        console.log('Registros encontrados no intervalo:', rows);
    });

    test('6 - Update: Verifique se um usuário pode ser atualizado corretamente', async () => {
        const [insertResult] = await connection.query(`
            INSERT INTO schendulings (name, phonenumber, email, schendulingdate) 
            VALUES ('Pedro Souza', '222333444', 'pedro@mail.com', NOW())
        `);
        const updatedName = 'Pedro Silva';
        const [updateResult] = await connection.query(`
            UPDATE schendulings SET name = ? WHERE idschenduling = ?
        `, [updatedName, insertResult.insertId]);
        expect(updateResult.affectedRows).toBe(1);
        const user = await getUserById(insertResult.insertId);
        expect(user.name).toBe(updatedName);
    });

    test('7 - Delete: Verifique se um usuário pode ser deletado', async () => {
        const [insertResult] = await connection.query(`
            INSERT INTO schendulings (name, phonenumber, email, schendulingdate) 
            VALUES ('Lucas Santos', '555666777', 'lucas@mail.com', NOW())
        `);
        const [deleteResult] = await connection.query(`
            DELETE FROM schendulings WHERE idschenduling = ?
        `, [insertResult.insertId]);
        expect(deleteResult.affectedRows).toBe(1);
        const user = await getUserById(insertResult.insertId);
        expect(user).toBeUndefined();
    });
});
