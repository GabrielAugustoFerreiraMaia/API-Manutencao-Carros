// routes/veiculos.js
const express = require('express');
const router = express.Router();
const sql = require('../db/config');

// Adicionar um novo veículo
router.post('/', async(req, res) => {
    const { marca, modelo, ano, quilometragem, tipo_combustivel } = req.body;
    try {
        const result = await sql `
      INSERT INTO veiculos (marca, modelo, ano, quilometragem, tipo_combustivel) 
      VALUES (${marca}, ${modelo}, ${ano}, ${quilometragem}, ${tipo_combustivel})
      RETURNING *`;
        res.status(201).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar o veículo' });
    }
});

// Listar todos os veículos
router.get('/', async(req, res) => {
    try {
        const result = await sql `SELECT * FROM veiculos`;
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar os veículos' });
    }
});

// (Continue com as outras rotas utilizando `sql`)

module.exports = router;