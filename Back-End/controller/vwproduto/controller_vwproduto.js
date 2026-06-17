/********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de daods MySQL na tabela
 * Data 15/06/2026
 * Autor: Matheus Aguiar
 * Versão: 1.15.06
 ********************************************************************************/


const vwProdutoDAO = require('../../model/DAO/vwproduto/vwproduto')

const config_message = require('../modulo/configMessages.js')

const listarVwProduto = async function(){

    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let result = await vwProdutoDAO.selectAllVwProduto()

        if(result){

            if(result.length > 0){

                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.vw_produto = result

                return message.DEFAULT_MESSAGE

            }else{
                return message.ERROR_NOT_FOUND
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER_CONTROLLER

    }

}

module.exports = {
    listarVwProduto
}