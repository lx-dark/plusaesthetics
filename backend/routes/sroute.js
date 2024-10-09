import express from 'express';
import { getSchendulings, addSchenduling, updateSchenduling, deleteSchenduling } from '../controller/scontroller.js';

const sroutes = express.Router();
sroutes.get('/schenduling', getSchendulings);
sroutes.post('/schenduling', addSchenduling);
sroutes.put('/:idschenduling', updateSchenduling);
sroutes.delete('/:idschenduling', deleteSchenduling);

export default sroutes;
