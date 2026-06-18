/****************************************************************
 * Objetivo: Implementar o crud das tabelas intermediárias de categoria e combo
 * Data: 13/06/2026
 * Autor: Fernanda Mota
 * Versão: 1.11.08
****************************************************************/

//Arquivo de configuração de mensagens
const config_message = require('../modulo/configMessages.js') 

//Chama o DAO de produtos
const produtoDAO = require('../../model/DAO/produto/produto.js')

// import de arquivos de Controller
const controller_produto_categoria  = require('./controller_produto_categoria.js')
const controller_produto_combo      = require('./controller_produto_combo.js')

//Faz a inserção de novos produtos
const inserirNovoProduto = async function(produto, contentType){

    let message = JSON.parse(JSON.stringify(config_message))
    
    try{
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

        let validar = await validarDados(produto)

        if(validar){
            return validar // 400
        }
        else{

            let result = await produtoDAO.insertProduto(produto)

            if(result){ // 201
                produto.id = result

                if(produto.categoria){
                    for(categoria of produto.categoria){

                        let produtoCategoria = {"id_produto": produto.id,
                                                "id_categoria": categoria.id
                        }

                        let resultInsertCategoria = await controller_produto_categoria.inserirProdutoCategoria(produtoCategoria)

                        if(!resultInsertCategoria.status){
                            return message.SUCCESS_CREATED_ITEM_WARNING // 201 com alerta de dados não inseridos
                        }
                    }
                }

                if(produto.combo){
                    for(combo of produto.combo){

                        let produtoCombo = {"id_produto": produto.id,
                                            "id_combo": combo.id
                        }

                        let resultInsertCombo = await controller_produto_combo.inserirProdutoCombo(produtoCombo)

                        if(!resultInsertCombo.status){
                            return message.SUCCESS_CREATED_ITEM_WARNING // 201 com alerta de dados não inseridos
                        }
                    }
                }

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response    = produto
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

const atualizarProduto = async function(produto, contentType, id){
    let message = JSON.parse(JSON.stringify(config_message))
    
    try{

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarID = await buscarByIdProduto(id)
            
            if(resultBuscarID.status){
                let validar = await validarDados(produto)
 
                if(!validar){

                    produto.id = id

                    let result = await produtoDAO.updateProduto(produto)

                    if(result){

                        if(produto.categoria){
                            let resultDeleteCategoria = await controller_produto_categoria.excluirCategoriasIdProduto(produto.id)

                            if(resultDeleteCategoria.status){
                                for(categoria of produto.categoria){

                                    let produtoCategoria = {
                                        "id_produto": produto.id,
                                        "id_categoria": categoria.id || categoria
                                    }

                                    let resultInsertCategoria = await controller_produto_categoria.inserirProdutoCategoria(produtoCategoria)

                                    if(!resultInsertCategoria.status){
                                        return message.SUCCESS_CREATED_ITEM_WARNING // 201 com alerta de dados não inseridos
                                    }
                                }
                            }
                        }

                        if(produto.combo){
                            let resultDeleteCombo = await controller_produto_combo.excluirCombosIdProduto(produto.id)

                            if(resultDeleteCombo.status){
                                for(combo of produto.combo){

                                    let produtoCombo = {
                                        "id_produto": produto.id,
                                        "id_combo": combo.id || combo
                                    }

                                    let resultInsertCombo = await controller_produto_combo.inserirProdutoCombo(produtoCombo)

                                    if(!resultInsertCombo.status){
                                        return message.SUCCESS_CREATED_ITEM_WARNING // 201 com alerta de dados não inseridos
                                    }
                                }
                            }
                        }

                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = produto
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

const listarProduto = async function(){

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        let result = await produtoDAO.selectAllProduto()

        if(result){
            
            if(result.length > 0 ){

                for(produto of result){

                    let resultCategoria = await controller_produto_categoria.buscarCategoriaIdProduto(produto.id)
                        if(resultCategoria.status){
                            produto.categoria = resultCategoria.response.produto_categoria
                        }

                    let resultCombo = await controller_produto_combo.buscarComboIdProduto(produto.id)
                        if(resultCombo.status){
                            produto.combo = resultCombo.response.produto_combo
                        }
                }

                message.DEFAULT_MESSAGE.status         = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code    = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.produto = result

                return message.DEFAULT_MESSAGE //200 

            }else return message.ERROR_NOT_FOUND //404   

        }else return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller) 
    }
}

const buscarByIdProduto = async function(id){
     //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

        try {
            //Validação para garantir que o ID seja válido
            if(id == undefined || id == '' || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await produtoDAO.selectByIdProduto(id)

            if(result){
                if(result.length > 0){

                    for(produto of result){

                        let resultCategoria = await controller_produto_categoria.buscarCategoriaIdProduto(produto.id)
                            if(resultCategoria.status){
                                produto.categoria = resultCategoria.response.produto_categoria
                            }

                        let resultCombo = await controller_produto_combo.buscarComboIdProduto(produto.id)
                            if(resultCombo.status){
                                produto.combo = resultCombo.response.produto_combo
                            }
                    }

                    message.DEFAULT_MESSAGE.status          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.produtos  = result

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
const excluirByIdProduto = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try{
        //Validação do erro 400 e do 404

        let resultBuscarID = await buscarByIdProduto(id)

        if(resultBuscarID.status){
            
            let result = await produtoDAO.deleteByIdProduto(id)

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

const validarDados = async function(produto) {
    let message = JSON.parse(JSON.stringify(config_message))
    const descricaoParaValidar = produto.descricao || produto.descriçao_categoria

    if (!produto.nome || produto.nome.length > 255) {
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else if (!produto.preco || isNaN(produto.preco) || produto.preco < 0) {
        message.ERROR_BAD_REQUEST.field = '[PREÇO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }
    else if (!produto.url_imagem) {
        message.ERROR_BAD_REQUEST.field = '[URL_IMAGEM] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }
    else if (produto.disponibilidade === undefined || (produto.disponibilidade !== 0 && produto.disponibilidade !== 1)) {
        message.ERROR_BAD_REQUEST.field = '[DISPONIBILIDADE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }
    else if (!descricaoParaValidar || descricaoParaValidar.trim() === "") { 
        message.ERROR_BAD_REQUEST.field = '[DESCRICAO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else{
        produto.descricao = descricaoParaValidar
        console.log(descricaoParaValidar)
        return false
    } 
}

module.exports = {
    inserirNovoProduto,
    listarProduto,
    buscarByIdProduto,
    excluirByIdProduto,
    atualizarProduto
}