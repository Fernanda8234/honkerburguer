/********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de daods MySQL na tabela
 * Data 11/06/2026
 * Autor: Matheus Aguiar
 * Versão: 1.11.06
 ********************************************************************************/

//import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

//Import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knex/knex_file.js')

//Criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

const insertTipoSabor= async function(tipoSabor){
    try {
        let sql = `insert into tbl_tipo_sabor (
                            blend,
                            nome
                            )
                    values(
                            '${tipoSabor.blend}',
                            '${tipoSabor.nome}'
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

const updateTipoSabor = async function(tipoSabor){
        try {
            // Script para atualizar os dados do BD
            let sql = `update tbl_tipo_sabor set
                            blend           = '${tipoSabor.blend}',
                            nome            = '${tipoSabor.nome}'
                            where id        =  ${tipoSabor.id}`
              
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

const selectAllTipoSabor = async function(){
    try {
        let sql = 'select * from tbl_tipo_sabor order by id desc'

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

const selectByIdTipoSabor  = async function(id){
    try {
        let sql = `select * from tbl_tipo_sabor where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteByIdTipoSabor  = async function(id){
    try{
        let sql = `delete from tbl_tipo_sabor
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
    insertTipoSabor,
    updateTipoSabor,
    selectAllTipoSabor,
    selectByIdTipoSabor,
    deleteByIdTipoSabor
}