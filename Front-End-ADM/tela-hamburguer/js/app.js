const API_URL = 'http://localhost:8080/v1/senai/hamburgueria/vw/produtos';

async function carregarCardapioADM() {
    const container = document.getElementById("menu-container");
    container.innerHTML = "<p style='font-size: 24px; margin-left: 40px;'>Carregando hambúrgueres...</p>";

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Falha de rede: ${response.status}`);
        
        const objetoCompleto = await response.json();
        const dadosProdutos = objetoCompleto.response?.vw_produto || [];

        // 🎯 FILTRO EXCLUSIVO PARA HAMBÚRGUERES
        // Analisa o nome do produto e só deixa passar o que for hambúrguer (Thunder Burguer, Coringa Supremo, Green Vigilante, etc.)
        const apenasHamburguers = dadosProdutos.filter(produto => {
            const nome = produto.nome_produto ? produto.nome_produto.toLowerCase() : "";
            
            // Aceita se tiver "burguer", "supremo" ou "vigilante" no nome, e descarta o que for batata, soda ou soldando
            return nome.includes("burguer") || nome.includes("supremo") || nome.includes("vigilante");
        });

        // Limpa o parágrafo de carregamento
        container.innerHTML = "";

        // Cria o elemento da seção
        const section = document.createElement("section");
        section.classList.add("category-section");

        // Cria o título da categoria acima da Grid
        const titulo = document.createElement("p");
        titulo.classList.add("category-title");
        titulo.textContent = "HAMBURGUERS";
        section.appendChild(titulo);

        // Grid que conterá os cards e o botão "+" alinhados
        const cardsGrid = document.createElement("div");
        cardsGrid.classList.add("cards-grid-adm");

        // Renderiza APENAS os hambúrgueres filtrados
        apenasHamburguers.forEach(produto => {
            const card = document.createElement("div");
            card.classList.add("card");

            let caminhoFinalImagem = "";
            const urlBanco = produto.imagem_produto ? produto.imagem_produto.trim() : "";

            if (urlBanco.startsWith("http://") || urlBanco.startsWith("https://")) {
                caminhoFinalImagem = urlBanco;
            } else {
                let nomeArquivo = urlBanco;
                if (nomeArquivo.includes('/')) {
                    nomeArquivo = nomeArquivo.split('/').pop();
                }
                caminhoFinalImagem = nomeArquivo ? `./img/${nomeArquivo}` : `./img/placeholder.png`;
            }

            const idProduto = produto.id_produto || produto.produto_id || produto.id || 1;
            const nomeFinal = produto.nome_produto || "Sem nome";

            card.innerHTML = `
                <div class="card-body">
                    <p class="product-title">${nomeFinal}</p>
                    <div class="image-wrapper">
                        <img src="${caminhoFinalImagem}" alt="${nomeFinal}" onerror="this.src='./img/placeholder.png';">
                    </div>
                </div>
                <div class="footer-card" onclick="redirecionarDetalhes(${idProduto})">
                    <p>Ver detalhes</p>
                </div>
            `;
            cardsGrid.appendChild(card);
        });

        // ➕ BOTÃO ADICIONAR PRODUTO: Sempre na última posição da Grid
        const cardAdicionar = document.createElement("div");
        cardAdicionar.classList.add("card-add-btn");
        cardAdicionar.onclick = redirecionarCadastro;
        cardAdicionar.innerHTML = `
            <div class="add-icon-wrapper">
                <span class="plus-icon">+</span>
            </div>
            <p class="add-text">ADICIONAR<br>PRODUTO</p>
        `;
        cardsGrid.appendChild(cardAdicionar);

        // Junta tudo na página
        section.appendChild(cardsGrid);
        container.appendChild(section);

    } catch (error) {
        console.error("Erro ao processar a tela de hamburguer:", error);
        container.innerHTML = `<p style='color: red; font-size: 24px; margin-left: 40px;'>Erro ao se conectar com o banco de dados.</p>`;
    }
}

// Funções para controle de rotas
function redirecionarDetalhes(id) {
    window.location.href = `../tela-detalhes/index.html?id=${id}`;
}

function redirecionarCadastro() {
    window.location.href = "../criar_cadastro/index.html";
}

// Inicializa a renderização
document.addEventListener("DOMContentLoaded", carregarCardapioADM);