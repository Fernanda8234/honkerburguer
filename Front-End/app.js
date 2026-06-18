const URL = 'http://localhost:8080/v1/senai/hamburgueria/vw/produtos'

export async function getProdutos() {
    const response = await fetch(URL)

    if (!response.ok)
        throw new Error('Erro ao buscar produtos')

    return response.json()
}

const btnCatalogo = document.getElementById('btn-catalogo')

if (btnCatalogo) {
    btnCatalogo.addEventListener('click', () => {
        window.location.href = "./tela-inicio/inicio.html"
    })
}