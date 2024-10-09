import { connectDatabase } from '../database/database.js';

let connection;

const initConnection = async () => {
    if (!connection) {
        connection = await connectDatabase();
    }
};

export const getSchendulings = async (_, res) => {
    await initConnection();
    const q = 'SELECT * FROM schendulings';
    connection.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const addSchenduling = async (req, res) => {
    await initConnection();
    const q = 'INSERT INTO schendulings (`name`, `phonenumber`, `email`, `schendulingdate`) VALUES (?, ?, ?, ?)';
    const values = [
        req.body.name,
        req.body.phonenumber,
        req.body.email,
        req.body.schendulingdate
    ];
    connection.query(q, values, (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json('Usuário criado com sucesso.');
    });
};

export const updateSchenduling = async (req, res) => {
    await initConnection();
    const q = 'UPDATE schendulings SET `name` = ?, `phonenumber` = ?, `email` = ?, `schendulingdate` = ? WHERE `idschenduling` = ?';
    const values = [
        req.body.name,
        req.body.phonenumber,
        req.body.email,
        req.body.schendulingdate
    ];
    connection.query(q, [...values, req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json('Usuário atualizado com sucesso.');
    });
};

export const deleteSchenduling = async (req, res) => {
    await initConnection();
    const q = 'DELETE FROM schendulings WHERE `idschenduling` = ?';
    connection.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json('Usuário deletado com sucesso.');
    });
};
