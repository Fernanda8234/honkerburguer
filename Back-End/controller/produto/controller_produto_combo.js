/********************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de produto e combo
* Data: 11/06/2026
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

// import do arquivo DAO para fazer o CRUD da relação no banco de dados
const produtoComboDAO = require('../../model/DAO/produto_combo/produto_combo.js')

const inserirProdutoCombo = async function(produtoCombo){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(produtoCombo)

        if(validar){
            return validar
        } else {
            let result = await produtoComboDAO.insertProdutoCombo(produtoCombo)

            if(result){
                produtoCombo.id = result

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response    = produtoCombo
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }

            return message.DEFAULT_MESSAGE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarProdutoCombo = async function(produtoCombo, id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarProdutoCombo(id)

        if(resultBuscarID.status){

            let validar = await validarDados(produtoCombo)

            if(!validar){

                produtoCombo.id = id

                let result = await produtoComboDAO.updateProdutoCombo(produtoCombo)

                if(result){

                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = produtoCombo

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

const listarProdutoCombo = async function(){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await produtoComboDAO.selectAllProdutoCombo()

        if(result){

            if(result.length > 0){

                message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count          = result.length
                message.DEFAULT_MESSAGE.response.produto_combo  = result

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

const buscarProdutoCombo = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        if(id == undefined || id == null || id == '' || isNaN(id)){

            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST

        } else {

            let result = await produtoComboDAO.selectByIdProdutoCombo(id)

            if(result){

                if(result.length > 0){

                    message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.produto_combo  = result

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

const buscarProdutoIdCombo = async function(idCombo){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        if(idCombo == undefined || idCombo == null || idCombo == '' || isNaN(idCombo)){

            message.ERROR_BAD_REQUEST.field = '[ID_COMBO] INVÁLIDO'
            return message.ERROR_BAD_REQUEST

        } else {

            let result = await produtoComboDAO.selectProdutosByIdCombo(idCombo)

            if(result){

                if(result.length > 0){

                    message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.produto_combo  = result

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

const buscarComboIdProduto = async function(idProduto){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        if(idProduto == undefined || idProduto == null || idProduto == '' || isNaN(idProduto)){

            message.ERROR_BAD_REQUEST.field = '[ID_PRODUTO] INVÁLIDO'
            return message.ERROR_BAD_REQUEST

        } else {

            let result = await produtoComboDAO.selectCombosByIdProduto(idProduto)

            if(result){

                if(result.length > 0){

                    message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.produto_combo  = result

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

const excluirProdutoCombo = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarID = await buscarProdutoCombo(id)

        if(resultBuscarID.status){

            let result = await produtoComboDAO.deleteProdutoCombo(id)

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

// função para excluir os combos relacionados com o produto
const excluirCombosIdProduto = async function(idProduto){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let result = await produtoComboDAO.deleteCombosByIdProduto(idProduto)

        if(result)
            return message.SUCCESS_DELETED_ITEM
        else
            return message.ERROR_INTERNAL_SERVER_MODEL

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function(produtoCombo){
    let message = JSON.parse(JSON.stringify(config_message))

    if(produtoCombo.id_produto == undefined || produtoCombo.id_produto == '' || produtoCombo.id_produto == null || isNaN(produtoCombo.id_produto)){
        message.ERROR_BAD_REQUEST.field = '[ID_PRODUTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else if(produtoCombo.id_combo == undefined || produtoCombo.id_combo == '' || produtoCombo.id_combo == null || isNaN(produtoCombo.id_combo)){
        message.ERROR_BAD_REQUEST.field = '[ID_COMBO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else{
        return false
    }
}

module.exports = {
    inserirProdutoCombo,
    atualizarProdutoCombo,
    listarProdutoCombo,
    buscarProdutoCombo,
    buscarProdutoIdCombo,
    buscarComboIdProduto,
    excluirProdutoCombo,
    excluirCombosIdProduto
}