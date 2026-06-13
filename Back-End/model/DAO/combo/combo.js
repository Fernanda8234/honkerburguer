/********************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de combo
* Data: 11/06/2026
* Autor: Fernanda Mota
* Versão: 1.0
********************************************************************************/

const knex = require('knex')

const knexConfig = require('../../database_config_knex/KnexFile.js')

const knexConex = knex(knexConfig.development)

const insertCombo = async function(combo){
    try {
        let sql = `insert into tbl_combo (nome) values ('${combo.nome}')`

        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        return false
    }
}

const updateCombo = async function(combo){
    try {

        let sql = `update tbl_combo set
                        nome = '${combo.nome}'
                    where id = ${combo.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllCombo = async function(){
    try {

        let sql = `select * from tbl_combo order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectByIdCombo = async function(id){
    try {

        let sql = `select * from tbl_combo where id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteCombo = async function(id){
    try {

        let sql = `delete from tbl_combo where id = ${id}`

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
    insertCombo,
    updateCombo,
    selectAllCombo,
    selectByIdCombo,
    deleteCombo
}