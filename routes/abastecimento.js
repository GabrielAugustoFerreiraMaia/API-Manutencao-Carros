// routes/abastecimento.js
const express = require('express');
const router = express.Router();
const sql = require('../db/config');

// Registrar um novo abastecimento
router.post('/', async(req, res) => {
    const { veiculo_id, data, quilometragem, quantidade, custo } = req.body;
    try {
        const result = await sql `
      INSERT INTO abastecimento (veiculo_id, data, quilometragem, quantidade, custo)
      VALUES (${veiculo_id}, ${data}, ${quilometragem}, ${quantidade}, ${custo})
      RETURNING *`;
        res.status(201).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar abastecimento' });
    }
});

// Listar todos os abastecimentos de um veículo
router.get('/:veiculo_id', async(req, res) => {
    const { veiculo_id } = req.params;
    try {
        const result = await sql `SELECT * FROM abastecimento WHERE veiculo_id = ${veiculo_id}`;
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar abastecimentos' });
    }
});

module.exports = router;