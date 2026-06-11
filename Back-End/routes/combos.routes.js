const express       = require('express')
const router        = express.Router()
const bodyParser    = require('body-parser')

const comboController = require('../controller/combo/controller_combo.js')

router.post('/', bodyParser.json(), async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await comboController.inserirCombo(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function(request, response){
    let result = await comboController.listarCombo()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function(request, response){
    let id = request.params.id

    let result = await comboController.buscarCombo(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParser.json(), async function(request, response){
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await comboController.atualizarCombo(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function(request, response){
    let id = request.params.id

    let result = await comboController.excluirCombo(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router