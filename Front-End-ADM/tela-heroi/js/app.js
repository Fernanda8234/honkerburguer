//A criação do app vai ser dividido em 4 etapas.
//Etapa 1 - Chamar a URL da API
//Etapa 2 - Buscar os produtos do banco de dados
//Etapa 3 - Filtrar apenas os hambúrgueres
//Etapa 4 - Criar os cards e montar a tela

//Chamando a API localmente
const API_URL = 'http://localhost:8080/v1/senai/hamburgueria/vw/produtos'

//Função responsável por buscar os produtos e montar a tela
async function carregarCardapioADM() {

    //Pegando a div principal onde os produtos serão inseridos
    const container = document.getElementById("menu-container")

    //Mensagem exibida enquanto os produtos carregam
    container.innerHTML = "<p style='font-size: 24px; margin-left: 40px;'>Carregando hambúrgueres...</p>"

    try {

        //Fazendo a requisição para buscar os produtos
        const response = await fetch(API_URL)

        //Mensagem de erro caso a API apresente falha
        if (!response.ok) throw new Error(`Falha de rede: ${response.status}`)
        
        //Transformando os dados recebidos em JSON
        const objetoCompleto = await response.json()

        //Entrando na estrutura do JSON e pegando a lista de produtos
        const dadosProdutos = objetoCompleto.response?.vw_produto || []

        //Filtrando apenas os produtos que são da categória herois
        const apenasHerois = dadosProdutos.filter(produto => {

            //Pegando o nome do produto e convertendo para minúsculo
            const categoriaDoProduto = (produto.nome_categoria || "").toUpperCase().trim()
            
            //Verificando palavras que identificam hambúrgueres
            return categoriaDoProduto === "HERÓIS"
        })

        //Limpando a mensagem de carregamento
        container.innerHTML = ""

        //Criando a seção principal
        const section = document.createElement("section")
        section.classList.add("category-section")

        //Criando o título da categoria
        const titulo = document.createElement("p")
        titulo.classList.add("category-title")
        titulo.textContent = "Heróis"

        section.appendChild(titulo)

        //Criando a grid onde os cards serão adicionados
        const cardsGrid = document.createElement("div")
        cardsGrid.classList.add("cards-grid-adm")

        //Percorrendo apenas os hambúrgueres encontrados
        apenasHerois.forEach(produto => {

            //Criando o card individual
            const card = document.createElement("div")
            card.classList.add("card")

            //Pegando a URL da imagem
            let caminhoFinalImagem = ""

            const urlBanco = produto.imagem_produto
                ? produto.imagem_produto.trim()
                : ""

            //Verificando se a imagem é uma URL completa
            if (
                urlBanco.startsWith("http://") ||
                urlBanco.startsWith("https://")
            ) {

                //Usa a URL diretamente
                caminhoFinalImagem = urlBanco

            } else {

                //Tratando caso venha apenas o nome do arquivo
                let nomeArquivo = urlBanco

                if (nomeArquivo.includes('/')) {
                    nomeArquivo = nomeArquivo.split('/').pop()
                }

                //Caso não exista imagem usa placeholder
                caminhoFinalImagem = nomeArquivo
                    ? `./img/${nomeArquivo}`
                    : `./img/placeholder.png`
            }

            //Pegando o ID do produto
            const idProduto =
                produto.id_produto ||
                produto.produto_id ||
                produto.id ||
                1

            //Pegando o nome do produto
            const nomeFinal =
                produto.nome_produto ||
                "Sem nome"

            //Montando a estrutura visual do card
            card.innerHTML = `
                <div class="card-body">
                    <p class="product-title">${nomeFinal}</p>

                    <div class="image-wrapper">
                        <img src="${caminhoFinalImagem}" alt="${nomeFinal}" onerror="this.src='./img/placeholder.png';"> </div>
                    </div>

                <div class="footer-card" onclick="redirecionarDetalhes(${idProduto})"> <p>Ver detalhes</p> </div>`

            //Adicionando o card na grid
            cardsGrid.appendChild(card)

        })

        //Criando o botão para adicionar produto
        const cardAdicionar = document.createElement("div")

        cardAdicionar.classList.add("card-add-btn")

        //Chamando a função de cadastro
        cardAdicionar.onclick = redirecionarCadastro

        //Montando a estrutura do botão
        cardAdicionar.innerHTML = `
            <div class="add-icon-wrapper">
                <span class="plus-icon">+</span>
            </div>

            <p class="add-text">
                ADICIONAR <br> PRODUTO
            </p>
        `

        //Adicionando o botão na grid
        cardsGrid.appendChild(cardAdicionar)

        //Adicionando os elementos na tela
        section.appendChild(cardsGrid)
        container.appendChild(section)

    } catch (error) {

        console.error(
            "Erro ao processar a tela de herois:",
            error
        )

        //Mensagem exibida em caso de erro
        container.innerHTML = `
            <p style='color: red; font-size: 24px; margin-left: 40px;'>
                Erro ao se conectar com o banco de dados.
            </p>
        `
    }
}

//Função responsável por abrir tela de detalhes
function redirecionarDetalhes(id) {
    window.location.href = `../tela-editar-apagar-produto/index.html?id=${id}`
}

//Função responsável por abrir tela de cadastro
function redirecionarCadastro() {
    window.location.href = "../tela-adicionar-produto/index.html"
}

//Executando a função após carregar o HTML
document.addEventListener(
    "DOMContentLoaded",
    carregarCardapioADM
)