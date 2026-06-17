/********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de administrador
 * Data 12/06/2026
 * Autor: Aryely Hevylyn
 * Versão: 1.0
 ********************************************************************************/

//import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

//Import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knex/KnexFile.js')

//Criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

const insertAdm = async function(administrador){
    try {
        let sql = `insert into tbl_administrador (
                            nome,
                            email,
                            senha,
                            data_nascimento,
                            telefone,
                            codigo_acesso 
                            )
                    values(
                            '${administrador.nome}',
                            '${administrador.email}',
                            '${administrador.senha}',
                            '${administrador.data_nascimento}',
                            '${administrador.telefone}',
                            '${administrador.codigo_acesso}'
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

const updateAdm = async function(administrador){
        try {
            // Script para atualizar os dados do BD
            let sql = `update tbl_administrador set

                    nome            = '${administrador.nome}',
                    email           = '${administrador.email}',
                    senha           = '${administrador.senha}',
                    data_nascimento = '${administrador.data_nascimento}',
                    telefone        = '${administrador.telefone}',
                    codigo_acesso   = '${administrador.codigo_acesso}'
                    where id        =  ${administrador.id}`
                           
                              
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

const selectAllAdm = async function(){
    try {
        let sql = 'select * from tbl_administrador order by id desc'

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

const selectByIdAdm  = async function(id){
    try {
        let sql = `select * from tbl_administrador where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        console.log(error)
        return false
    }
}

//Busca um administrador pelo email e codigo de acesso para realizar o login
const selectByEmailCodigoAdm = async function(administrador){
    try {
        let sql = `select id, nome, email from tbl_administrador
                    where email='${administrador.email}'
                      and codigo_acesso='${administrador.codigo_acesso}'`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteByIdAdm  = async function(id){
    try{
        let sql = `delete from tbl_administrador
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
    insertAdm,
    updateAdm,
    selectAllAdm,
    selectByIdAdm,
    selectByEmailCodigoAdm,
    deleteByIdAdm
}
