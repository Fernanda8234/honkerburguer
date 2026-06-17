// Express e Dependências
const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const cors       = require('cors');

// 🔥 CORREÇÃO PROTOCOLO 1: O CORS DEVE SER O PRIMEIRO MIDDLEWARE A SER ATIVADO
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
}));

// Ativação do interpretador de JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import das ROTAS do projeto
const produtoRoutes         = require('./routes/produto.routes.js');
const tipoSaborRoutes       = require('./routes/tipo_sabor.routes.js');
const categoriaRoutes       = require('./routes/categoria.routes.js');
const comboRoutes           = require('./routes/combos.routes.js');
const administradorRoutes   = require('./routes/administrador.routes.js');
const produtoViewRoute      = require('./routes/vwproduto.routes.js'); // Importação da view

// Configuração dos Endpoints
app.use('/v1/senai/hamburgueria/produto', produtoRoutes);
app.use('/v1/senai/hamburgueria/tipo_sabor', tipoSaborRoutes);
app.use('/v1/senai/hamburgueria/categoria', categoriaRoutes);
app.use('/v1/senai/hamburgueria/combo', comboRoutes);
app.use('/v1/senai/hamburgueria/administrador', administradorRoutes);

// Endpoint da view (Garante que herda o CORS global acima)
app.use('/v1/senai/hamburgueria/vw/produtos', produtoViewRoute);

// Inicialização da API
const PORT = process.env.PORT || 8080;

app.listen(PORT, function(){
    console.log('API Funcionando na porta ' + PORT);
});