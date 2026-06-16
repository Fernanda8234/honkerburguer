/********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de daods MySQL na tabela
 * Data 15/06/2026
 * Autor: Matheus Aguiar
 * Versão: 1.15.06
 ********************************************************************************/

//import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

//Import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knex/KnexFile.js')

//Criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

const selectAllVwProduto = async function(){

    try {

        let sql = 'select * from vwProduto order by nome_produto'

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }

    } catch (error) {

        console.log(error)
        return false

    }

}

module.exports = {
    selectAllVwProduto
}