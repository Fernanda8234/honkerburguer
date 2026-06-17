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
    try {
        let result = await controllerVwProduto.listarVwProduto()
        
        return response.status(result.status_code || 200).json(result)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ status: false, status_code: 500, message: "Erro interno na rota." })
    }
})

module.exports = router