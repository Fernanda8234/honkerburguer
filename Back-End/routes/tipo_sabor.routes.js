const express       = require('express')
const router        = express.Router()
const bodyParser    = require('body-parser')

//Importando arquivo produto da controller
const tipoSaborController = require('../controller/tipo_sabor/controller_tipo_sabor.js');

//Endpoint para inserir um novo produto
router.post('/', bodyParser.json(), async function(request, response){
    //Recebe o conteúdo dentro do body da requisição
    let dados = request.body

    //Recebe o content type da requisição para validar se é um JSON
    let contentType = request.headers['content-type'] 

    let result = await tipoSaborController.inserirNovoTipoSabor(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para listar todos os produtos
router.get('/', async function(request, response){
    let result = await tipoSaborController.listarTipoSabor()

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para buscar o produto pelo ID
router.get('/:id', async function(request, response) {
    //Recebe o ID via paramêtro
    let id = request.params.id 
    let result = await tipoSaborController.buscarByIdTipoSabor(id)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint para Atualizar um filme pelo ID 
router.put('/:id', bodyParser.json(), async function(request, response){
    // Recebe o content type da requisição
    let contentType = request.headers['content-type']
    // Recebe o ID do registro a ser atualizado
    let id = request.params.id
    // Recebe os dados enviados no corpo da requisição
    let dados = request.body

    // Chama a função de atualizar na controller e encaminha os dados, id e content-type
    // obedecendo a ordem de criação na função da controller
    let result = await tipoSaborController.atualizarTipoSabor(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


//Endpoint para Deletar um produto pelo ID
router.delete('/:id', async function (request, response) {
    let id = request.params.id

    let result = await tipoSaborController.excluirByIdTipoSabor(id)

    response.status(result.status_code)
    response.json(result)
    
})

module.exports = router 