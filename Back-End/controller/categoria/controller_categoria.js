/****************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e
 *          Manipulação de dados para o CRUD de produto
 * Data: 11/06/2026
 * Autor: Fernanda Mota
 * Versão: 1.11.07
****************************************************************/

//Arquivo de configuração de mensagens
const config_message = require('../modulo/configMessages.js')

//Chama o DAO de produtos
const categoriaDAO = require('../../model/DAO/categoria/categoria.js')

//Faz a inserção de novos produtos
const inserirNovaCategoria = async function(categoria, contentType){

    let message = JSON.parse(JSON.stringify(config_message))
    
    try{
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

        let validar = await validarDados(categoria)

        if(validar){
            return validar // 400
        }
            else{

                let result = await categoriaDAO.insertCategoria(categoria)

                if(result){ // 201
                    categoria.id = result
                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = categoria
                }else{ // 500
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
                }

                return message.DEFAULT_MESSAGE
            }
        }else{
            return message.ERROR_CONTENT_TYPE // 415    
        }
    }catch (error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

const atualizarCategoria = async function(categoria, id, contentType){
    let message = JSON.parse(JSON.stringify(config_message))
    
    try{

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarID = await buscarByIdCategoria(id)
            
            if(resultBuscarID.status){
                let validar = await validarDados(categoria, contentType)
 
                if(!validar){

                    categoria.id = id

                    let result = await categoriaDAO.updateCategoria(categoria)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status  // ✅ corrigido (era SUCESS_)
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = categoria
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
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (Controller)
    }
    
}

const listarCategorias = async function(){

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        let result = await categoriaDAO.selectAllCategoria()

        if(result){
            
            if(result.length > 0 ){
                message.DEFAULT_MESSAGE.status         = message.SUCCESS_RESPONSE.status       // ✅ corrigido (era SUCESS_)
                message.DEFAULT_MESSAGE.status_code    = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.categoria = result

                return message.DEFAULT_MESSAGE //200 

            }else return message.ERROR_NOT_FOUND //404  

        }else return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller) 
    }
}

const buscarByIdCategoria = async function(id){
    //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

        try {
            //Validação para garantir que o ID seja válido
            if(id == undefined || id == '' || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await categoriaDAO.selectByIdCategoria(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status          = message.SUCCESS_RESPONSE.status      // ✅ corrigido (era SUCESS_)
                    message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.categoria  = result

                    return message.DEFAULT_MESSAGE //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else return message.ERROR_INTERNAL_SERVER_MODEL // ✅ corrigido (era result = sem return)
        }

        } catch (error) {
            return message.ERROR_INTERNAL_SERVER_CONTROLLER
        }
}

const excluirByIdCategoria = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try{
        let resultBuscarID = await buscarByIdCategoria(id)

        if(resultBuscarID.status){
            
            let result = await categoriaDAO.deleteByIdCategoria(id)

            if(result){
                message.DEFAULT_MESSAGE.status      = message.SUCCESS_DELETED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_DELETED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_DELETED_ITEM.message

                return message.DEFAULT_MESSAGE //200 (Registro excluído)
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
            }
        }else{
            return resultBuscarID // 400 ou 404
        }

    }catch (error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (Controller)
    }
}

const validarDados = async function(categoria) {
    let message = JSON.parse(JSON.stringify(config_message))

    if (categoria.nome === undefined || categoria.nome === null || categoria.nome === '' || categoria.nome.length > 255) {
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO (Tamanho máximo 255)'
        return message.ERROR_BAD_REQUEST
    }
    else if (categoria.descricao === undefined || categoria.descricao === null || categoria.descricao === '' ) {
        message.ERROR_BAD_REQUEST.field = '[DESCRIÇÃO] INVÁLIDA (Tamanho máximo 255)'
        return message.ERROR_BAD_REQUEST
    }
    else{
        return false
    }
}

module.exports = {
    inserirNovaCategoria,
    listarCategorias,
    buscarByIdCategoria,
    excluirByIdCategoria,
    atualizarCategoria
}