/********************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de
* relação entre Tipo Sabor e Produto
* Data: 11/06/2026
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const knex = require('knex')

const knexConfig = require('../../database_config_knex/KnexFile.js')

const knexConex = knex(knexConfig.development)

const insertTipoSaborProduto = async function(tipoSaborProduto){
    try {
        let sql = `insert into tbl_tipo_sabor_produto (
                    id_tipo_sabor,
                    id_produto
                    )
                values (
                    ${tipoSaborProduto.id_tipo_sabor},
                    ${tipoSaborProduto.id_produto}
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

const updateTipoSaborProduto = async function(tipoSaborProduto){
    try {
        let sql = `update tbl_tipo_sabor_produto set
                    id_tipo_sabor = ${tipoSaborProduto.id_tipo_sabor},
                    id_produto = ${tipoSaborProduto.id_produto}
                where id = ${tipoSaborProduto.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllTipoSaborProduto = async function(){
    try {
        let sql = `select * from tbl_tipo_sabor_produto order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdTipoSaborProduto = async function(id){
    try {
        let sql = `select * from tbl_tipo_sabor_produto where id = ${id}`

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

const selectTipoSaborByIdProduto = async function(idProduto){
    try {
        let sql = `select tbl_tipo_sabor.*
                    from tbl_tipo_sabor
                        inner join tbl_tipo_sabor_produto
                            on tbl_tipo_sabor.id = tbl_tipo_sabor_produto.id_tipo_sabor
                        inner join tbl_produto
                            on tbl_produto.id = tbl_tipo_sabor_produto.id_produto
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

<<<<<<< HEAD
const selectProdutosByIdTipoSabor = async function(idTipoSabor){
=======
const selectProdutoByIdTipoSabor = async function(idTipoSabor){
>>>>>>> back-end-tabelas
    try {
        let sql = `select tbl_produto.*
                    from tbl_produto
                        inner join tbl_tipo_sabor_produto
                            on tbl_produto.id = tbl_tipo_sabor_produto.id_produto
                        inner join tbl_tipo_sabor
                            on tbl_tipo_sabor.id = tbl_tipo_sabor_produto.id_tipo_sabor
                    where tbl_tipo_sabor.id = ${idTipoSabor}`

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

const deleteTipoSaborProduto = async function(id){
    try {
        let sql = `delete from tbl_tipo_sabor_produto where id = ${id};`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

<<<<<<< HEAD
const deleteTipoSaborByIdProduto = async function(idProduto){
    try {
        let sql = `delete from tbl_tipo_sabor_produto where id_produto = ${idProduto}`
=======
const deleteProdutoByIdTipoSabor = async function(idTipoSabor){
    try {
        let sql = `delete from tbl_tipo_sabor_produto where id_tipo_sabor = ${idTipoSabor}`
>>>>>>> back-end-tabelas

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
    insertTipoSaborProduto,
    updateTipoSaborProduto,
    selectAllTipoSaborProduto,
    selectByIdTipoSaborProduto,
    selectTipoSaborByIdProduto,
<<<<<<< HEAD
    selectProdutosByIdTipoSabor,
    deleteTipoSaborProduto,
    deleteTipoSaborByIdProduto
=======
    selectProdutoByIdTipoSabor,
    deleteTipoSaborProduto,
    deleteProdutoByIdTipoSabor
>>>>>>> back-end-tabelas
}