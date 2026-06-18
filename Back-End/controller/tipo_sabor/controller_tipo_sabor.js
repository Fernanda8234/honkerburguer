/****************************************************************
 * Objetivo: Implementar o crud da tabela intermediária de produto
 * Data: 13/06/2026
 * Autor: Fernanda Mota
 * Versão: 1.11.08
****************************************************************/

//Arquivo de configuração de mensagens
const config_message = require('../modulo/configMessages.js') 

//Chama o DAO de produtos
const tipoSaborDAO = require('../../model/DAO/tipo_sabor/tipo_sabor.js')

// import de arquivo de Controller
const controller_tipo_sabor_produto  = require('./controller_tipo_sabor_produto.js')

//Faz a inserção de novos produtos
const inserirNovoTipoSabor = async function(tipoSabor, contentType){

    let message = JSON.parse(JSON.stringify(config_message))
    
    try{
    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

    let validar = await validarDados(tipoSabor)

    if(validar){
            return validar // 400
        }
        else{

            let result = await tipoSaborDAO.insertTipoSabor(tipoSabor)

            if(result){ // 201
                tipoSabor.id = result

                if (tipoSabor.produto) {
                    for (let produto of tipoSabor.produto) {

                        let tipoSaborProduto = {
                            id_tipo_sabor: tipoSabor.id,
                            id_produto: produto.id
                        }

                        let resultInsertProduto =
                            await controller_tipo_sabor_produto.inserirTipoSaborProduto(tipoSaborProduto)

                            console.log(resultInsertProduto)
                        if (!resultInsertProduto.status) {
                            
                            return message.SUCCESS_CREATED_ITEM_WARNING
                        }
                    }
                }

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response    = tipoSabor
            }else{ // 500
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }

            return message.DEFAULT_MESSAGE
            }
        }else{
            return message.ERROR_CONTENT_TYPE // 415    
        }
    }catch (error){
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

const atualizarTipoSabor = async function(tipoSabor, id, contentType){
    let message = JSON.parse(JSON.stringify(config_message))
    
    try{

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarID = await buscarByIdTipoSabor(id)
            
            if(resultBuscarID.status){
                let validar = await validarDados(tipoSabor, contentType)
 
                if(!validar){

                    tipoSabor.id = id

                    let result = await tipoSaborDAO.updateTipoSabor(tipoSabor)

                    if(result){

                        if(tipoSabor.produto){
                            let resultDeleteProduto = await controller_tipo_sabor_produto.excluirProdutoIdTipoSabor(tipoSabor.id)

                            if(resultDeleteProduto.status){
                                for(produto of tipoSabor.produto){

                                    let tipoSaborProduto = {
                                        "id_tipo_sabor": tipoSabor.id,
                                        "id_produto": produto.id
                                    }

                                    let resultInsertProduto = await controller_tipo_sabor_produto.inserirTipoSaborProduto(tipoSaborProduto)

                                    if(!resultInsertProduto.status){
                                        return message.SUCCESS_CREATED_ITEM_WARNING // 201 com alerta de dados não inseridos
                                    }
                                }
                            }
                        }

                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = tipoSabor
                        return message.DEFAULT_MESSAGE //200 (Atualizado)
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return validar //400
                }
            }else{
                return resultBuscarID // 400 ou 404 ou 500
            }
        }else{
            return message.ERROR_CONTENT_TYPE // 415
        }
    }catch (error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (Controller)
    }
    
}

const listarTipoSabor = async function(){

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        let result = await tipoSaborDAO.selectAllTipoSabor()

        if(result){
            
            if(result.length > 0 ){

                for(tipoSabor of result){

                let resultProduto = await controller_tipo_sabor_produto.buscarProdutoIdTipoSabor(tipoSabor.id)
                    if(resultProduto.status){
                        tipoSabor.produto = resultProduto.response.tipo_sabor_produto
                    }
                }

                message.DEFAULT_MESSAGE.status         = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code    = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.tipo_sabor = result

                return message.DEFAULT_MESSAGE //200 

            }else return message.ERROR_NOT_FOUND //404  

        }else return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller) 
    }
}

const buscarByIdTipoSabor = async function(id){
     //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

        try {
            //Validação para garantir que o ID seja válido
            if(id == undefined || id == '' || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await tipoSaborDAO.selectByIdTipoSabor(id)

            if(result){
                if(result.length > 0){

                    for(tipoSabor of result){

                    let resultProduto = await controller_tipo_sabor_produto.buscarProdutoIdTipoSabor(tipoSabor.id)
                        if(resultProduto.status){
                            tipoSabor.produto = resultProduto.response.tipo_sabor_produto
                        }
                    }

                    message.DEFAULT_MESSAGE.status          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.tipo_sabor  = result

                    return message.DEFAULT_MESSAGE //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else return message.ERROR_INTERNAL_SERVER_MODEL // 500 (model)
        }

        } catch (error) {
            return message.ERROR_INTERNAL_SERVER_CONTROLLER
        }
}

const excluirByIdTipoSabor = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try{
        //Validação do erro 400 e do 404

        let resultBuscarID = await buscarByIdTipoSabor(id)

        if(resultBuscarID.status){
            
            let result = await tipoSaborDAO.deleteByIdTipoSabor(id)

            if(result){
                message.DEFAULT_MESSAGE.status      = message.SUCCESS_DELETED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_DELETED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_DELETED_ITEM.message

                return message.DEFAULT_MESSAGE //200 (Registro excluido)
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL//500 (model)
            }
        }else{
            return resultBuscarID // 400 ou 404
        }

    }catch (error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (Controller)
    }
}

const validarDados = async function(tipoSabor) {
    let message = JSON.parse(JSON.stringify(config_message))

    if (tipoSabor.blend === null || tipoSabor.blend === undefined || tipoSabor.blend <= 0) {
        message.ERROR_BAD_REQUEST.field = '[BLEND] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }
    
    else if (tipoSabor.nome === undefined || tipoSabor.nome === null || tipoSabor.nome === '' || tipoSabor.nome.length > 255) {
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO (Tamanho máximo 255)'
        return message.ERROR_BAD_REQUEST
    }
    else{
        return false
    }
}

module.exports = {
    inserirNovoTipoSabor,
    listarTipoSabor,
    buscarByIdTipoSabor,
    excluirByIdTipoSabor,
    atualizarTipoSabor
}