import { connectDatabase } from './database.js';

export async function getUserById(id) {
    const database = await connectDatabase();
    const [rows] = await database.query('SELECT * FROM schendulings WHERE idschenduling = ?', [id]);
    return rows[0];
}