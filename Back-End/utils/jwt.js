/****************************************************************
 * Objetivo: Arquivo responsavel por criar e validar tokens JWT
 * Data: 17/06/2026
 * Autor: Codex
 * Versao: 1.0
****************************************************************/

const crypto = require('crypto')

const JWT_SECRET = process.env.JWT_SECRET || 'honker-burguer-token-secreto'

//Converte objetos JSON para base64url, formato usado internamente pelo JWT
const converterBase64Url = function(dados){
    return Buffer.from(JSON.stringify(dados))
        .toString('base64url')
}

//Cria a assinatura do token para garantir que ele nao foi alterado
const criarAssinatura = function(header, payload){
    return crypto
        .createHmac('sha256', JWT_SECRET)
        .update(`${header}.${payload}`)
        .digest('base64url')
}

//Gera um token JWT com os dados do administrador autenticado
const gerarToken = function(dadosAdministrador){
    const header = converterBase64Url({
        alg: 'HS256',
        typ: 'JWT'
    })

    const payload = converterBase64Url({
        id: dadosAdministrador.id,
        email: dadosAdministrador.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    })

    const assinatura = criarAssinatura(header, payload)

    return `${header}.${payload}.${assinatura}`
}

//Valida se o token JWT recebido possui assinatura correta e ainda nao expirou
const validarToken = function(token){
    try{
        const partesToken = token.split('.')

        if(partesToken.length != 3)
            return false

        const [header, payload, assinatura] = partesToken
        const assinaturaValida = criarAssinatura(header, payload)

        const assinaturaRecebida = Buffer.from(assinatura)
        const assinaturaGerada = Buffer.from(assinaturaValida)

        if(assinaturaRecebida.length !== assinaturaGerada.length || !crypto.timingSafeEqual(assinaturaRecebida, assinaturaGerada))
            return false

        const dadosToken = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))

        if(dadosToken.exp < Math.floor(Date.now() / 1000))
            return false

        return dadosToken
    }catch(error){
        return false
    }
}

module.exports = {
    gerarToken,
    validarToken
}
