import { connectDatabase } from '../database/database.js';
import { getUserById } from '../database/getuserbyid.js';
import { getSchendulings } from '../controller/scontroller.js';

let connection;

beforeAll(async () => {
    connection = await connectDatabase();
});

afterAll(async () => {
    await connection.end();
});

describe('Testes de Performance para Consultas ao Banco de Dados', () => {
    let temposExecucao = [];

    test('1 - Consulta ou operação mais demorada', async () => {
        const inicio = performance.now();
        const [rows] = await connection.query('SELECT * FROM schendulings WHERE schendulingdate < NOW()');
        const fim = performance.now();
        const duracao = fim - inicio;
        temposExecucao.push(duracao);
        console.log(`Tempo de execução da consulta demorada: ${duracao.toFixed(2)} ms`);
        expect(duracao).toBeLessThanOrEqual(200);
    });

    test('2 - Consulta mais rápida', async () => {
        const inicio = performance.now();
        const [rows] = await connection.query('SELECT * FROM schendulings LIMIT 1');
        const fim = performance.now();
        const duracao = fim - inicio;
        temposExecucao.push(duracao);
        console.log(`Tempo de execução da consulta rápida: ${duracao.toFixed(2)} ms`);
        expect(duracao).toBeLessThanOrEqual(50);
    });

    test('3 - Tempo total', async () => {
        const inicio = performance.now();
        await connection.query('SELECT * FROM schendulings');
        await connection.query('SELECT COUNT(*) FROM schendulings');
        const fim = performance.now();
        const duracaoTotal = fim - inicio;
        console.log(`Tempo total de execução: ${duracaoTotal.toFixed(2)} ms`);
        expect(duracaoTotal).toBeLessThanOrEqual(1000);
    });

    test('4 - Tempo médio', async () => {
        const tempoMedio = temposExecucao.reduce((acc, cur) => acc + cur, 0) / temposExecucao.length;
        console.log(`Tempo médio de execução: ${tempoMedio.toFixed(2)} ms`);
        expect(tempoMedio).toBeLessThanOrEqual(300);
    });
});
