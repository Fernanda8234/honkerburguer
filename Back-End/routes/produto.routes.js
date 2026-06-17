const express       = require('express')
const router        = express.Router()
const bodyParser    = require('body-parser')

//Importando arquivo produto da controller
const produtoController = require('../controller/produto/controller_produto.js');
const authToken = require('../middleware/authToken.js')

//Endpoint para inserir um novo produto
router.post('/', authToken.autenticarToken, bodyParser.json(), async function(request, response){
    //Recebe o conteúdo dentro do body da requisição
    let dados = request.body

    //Recebe o content type da requisição para validar se é um JSON
    let contentType = request.headers['content-type'] 

    let result = await produtoController.inserirNovoProduto(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para listar todos os produtos
router.get('/', async function(request, response){
    let result = await produtoController.listarProduto()

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para buscar o produto pelo ID
router.get('/:id', async function(request, response) {
    //Recebe o ID via paramêtro
    let id = request.params.id 
    let result = await produtoController.buscarByIdProduto(id)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint para Atualizar um filme pelo ID 
router.put('/:id', authToken.autenticarToken, bodyParser.json(), async function(request, response){
    // Recebe o content type da requisição
    let contentType = request.headers['content-type']
    // Recebe o ID do registro a ser atualizado
    let id = request.params.id
    // Recebe os dados enviados no corpo da requisição
    let dados = request.body

    // Chama a função de atualizar na controller e encaminha os dados, id e content-type
    // obedecendo a ordem de criação na função da controller
    let result = await produtoController.atualizarProduto(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})


//Endpoint para Deletar um produto pelo ID
router.delete('/:id', authToken.autenticarToken, async function (request, response) {
    let id = request.params.id

    let result = await produtoController.excluirByIdProduto(id)

    response.status(result.status_code)
    response.json(result)
    
})

module.exports = router 
