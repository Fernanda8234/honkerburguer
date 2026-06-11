/********************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de
* relação entre Produto e Combo
* Data: 11/06/2026
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const knex = require('knex')

const knexConfig = require('../../database_config_knew/knexFile.js')

const knexConex = knex(knexConfig.development)

const insertProdutoCombo = async function(produtoCombo){
    try {
        let sql = `insert into tbl_produto_combo (
                    id_produto,
                    id_combo
                    )
                values (
                    ${produtoCombo.id_produto},
                    ${produtoCombo.id_combo}
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

const updateProdutoCombo = async function(produtoCombo){
    try {
        let sql = `update tbl_produto_combo set
                    id_produto = ${produtoCombo.id_produto},
                    id_combo = ${produtoCombo.id_combo}
                where id = ${produtoCombo.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllProdutoCombo = async function(){
    try {
        let sql = `select * from tbl_produto_combo order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdProdutoCombo = async function(id){
    try {
        let sql = `select * from tbl_produto_combo where id = ${id}`

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

const selectProdutosByIdCombo = async function(idCombo){
    try {
        let sql = `select tbl_produto.*
                    from tbl_produto
                        inner join tbl_produto_combo
                            on tbl_produto.id = tbl_produto_combo.id_produto
                        inner join tbl_combo
                            on tbl_combo.id = tbl_produto_combo.id_combo
                    where tbl_combo.id = ${idCombo}`

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

const selectCombosByIdProduto = async function(idProduto){
    try {
        let sql = `select tbl_combo.*
                    from tbl_produto
                        inner join tbl_produto_combo
                            on tbl_produto.id = tbl_produto_combo.id_produto
                        inner join tbl_combo
                            on tbl_combo.id = tbl_produto_combo.id_combo
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

const deleteProdutoCombo = async function(id){
    try {
        let sql = `delete from tbl_produto_combo where id = ${id};`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteCombosByIdProduto = async function(idProduto){
    try {
        let sql = `delete from tbl_produto_combo where id_produto = ${idProduto}`

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
    insertProdutoCombo,
    updateProdutoCombo,
    selectAllProdutoCombo,
    selectByIdProdutoCombo,
    selectProdutosByIdCombo,
    selectCombosByIdProduto,
    deleteProdutoCombo,
    deleteCombosByIdProduto
}