const URL_API =
'http://localhost:8080/v1/senai/hamburgueria/categoria'


// =========================
// MENU
// =========================

document.addEventListener('DOMContentLoaded', () => {

    const btnHome =
        document.getElementById('btn-home')

    const btnCardapio =
        document.getElementById('btn-cardapio')

    const btnVoltar =
        document.getElementById('btn-voltar')


    if(btnHome){

        btnHome.addEventListener('click', (event) => {

            event.preventDefault()

            // ALTERAR PARA SUA PÁGINA HOME
            window.location.href =
            '../home/home.html'

        })
    }


    if(btnCardapio){

        btnCardapio.addEventListener('click', (event) => {

            event.preventDefault()

            window.location.href =
            'categoria.html'

        })
    }


    if(btnVoltar){

        btnVoltar.addEventListener('click', (event) => {

            event.preventDefault()

            history.back()

        })
    }

    carregarCategorias()

})


// =========================
// BUSCAR CATEGORIAS
// =========================

async function carregarCategorias(){

    try{

        const response =
            await fetch(URL_API)

        const dados =
            await response.json()

        console.log(dados)

        const container =
            document.getElementById('categorias')

        container.innerHTML = ''

        const imagens = [

            '../imagens/burguer.png',
            '../imagens/Ellipse 4.png',
            '../imagens/Ellipse 3.png',
            '../imagens/Ellipse 5.png',
            '../imagens/Ellipse 6.png',
            '../imagens/Ellipse 7.png',
            '../imagens/Ellipse 8.png',
            '../imagens/Ellipse 9.png'

        ]

        dados.response.categoria.forEach((categoria, index) => {

            const card =
            document.createElement('div')

            card.classList.add('card')

            card.innerHTML = `

                <div class="icone">
                    <img
                        src="${imagens[index] || '../imagens/burguer.png'}"
                        alt="${categoria.nome}">
                </div>

                <h3>
                    ${categoria.nome}
                </h3>

                <p>
                    ${categoria.descricao || ''}
                </p>

                <a href="#"
                   class="btn-ver-mais"
                   data-id="${categoria.id}">
                    ver mais
                </a>

            `

            container.appendChild(card)

        })

        configurarBotoesVerMais()

    }catch(error){

        console.error(
            'Erro ao carregar categorias:',
            error
        )

    }
}


// =========================
// BOTÕES VER MAIS
// =========================

function configurarBotoesVerMais(){

    const botoes =
        document.querySelectorAll('.btn-ver-mais')

    botoes.forEach(botao => {

        botao.addEventListener('click', (event) => {

            event.preventDefault()

            const idCategoria =
                botao.dataset.id

            console.log(
                'Categoria selecionada:',
                idCategoria
            )

            localStorage.setItem(
                'idCategoria',
                idCategoria
            )

            // ALTERAR PARA A TELA DE PRODUTOS
            window.location.href =
            '../produto/produto.html'

        })

    })

}