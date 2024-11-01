// routes/simulacao.js
const express = require('express');
const router = express.Router();
const sql = require('../db/config');

// Simular o consumo de combustível
router.post('/', async(req, res) => {
    const { veiculo_id, percurso_estimado, condicoes } = req.body;
    try {
        // Aqui você pode adicionar a lógica para calcular o consumo estimado
        const consumo_estimado = (percurso_estimado / 10); // Exemplo: dividir o percurso por um valor fixo

        const result = await sql `
      INSERT INTO simulacoes (veiculo_id, percurso_estimado, condicoes, consumo_estimado)
      VALUES (${veiculo_id}, ${percurso_estimado}, ${condicoes}, ${consumo_estimado})
      RETURNING *`;
        res.status(201).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar a simulação' });
    }
});

// Listar todas as simulações de um veículo
router.get('/:veiculo_id', async(req, res) => {
    const { veiculo_id } = req.params;
    try {
        const result = await sql `SELECT * FROM simulacoes WHERE veiculo_id = ${veiculo_id}`;
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar simulações' });
    }
});

module.exports = router;