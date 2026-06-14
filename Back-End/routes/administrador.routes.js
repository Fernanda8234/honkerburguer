const express       = require('express')
const router        = express.Router()
const bodyParser    = require('body-parser')

//Importando arquivo administrador da controller
const administradorController = require('../controller/administrador/controller_administrador');

//Endpoint para inserir um novo ADM
router.post('/', bodyParser.json(), async function(request, response){
    //Recebe o conteúdo dentro do body da requisição
    let dados = request.body
    console.log(dados)
    //Recebe o content type da requisição para validar se é um JSON
    let contentType = request.headers['content-type'] 

    let result = await administradorController.inserirNovoAdm(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para listar todas os ADM's
router.get('/', async function(request, response){
    let result = await administradorController.listarAdm()

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para buscar um ADM pelo ID
router.get('/:id', async function(request, response) {
    //Recebe o ID via paramêtro
    let id = request.params.id 
    let result = await administradorController.buscarByIdAdm(id)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint para Atualizar um ADM pelo ID 
router.put('/:id', bodyParser.json(), async function(request, response){
    // Recebe o content type da requisição
    let contentType = request.headers['content-type']
    // Recebe o ID do registro a ser atualizado
    let id = request.params.id
    // Recebe os dados enviados no corpo da requisição
    let dados = request.body

    // Chama a função de atualizar na controller e encaminha os dados, id e content-type
    // obedecendo a ordem de criação na função da controller
    let result = await administradorController.atualizarAdm(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


//Endpoint para Deletar uma ADM pelo ID
router.delete('/:id', async function (request, response) {
    let id = request.params.id

    let result = await administradorController.excluirByIdAdm(id)

    response.status(result.status_code)
    response.json(result)
    
})

module.exports = router 