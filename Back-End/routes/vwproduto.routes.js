/********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de daods MySQL na tabela
 * Data 15/06/2026
 * Autor: Matheus Aguiar
 * Versão: 1.15.06
 ********************************************************************************/

const express = require('express')
const router = express.Router()

const controllerVwProduto = require('../controller/vwproduto/controller_vwproduto')

router.get('/', async function(request, response){

    let result = await controllerVwProduto.listarVwProduto()

    response.status(result.status_code)
    response.json(result)

})

module.exports = router