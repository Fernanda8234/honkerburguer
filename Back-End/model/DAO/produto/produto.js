/********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de daods MySQL na tabela
 * Data 11/06/2026
 * Autor: Matheus Aguiar
 * Versão: 1.11.06
 ********************************************************************************/

//import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

//Import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knex/KnexFile.js')

//Criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

const insertProduto = async function(produto) {
    try {
        let sql = `insert into tbl_produto (
                        nome,
                        preco,
                        url_imagem,
                        descricao,
                        disponibilidade,
                        classificacao_alimentar,
                        desconto,
                        data_inicio_campanha,
                        data_fim_campanha
                    ) values (
                        '${produto.nome}',
                        ${produto.preco},
                        '${produto.url_imagem}',
                        '${produto.descricao}',
                        ${produto.disponibilidade},
                        '${produto.classificacao_alimentar}',
                        ${produto.desconto !== null && produto.desconto !== undefined ? produto.desconto : 'NULL'},
                        ${produto.data_inicio_campanha ? `'${produto.data_inicio_campanha}'` : 'NULL'},
                        ${produto.data_fim_campanha    ? `'${produto.data_fim_campanha}'`    : 'NULL'}
                    );`
 
        let result = await knexConex.raw(sql)
 
        if (result) return result[0].insertId
        else return false
 
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateProduto = async function(produto) {
    try {
        let sql = `update tbl_produto set
                        nome                    = '${produto.nome}',
                        preco                   = ${produto.preco},
                        url_imagem              = '${produto.url_imagem}',
                        descricao               = '${produto.descricao}',
                        disponibilidade         = ${produto.disponibilidade},
                        classificacao_alimentar = '${produto.classificacao_alimentar}',
                        desconto                = ${produto.desconto !== null && produto.desconto !== undefined ? produto.desconto : 'NULL'},
                        data_inicio_campanha    = ${produto.data_inicio_campanha ? `'${produto.data_inicio_campanha}'` : 'NULL'},
                        data_fim_campanha       = ${produto.data_fim_campanha    ? `'${produto.data_fim_campanha}'`    : 'NULL'}
                    where id = ${produto.id}`
 
        let result = await knexConex.raw(sql)
 
        if (result) return true
        else return false
 
    } catch (error) {
        console.log(error)
        return false
    }
}

const selectAllProduto = async function() {
    try {
        let sql = 'select * from tbl_produto order by id desc'
        let result = await knexConex.raw(sql)
 
        if (Array.isArray(result)) return result[0]
        else return false
 
    } catch (error) {
        console.log(error)
        return false
    }
}

const selectByIdProduto = async function(id) {
    try {
        let sql = `select * from tbl_produto where id = ${id}`
        let result = await knexConex.raw(sql)
 
        if (Array.isArray(result)) return result[0]
        else return false
 
    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteByIdProduto = async function(id) {
    try {
        let sql = `delete from tbl_produto where id = ${id}`
        let result = await knexConex.raw(sql)
 
        if (result) return true
        else return false
 
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertProduto,
    updateProduto,
    selectAllProduto,
    selectByIdProduto,
    deleteByIdProduto
}