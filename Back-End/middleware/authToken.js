/****************************************************************
 * Objetivo: Middleware responsavel por proteger rotas com JWT
 * Data: 17/06/2026
 * Autor: Codex
 * Versao: 1.0
****************************************************************/

const jwt = require('../utils/jwt.js')

//Extrai o token JWT do header Authorization, removendo espacos e textos extras
const extrairToken = function(authorization){
    let partesAuthorization = String(authorization).trim().split(/\s+/)

    if(partesAuthorization.length < 2)
        return false

    if(String(partesAuthorization[0]).toUpperCase() !== 'BEARER')
        return false

    let token = partesAuthorization.slice(1).join('').replace(/^Bearer/i, '').trim()
    token = token.replace(/^"|"$/g, '').replace(/^'|'$/g, '')

    return token
}

//Valida o token enviado no header Authorization antes de liberar a rota
const autenticarToken = function(request, response, next){
    const authorization = request.headers.authorization

    if(!authorization)
        return response.status(401).json({status: false, status_code: 401, message: 'Token JWT nao informado.'})

    const token = extrairToken(authorization)

    if(!token)
        return response.status(401).json({status: false, status_code: 401, message: 'Token JWT invalido.'})

    const dadosToken = jwt.validarToken(token)

    if(!dadosToken)
        return response.status(401).json({status: false, status_code: 401, message: 'Token JWT invalido ou expirado.'})

    request.administrador = dadosToken
    next()
}

module.exports = {
    autenticarToken
}
