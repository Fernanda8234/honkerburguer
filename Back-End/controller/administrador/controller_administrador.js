/****************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e
 *          Manipulação de dados para o CRUD da tabela ADM
 * Data: 12/06/2026
 * Autor: Aryely Hevylyn
 * Versão: 1.11.07
****************************************************************/

//Arquivo de configuração de mensagens
const config_message = require('../modulo/configMessages.js')

//Chama o DAO de produtos
const administradorDAO = require('../../model/DAO/administrador/administrador.js')

//Faz a inserção de novos produtos
const inserirNovoAdm = async function(administrador, contentType){

    let message = JSON.parse(JSON.stringify(config_message))
    
    try{
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

        let validar = await validarDados(administrador)

        console.log(validar) //está retornando false

        if(validar){
            return validar // 400
        }
            else{

                let result = await administradorDAO.insertAdm(administrador)

                if(result){ // 201
                    administrador.id = result
                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = administrador
                }else{ // 500
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
                }

                return message.DEFAULT_MESSAGE
            }
        }else{
            return message.ERROR_CONTENT_TYPE // 415    
        }
    }catch (error){
        console.log(error) //o erro não está chegando aqui
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

const atualizarAdm = async function(administrador, id, contentType){
    let message = JSON.parse(JSON.stringify(config_message))
    
    try{

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarID = await buscarByIdAdm(id)
            
            if(resultBuscarID.status){
                let validar = await validarDados(administrador, contentType)
 
                if(!validar){

                    administrador.id = id

                    let result = await administradorDAO.updateAdm(administrador)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status  // ✅ corrigido (era SUCESS_)
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = administrador
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

const listarAdm = async function(){

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        let result = await administradorDAO.selectAllAdm()

        if(result){
            
            if(result.length > 0 ){
                message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status     
                message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count          = result.length
                message.DEFAULT_MESSAGE.response.administrador  = result

                return message.DEFAULT_MESSAGE //200 

            }else return message.ERROR_NOT_FOUND //404  

        }else return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller) 
    }
}

const buscarByIdAdm = async function(id){
    //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

        try {
            //Validação para garantir que o ID seja válido
            if(id == undefined || id == '' || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await administradorDAO.selectByIdAdm(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status     
                    message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.administrador  = result

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

const excluirByIdAdm = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try{
        let resultBuscarID = await buscarByIdAdm(id)

        if(resultBuscarID.status){
            
            let result = await administradorDAO.deleteByIdAdm(id)

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

const validarDados = async function(administrador) {
    let message = JSON.parse(JSON.stringify(config_message))

    if (administrador.nome === undefined || administrador.nome === null || administrador.nome === '' || administrador.nome.length > 255) {
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST

    }else if (administrador.email === undefined || administrador.email === null || administrador.email === '' || administrador.email.length > 255 ) {
        message.ERROR_BAD_REQUEST.field = '[EMAIL] INVÁLIDO'
        return message.ERROR_BAD_REQUEST

    }else if (administrador.data_nascimento === undefined || administrador.data_nascimento === null || administrador.data_nascimento === '' || administrador.data_nascimento.length != 10 ) {
        //administrador.data_nascimento.length != 10 -> se a data for diferente de 10 caracters retorne uma menssagem de erro
        message.ERROR_BAD_REQUEST.field = '[DATA DE NASCIMENTO] INVÁLIDA'
        return message.ERROR_BAD_REQUEST

    }else if (administrador.telefone === undefined || administrador.telefone === null || administrador.telefone === '' || administrador.telefone.length > 20 ) {
        message.ERROR_BAD_REQUEST.field = '[TELEFONE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST

    }else if (administrador.codigo_acesso === undefined || administrador.codigo_acesso === null || administrador.codigo_acesso === '' || administrador.codigo_acesso.length > 6 ) {
        message.ERROR_BAD_REQUEST.field = '[CODIGO DE ACESSO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST

    }else{
        return false
    }
}

module.exports = {
    inserirNovoAdm,
    listarAdm,
    buscarByIdAdm,
    excluirByIdAdm,
    atualizarAdm
}