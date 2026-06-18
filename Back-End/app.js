//Express para chamar o banco de dados
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

//Configuração do cors
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
}))

//MiddleWares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Importando rotas
const produtoRoutes       = require('./routes/produto.routes.js')
const tipoSaborRoutes     = require('./routes/tipo_sabor.routes.js')
const categoriaRoutes     = require('./routes/categoria.routes.js')
const comboRoutes         = require('./routes/combos.routes.js')
const administradorRoutes = require('./routes/administrador.routes.js')
const produtoViewRoute    = require('./routes/vwproduto.routes.js')

//Endpoints
app.use('/v1/senai/hamburgueria/produto', produtoRoutes)
app.use('/v1/senai/hamburgueria/tipo_sabor', tipoSaborRoutes)
app.use('/v1/senai/hamburgueria/categoria', categoriaRoutes)
app.use('/v1/senai/hamburgueria/combo', comboRoutes)
app.use('/v1/senai/hamburgueria/administrador', administradorRoutes)

//View
app.use('/v1/senai/hamburgueria/vw/produtos', produtoViewRoute)

//Porta dinâmica
const PORT = process.env.PORT || 8080

app.listen(PORT, function () {
    console.log('API Funcionando na porta ' + PORT)
})