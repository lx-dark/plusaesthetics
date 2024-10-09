import express from 'express';
import sroutes from './routes/sroute.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());
app.use('/schenduling', sroutes);
app.listen(8800);