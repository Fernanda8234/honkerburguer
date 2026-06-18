/********************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de produto e categoria
* Data: 11/06/2026
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

// import do arquivo DAO para fazer o CRUD da relação no banco de dados
const produtoCategoriaDAO = require('../../model/DAO/produto_categoria/produtos_categoria.js')

const inserirProdutoCategoria = async function(produtoCategoria){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(produtoCategoria)

        if(validar){
            return validar
        } else {
            let result = await produtoCategoriaDAO.insertProdutoCategoria(produtoCategoria)

            if(result){
                produtoCategoria.id = result

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response    = produtoCategoria
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }

            return message.DEFAULT_MESSAGE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarProdutoCategoria = async function(produtoCategoria, id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarProdutoCategoria(id)

        if(resultBuscarID.status){

            let validar = await validarDados(produtoCategoria)

            if(!validar){

                produtoCategoria.id = id

                let result = await produtoCategoriaDAO.updateProdutoCategoria(produtoCategoria)

                if(result){

                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = produtoCategoria

                    return message.DEFAULT_MESSAGE

                } else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }

            } else{
                return validar
            }

        } else{
            return resultBuscarID
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarProdutoCategoria = async function(){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoCategoriaDAO.selectAllProdutoCategoria()

        if(result){

            if(result.length > 0){

                message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count              = result.length
                message.DEFAULT_MESSAGE.response.produto_categoria  = result

                return message.DEFAULT_MESSAGE

            } else{
                return message.ERROR_NOT_FOUND
            }

        } else{
            return message.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarProdutoCategoria = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        if(id == undefined || id == null || id == '' || isNaN(id)){

            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST

        } else {

            let result = await produtoCategoriaDAO.selectByIdProdutoCategoria(id)

            if(result){

                if(result.length > 0){

                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.produto_categoria  = result

                    return message.DEFAULT_MESSAGE

                } else{
                    return message.ERROR_NOT_FOUND
                }

            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarProdutoIdCategoria = async function(idCategoria){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        if(idCategoria == undefined || idCategoria == null || idCategoria == '' || isNaN(idCategoria)){

            message.ERROR_BAD_REQUEST.field = '[ID_CATEGORIA] INVÁLIDA'
            return message.ERROR_BAD_REQUEST

        } else {

            let result = await produtoCategoriaDAO.selectProdutosByIdCategoria(idCategoria)

            if(result){

                if(result.length > 0){

                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.produto_categoria  = result

                    return message.DEFAULT_MESSAGE

                } else{
                    return message.ERROR_NOT_FOUND
                }

            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarCategoriaIdProduto = async function(idProduto){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        if(idProduto == undefined || idProduto == null || idProduto == '' || isNaN(idProduto)){

            message.ERROR_BAD_REQUEST.field = '[ID_PRODUTO] INVÁLIDO'
            return message.ERROR_BAD_REQUEST

        } else {

            let result = await produtoCategoriaDAO.selectCategoriasByIdProduto(idProduto)

            if(result){

                if(result.length > 0){

                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.produto_categoria  = result

                    return message.DEFAULT_MESSAGE

                } else{
                    return message.ERROR_NOT_FOUND
                }

            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirProdutoCategoria = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarID = await buscarProdutoCategoria(id)

        if(resultBuscarID.status){

            let result = await produtoCategoriaDAO.deleteProdutoCategoria(id)

            if(result){

<<<<<<< HEAD
                message.DEFAULT_MESSAGE.status      = message.SUCCESS_DELETE_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_DELETE_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_DELETE_ITEM.message
=======
                message.DEFAULT_MESSAGE.status      = message.SUCCESS_DELETED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_DELETED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_DELETED_ITEM.message
>>>>>>> back-end-tabelas

                return message.DEFAULT_MESSAGE

            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }

        } else{
            return resultBuscarID
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// função para excluir as categorias relacionadas com o produto
const excluirCategoriasIdProduto = async function(idProduto){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let result = await produtoCategoriaDAO.deleteCategoriasByIdProduto(idProduto)

        if(result)
<<<<<<< HEAD
            return message.SUCCESS_DELETE_ITEM
=======
            return message.SUCCESS_DELETED_ITEM
>>>>>>> back-end-tabelas
        else
            return message.ERROR_INTERNAL_SERVER_MODEL

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function(produtoCategoria){
    let message = JSON.parse(JSON.stringify(config_message))

    if(produtoCategoria.id_produto == undefined || produtoCategoria.id_produto == '' || produtoCategoria.id_produto == null || isNaN(produtoCategoria.id_produto)){
        message.ERROR_BAD_REQUEST.field = '[ID_PRODUTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else if(produtoCategoria.id_categoria == undefined || produtoCategoria.id_categoria == '' || produtoCategoria.id_categoria == null || isNaN(produtoCategoria.id_categoria)){
        message.ERROR_BAD_REQUEST.field = '[ID_CATEGORIA] INVÁLIDA'
        return message.ERROR_BAD_REQUEST
    }

    else{
        return false
    }
}

module.exports = {
    inserirProdutoCategoria,
    atualizarProdutoCategoria,
    listarProdutoCategoria,
    buscarProdutoCategoria,
    buscarProdutoIdCategoria,
    buscarCategoriaIdProduto,
    excluirProdutoCategoria,
    excluirCategoriasIdProduto
}