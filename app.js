const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

//Fazendo com que o swagger leia o arquivo YAML para gerar a documentação em web
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

//Import das CONTROLLERS do projeto
//
//
//

const app = express()

//Carregando o arquivo YAML para o swagger
const swaggerDocument = YAML.load('./openapi.yaml')

const corsOptions = {
    origin: ['*'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-type', 'Autorization']
}

app.use(cors(corsOptions))

//Configuração do Swagger para acessar a documentação da API
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
)

//Importação dos endpoints

//Importação do tipo de endpoint

//Endpoints com o .use



//Seve para inicializar a API para receber requisições
const PORT = process.env.PORT || 8080;

app.listen(PORT, function(){
    console.log('API Funcionando na porta ' + PORT);
})