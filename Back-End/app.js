//Express para chamar o banco de dadods
//Dependências
const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const cors       = require('cors');

<<<<<<< HEAD
//Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

//Cors
const cors = require('cors')

//CorsOptions para liberar o acesso a API para qualquer termo
const corsOptions = {
    origin: ['*'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-type', 'Authorization']
}

app.use(cors(corsOptions))
  
//Import das ROTAS do projeto
const produtoRoutes         = require('./routes/produto.routes.js')
const tipoSaborRoutes       = require('./routes/tipo_sabor.routes.js')
const categoriaRoutes       = require('./routes/categoria.routes.js')
const comboRoutes           = require('./routes/combos.routes.js')
const administradorRoutes   = require('./routes/administrador.routes.js')

//Importação dos endpoints com o use
app.use('/v1/senai/hamburgueria/produto', produtoRoutes)
app.use('/v1/senai/hamburgueria/tipo_sabor', tipoSaborRoutes)
app.use('/v1/senai/hamburgueria/categoria', categoriaRoutes)
app.use('/v1/senai/hamburgueria/combo', comboRoutes)
app.use('/v1/senai/hamburgueria/administrador', administradorRoutes)

//Serve para inicializar a API para receber requisições
const PORT = process.env.PORT || 8080
=======
//Configuração do cors
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
}));

//MiddleWares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Importantando rotas
const produtoRoutes         = require('./routes/produto.routes.js');
const tipoSaborRoutes       = require('./routes/tipo_sabor.routes.js');
const categoriaRoutes       = require('./routes/categoria.routes.js');
const comboRoutes           = require('./routes/combos.routes.js');
const administradorRoutes   = require('./routes/administrador.routes.js');
const produtoViewRoute      = require('./routes/vwproduto.routes.js'); // Importação da view

//Configuração dos endpoints
app.use('/v1/senai/hamburgueria/produto', produtoRoutes);
app.use('/v1/senai/hamburgueria/tipo_sabor', tipoSaborRoutes);
app.use('/v1/senai/hamburgueria/categoria', categoriaRoutes);
app.use('/v1/senai/hamburgueria/combo', comboRoutes);
app.use('/v1/senai/hamburgueria/administrador', administradorRoutes);

//View
app.use('/v1/senai/hamburgueria/vw/produtos', produtoViewRoute);

//Inicialização da API
const PORT = process.env.PORT || 8080;
>>>>>>> back-end-tabelas

//Porta dinâmica para que api consiga funcionar em qualquer localhost
app.listen(PORT, function(){
<<<<<<< HEAD
    console.log('API Funcionando na porta ' + PORT)
})
=======
    console.log('API Funcionando na porta ' + PORT);
});
>>>>>>> back-end-tabelas
