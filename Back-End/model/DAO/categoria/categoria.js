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

const insertCategoria = async function(categoria){
    try {
        let sql = `insert into tbl_categoria (
                            nome,
                            descricao
                            )
                    values(
                            '${categoria.nome}',
                            '${categoria.descricao}'
                            );`
    
        //Executar o scriptSQL no banco de dados
        let result = await knexConex.raw(sql)
    
        if(result) return result[0].insertId //Retorna o ID gerado no banco de dados
        else return false
        
        }catch(error){
            console.log(error)
            return false
        }
}

const updateCategoria = async function(categoria){
        try {
            // Script para atualizar os dados do BD
            let sql = `update tbl_categoria set
                            nome            = '${categoria.nome}',
                            descricao       = '${categoria.descricao}'
                            where id        =  ${categoria.id}`
              
            // Executa o script SQL no BD
            let result = await knexConex.raw(sql)

            if(result)
                return true
            else
                return false
        } catch (error) {
            console.log(error)
            return false
        }
}

const selectAllCategoria = async function(){
    try {
        let sql = 'select * from tbl_categoria order by id desc'

        let result = await knexConex.raw(sql)

        //Validação para verificar se o retorno do banco é um array
        //se o scriptSQL der erro, o banco não devolve um array
        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error){
        console.log(error)
        return false
    }
}

const selectByIdCategoria  = async function(id){
    try {
        let sql = `select * from tbl_categoria where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteByIdCategoria  = async function(id){
    try{
        let sql = `delete from tbl_categoria
                     where id=${id}`

    let result = await knexConex.raw(sql)

    if(result){
        return true
    }else{
        return false
    }
    }catch(error){
        console.log(error)
        return false
    }
}

module.exports = {
    insertCategoria,
    updateCategoria,
    selectAllCategoria,
    selectByIdCategoria,
    deleteByIdCategoria
}