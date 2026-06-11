//Express
const express       = require('express')
const app           = express()
const bodyParser    = require('body-parser')

//Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()
//Cors
const cors          = require('cors')
//CorsOptions para liberar o acesso a API para qualquer termo
const corsOptions = {
    origin: ['*'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-type', 'Authorization']
}

app.use(cors(corsOptions))


//Import das ROTAS do projeto
const produtoRoutes = require('./routes/produto.routes.js');

const tipoSaborRoutes = require('./routes/tipo_sabor.routes.js');

//Importação dos endpoints com o .use
app.use('/v1/senai/hamburgueria/produto', produtoRoutes);
app.use('/v1/senai/hamburgueria/tipo_sabor', tipoSaborRoutes);

//Seve para inicializar a API para receber requisições
const PORT = process.env.PORT || 8080;

app.listen(PORT, function(){
    console.log('API Funcionando na porta ' + PORT);
})