const URL = 'http://localhost:8080/v1/senai/hamburgueria/vw/produtos'

export async function getProdutos() {
    const response = await fetch (URL)
    if (!response.ok) throw new Error('Erro ao buscar contatos')    
    return response.json()
    
}
