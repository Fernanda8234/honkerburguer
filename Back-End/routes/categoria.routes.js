const express       = require('express')
const router        = express.Router()
const bodyParser    = require('body-parser')

//Importando arquivo categoria da controller
const categoriaController = require('../controller/categoria/controller_categoria.js');

//Endpoint para inserir uma nova categoria
router.post('/', bodyParser.json(), async function(request, response){
    //Recebe o conteúdo dentro do body da requisição
    let dados = request.body

    //Recebe o content type da requisição para validar se é um JSON
    let contentType = request.headers['content-type'] 

    let result = await categoriaController.inserirNovaCategoria(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para listar todas as categorias
router.get('/', async function(request, response){
    let result = await categoriaController.listarCategorias()

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para buscar a categoria pelo ID
router.get('/:id', async function(request, response) {
    //Recebe o ID via paramêtro
    let id = request.params.id 
    let result = await categoriaController.buscarByIdCategoria(id)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint para Atualizar uma categoria pelo ID 
router.put('/:id', bodyParser.json(), async function(request, response){
    // Recebe o content type da requisição
    let contentType = request.headers['content-type']
    // Recebe o ID do registro a ser atualizado
    let id = request.params.id
    // Recebe os dados enviados no corpo da requisição
    let dados = request.body

    // Chama a função de atualizar na controller e encaminha os dados, id e content-type
    // obedecendo a ordem de criação na função da controller
    let result = await categoriaController.atualizarCategoria(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


//Endpoint para Deletar uma categoria pelo ID
router.delete('/:id', async function (request, response) {
    let id = request.params.id

    let result = await categoriaController.excluirByIdCategoria(id)

    response.status(result.status_code)
    response.json(result)
    
})

module.exports = router 