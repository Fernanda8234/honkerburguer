/********************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de tipo sabor e produto
* Data: 11/06/2026
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

// import do arquivo DAO para fazer o CRUD da relação no banco de dados
const tipoSaborProdutoDAO = require('../../model/DAO/tipo_sabor_produto/tipo_sabor_produto.js')

const inserirTipoSaborProduto = async function(tipoSaborProduto){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(tipoSaborProduto)

        if(validar){
            return validar
        } else {
            let result = await tipoSaborProdutoDAO.insertTipoSaborProduto(tipoSaborProduto)

            if(result){
                tipoSaborProduto.id = result

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response    = tipoSaborProduto
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }

            return message.DEFAULT_MESSAGE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarTipoSaborProduto = async function(tipoSaborProduto, id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarTipoSaborProduto(id)

        if(resultBuscarID.status){

            let validar = await validarDados(tipoSaborProduto)

            if(!validar){

                tipoSaborProduto.id = id

                let result = await tipoSaborProdutoDAO.updateTipoSaborProduto(tipoSaborProduto)

                if(result){

                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = tipoSaborProduto

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

const listarTipoSaborProduto = async function(){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await tipoSaborProdutoDAO.selectAllTipoSaborProduto()

        if(result){

            if(result.length > 0){

                message.DEFAULT_MESSAGE.status                        = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code                   = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count                = result.length
                message.DEFAULT_MESSAGE.response.tipo_sabor_produto   = result

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

const buscarTipoSaborProduto = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        if(id == undefined || id == null || id == '' || isNaN(id)){

            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST

        } else {

            let result = await tipoSaborProdutoDAO.selectByIdTipoSaborProduto(id)

            if(result){

                if(result.length > 0){

                    message.DEFAULT_MESSAGE.status                        = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                   = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.tipo_sabor_produto   = result

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

const buscarProdutoIdTipoSabor = async function(idTipoSabor){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        if(idTipoSabor == undefined || idTipoSabor == null || idTipoSabor == '' || isNaN(idTipoSabor)){

            message.ERROR_BAD_REQUEST.field = '[ID_TIPO_SABOR] INVÁLIDO'
            return message.ERROR_BAD_REQUEST

        } else {

            let result = await tipoSaborProdutoDAO.selectProdutoByIdTipoSabor(idTipoSabor)

            if(result){

                if(result.length > 0){

                    message.DEFAULT_MESSAGE.status                        = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                   = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.tipo_sabor_produto   = result

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

const buscarTipoSaborIdProduto = async function(idProduto){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        if(idProduto == undefined || idProduto == null || idProduto == '' || isNaN(idProduto)){

            message.ERROR_BAD_REQUEST.field = '[ID_PRODUTO] INVÁLIDO'
            return message.ERROR_BAD_REQUEST

        } else {

            let result = await tipoSaborProdutoDAO.selectTipoSaborByIdProduto(idProduto)

            if(result){

                if(result.length > 0){

                    message.DEFAULT_MESSAGE.status                        = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                   = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.tipo_sabor_produto   = result

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

const excluirTipoSaborProduto = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarID = await buscarTipoSaborProduto(id)

        if(resultBuscarID.status){

            let result = await tipoSaborProdutoDAO.deleteTipoSaborProduto(id)

            if(result){

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_DELETED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_DELETED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_DELETED_ITEM.message

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

// função para excluir os produtos relacionados com o tipo sabor
const excluirProdutoIdTipoSabor = async function(idTipoSabor){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let result = await tipoSaborProdutoDAO.deleteProdutoByIdTipoSabor(idTipoSabor)

        if(result)
            return message.SUCCESS_DELETED_ITEM
        else
            return message.ERROR_INTERNAL_SERVER_MODEL

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function(tipoSaborProduto){
    let message = JSON.parse(JSON.stringify(config_message))

    if(tipoSaborProduto.id_tipo_sabor == undefined || tipoSaborProduto.id_tipo_sabor == '' || tipoSaborProduto.id_tipo_sabor == null || isNaN(tipoSaborProduto.id_tipo_sabor)){
        message.ERROR_BAD_REQUEST.field = '[ID_TIPO_SABOR] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else if(tipoSaborProduto.id_produto == undefined || tipoSaborProduto.id_produto == '' || tipoSaborProduto.id_produto == null || isNaN(tipoSaborProduto.id_produto)){
        message.ERROR_BAD_REQUEST.field = '[ID_PRODUTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else{
        return false
    }
}

module.exports = {
    inserirTipoSaborProduto,
    atualizarTipoSaborProduto,
    listarTipoSaborProduto,
    buscarTipoSaborProduto,
    buscarProdutoIdTipoSabor,
    buscarTipoSaborIdProduto,
    excluirTipoSaborProduto,
    excluirProdutoIdTipoSabor
}