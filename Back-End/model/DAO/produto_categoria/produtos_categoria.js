/********************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de 
*   relação entre Produto e Categoria
* Data: 11/06/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const knex = require('knex')

const knexConfig = require('../../database_config_knew/knexFile.js')

const knexConex = knex(knexConfig.development)

const insertProdutoCategoria = async function(produtoCategoria){
    try {
        let sql = `insert into tbl_produto_categoria (
                    id_produto, 
                    id_categoria
                    ) 
            values (
                    ${produtoCategoria.id_produto},
                    ${produtoCategoria.id_categoria}
                    )`

        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

const updateProdutoCategoria = async function(produtoCategoria){
    try {
        let sql = `update tbl_produto_categoria set
                    id_produto = ${produtoCategoria.id_produto},
                    id_categoria = ${produtoCategoria.id_categoria}
                where id = ${produtoCategoria.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllProdutoCategoria = async function(){
    try {
        let sql = `select * from tbl_produto_categoria order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdProdutoCategoria = async function(id){
    try {
        let sql = `select * from tbl_produto_categoria where id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        } else{
            return false
        }
    } catch (error) {
        return false   
    }
}

const selectProdutosByIdCategoria = async function(idCategoria){
    try {
        let sql = `select tbl_produto.*
                        from tbl_produto
                            inner join tbl_produto_categoria
                                on tbl_produto.id = tbl_produto_categoria.id_produto 
                            inner join tbl_categoria
                                on tbl_categoria.id = tbl_produto_categoria.id_categoria
                    where tbl_categoria.id = ${idCategoria}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        } else{
            return false
        }
    } catch (error) {
        return false   
    }
}

const selectCategoriasByIdProduto = async function(idProduto){
    try {
        let sql = `select tbl_categoria.*
                        from tbl_produto
                            inner join tbl_produto_categoria
                                on tbl_produto.id = tbl_produto_categoria.id_produto 
                            inner join tbl_categoria
                                on tbl_categoria.id = tbl_produto_categoria.id_categoria
                    where tbl_produto.id = ${idProduto}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        } else{
            return false
        }
    } catch (error) {
        return false   
    }
}

const deleteProdutoCategoria = async function(id){
    try {
        let sql = `delete from tbl_produto_categoria where id = ${id};`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteCategoriasByIdProduto = async function(idProduto){
    try {
        let sql = `delete from tbl_produto_categoria where id_produto = ${idProduto}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertProdutoCategoria,
    updateProdutoCategoria,
    selectAllProdutoCategoria,
    selectByIdProdutoCategoria,
    selectProdutosByIdCategoria,
    selectCategoriasByIdProduto,
    deleteProdutoCategoria,
    deleteCategoriasByIdProduto
}