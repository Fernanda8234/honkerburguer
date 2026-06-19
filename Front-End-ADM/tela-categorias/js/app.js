//A criação do app será dividido em 3 etapas.
//Etapa 1 - Pega a categoria da URL e busca os produtos
//Etapa 2 - Filtra os produtos de acordo com a categoria desejada
//Etapa 3 - Renderiza os cards e o botão de adicionar

//1. Pega a categoria que vem na URL
const params = new URLSearchParams(window.location.search);
const categoriaDesejada = params.get('categoria');

//Fazendo o tratamento para aguardar o carregamento do HTML
document.addEventListener("DOMContentLoaded", carregarProdutosPorCategoria);

//Função principal que busca os produtos da API e inicia o filtro
async function carregarProdutosPorCategoria() {
    const container = document.getElementById("menu-container");
    container.innerHTML = "<p style='font-size: 24px; margin-left: 40px;'>Carregando produtos...</p>";

    try {
        const response = await fetch('http://localhost:8080/v1/senai/hamburgueria/vw/produtos');
        
        if (!response.ok) throw new Error(`Falha de rede: ${response.status}`);
        
        const objetoCompleto = await response.json();
        const listaProdutos = objetoCompleto.response?.vw_produto || [];

        //Lógica de filtro: Se for GERAL, pega apenas os vazios. Se não, filtra pela categoria.
        const produtosFiltrados = listaProdutos.filter(produto => {
            const catProduto = (produto.nome_categoria || "").toUpperCase().trim();
            const catDesejada = (categoriaDesejada || "").toUpperCase().trim();

            if (catDesejada === "GERAL") {
                return catProduto === "";
            }
            
            return catProduto.includes(catDesejada);
        });

        //Renderiza os cards na tela
        renderizarCards(produtosFiltrados);

    } catch (error) {
        console.error("Erro ao processar a tela:", error);
        container.innerHTML = "<p style='color: red; font-size: 24px; margin-left: 40px;'>Erro ao carregar dados.</p>";
    }
}

//Função que desenha os cards e o botão de adicionar na tela
function renderizarCards(produtos) {
    const container = document.getElementById("menu-container");
    container.innerHTML = ""; 

    //Criando a seção principal
    const section = document.createElement("section");
    section.classList.add("category-section");

    //Criando o título da categoria
    const titulo = document.createElement("p");
    titulo.classList.add("category-title");
    titulo.textContent = categoriaDesejada || "Produtos";
    section.appendChild(titulo);

    //Criando a grid dos cards
    const cardsGrid = document.createElement("div");
    cardsGrid.classList.add("cards-grid-adm");

    //Percorrendo os produtos filtrados e criando os cards
    produtos.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("card");

        const idProduto = produto.id_produto || produto.produto_id || produto.id || 1;
        const nomeFinal = produto.nome_produto || "Sem nome";
        const urlBanco = produto.imagem_produto ? produto.imagem_produto.trim() : "";
        
        let caminhoFinalImagem = urlBanco.startsWith("http") ? urlBanco : (urlBanco ? `./img/${urlBanco.split('/').pop()}` : `./img/placeholder.png`);

        //Estrutura do card
        card.innerHTML = `
            <div class="card-body">
                <p class="product-title">${nomeFinal}</p>
                <div class="image-wrapper">
                    <img src="${caminhoFinalImagem}" alt="${nomeFinal}" onerror="this.src='./img/placeholder.png';"> 
                </div>
            </div>
            <div class="footer-card" onclick="redirecionarDetalhes(${idProduto})"> <p>Ver detalhes</p> </div>`;

        cardsGrid.appendChild(card);
    });

    //Criando o botão para adicionar produto
    const cardAdicionar = document.createElement("div");
    cardAdicionar.classList.add("card-add-btn");
    cardAdicionar.onclick = redirecionarCadastro;

    cardAdicionar.innerHTML = `
        <div class="add-icon-wrapper">
            <span class="plus-icon">+</span>
        </div>
        <p class="add-text">
            ADICIONAR <br> PRODUTO
        </p>
    `;

    //Adicionando o botão na grid
    cardsGrid.appendChild(cardAdicionar);

    //Adicionando tudo na página
    section.appendChild(cardsGrid);
    container.appendChild(section);
}

//Funções de navegação
function redirecionarDetalhes(id) {
    window.location.href = `../tela-editar-apagar-produto/index.html?id=${id}`;
}

function redirecionarCadastro() {
    window.location.href = "../tela-adicionar-produto/index.html";
}