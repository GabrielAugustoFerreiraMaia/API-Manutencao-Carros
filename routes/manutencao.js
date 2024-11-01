// routes/manutencao.js
const express = require('express');
const router = express.Router();
const sql = require('../db/config');

// Adicionar uma nova manutenção
router.post('/', async(req, res) => {
    const { veiculo_id, data, tipo, custo, observacoes } = req.body;
    try {
        const result = await sql `
      INSERT INTO manutencao (veiculo_id, data, tipo, custo, observacoes) 
      VALUES (${veiculo_id}, ${data}, ${tipo}, ${custo}, ${observacoes})
      RETURNING *`;
        res.status(201).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar a manutenção' });
    }
});

// Listar todas as manutenções de um veículo
router.get('/:veiculo_id', async(req, res) => {
    const { veiculo_id } = req.params;
    try {
        const result = await sql `SELECT * FROM manutencao WHERE veiculo_id = ${veiculo_id}`;
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar as manutenções' });
    }
});

module.exports = router;