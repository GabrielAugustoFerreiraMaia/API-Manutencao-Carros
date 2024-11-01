// server.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const veiculosRoutes = require('./routes/veiculos');
const manutencaoRoutes = require('./routes/manutencao');
const abastecimentoRoutes = require('./routes/abastecimento');
const simulacaoRoutes = require('./routes/simulucao');

const app = express();
app.use(express.json());

// Rotas
app.use('/veiculos', veiculosRoutes);
app.use('/manutencao', manutencaoRoutes);
app.use('/abastecimento', abastecimentoRoutes);
app.use('/simulacao', simulacaoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});