const API_URL = 'http://localhost:8080/v1/senai/hamburgueria/vw/produtos'

async function carregarCardapio() {
    const container = document.getElementById("menu-container");
    container.innerHTML = "<p style='padding-left: 40px; font-size: 22px;'>Carregando menu...</p>";

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Falha de rede: ${response.status}`);
        
        const objetoCompleto = await response.json();

        // Extrai a lista de produtos de dentro do padrão do seu JSON
        const dadosProdutos = objetoCompleto.response?.vw_produto || [];

        console.log("Produtos extraídos com sucesso:", dadosProdutos);

        // Agrupando os produtos pelas categorias do seu banco
        const menuAgrupado = dadosProdutos.reduce((acumulador, item) => {
            const nomeCategoria = item.nome_categoria || "Geral";
            
            let categoriaExistente = acumulador.find(c => c.nome === nomeCategoria);
            
            if (!categoriaExistente) {
                categoriaExistente = { nome: nomeCategoria, produtos: [] };
                acumulador.push(categoriaExistente);
            }
            
            // Mapeia exatamente as chaves do seu JSON real
            categoriaExistente.produtos.push({
               id: item.id_produto || item.produto_id || 1, // Ajuste para a sua chave primária se houver
                nome: item.nome_produto || "Sem nome",
                preco: item.preco || 0,
                url_imagem: item.imagem_produto || "" 
            });
            
            return acumulador;
        }, []);

        container.innerHTML = "";

        if (menuAgrupado.length === 0) {
            container.innerHTML = "<p style='padding-left: 40px; font-size: 22px;'>Nenhum produto retornado pela View.</p>";
            return;
        }

        //Fazendo o card 
        menuAgrupado.forEach(secao => {
            const section = document.createElement("section");
            section.classList.add("category-section");

            const titulo = document.createElement("p");
            titulo.classList.add("category-title");
            titulo.textContent = secao.nome;
            section.appendChild(titulo);

            const rowContainer = document.createElement("div");
            rowContainer.classList.add("row-container");

            const cardsGrid = document.createElement("div");
            cardsGrid.classList.add("cards-grid");

            secao.produtos.forEach(produto => {
            const card = document.createElement("div");
            card.classList.add("card");

            //Puxando tanto a IMG quanto a URL
            let caminhoFinalImagem = "";
            const urlBanco = produto.url_imagem ? produto.url_imagem.trim() : "";

            //URL
            if (urlBanco.startsWith("http://") || urlBanco.startsWith("https://")) {
                //Se for um link completo da internet, usa ele direto
                caminhoFinalImagem = urlBanco;
            } else {
                //Tratamento: Se for apenas o nome do arquivo (ex: "img1.png"), limpa e aponta para a pasta local
                let nomeArquivo = urlBanco;
                if (nomeArquivo.includes('/')) {
                    nomeArquivo = nomeArquivo.split('/').pop();
                }
                //Se o campo estiver vazio no banco, o onerror vai tratar usando o placeholder que é uma imagem cinza
                caminhoFinalImagem = nomeArquivo ? `./img/${nomeArquivo}` : `./img/placeholder.png`;
            }

            card.innerHTML = `
                <div class="card-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px; height: 100%;">
                    <p style="font-size: 20px; color: #1E2E4F; margin-bottom: 15px; text-transform: uppercase; text-align: center;">${produto.nome}</p>
                    
                    <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center; max-height: 120px; width: 100%;">
                        <img src="${caminhoFinalImagem}" alt="${produto.nome}" onerror="this.src='./img/placeholder.png';" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                    </div>
                </div>
                <div class="footer-card" onclick="redirecionarDetalhes(${produto.id})">
                    <p>Ver detalhes</p>
                </div>
            `;
            cardsGrid.appendChild(card);
        });

            rowContainer.appendChild(cardsGrid);

            const btnVerMais = document.createElement("button");
            btnVerMais.classList.add("btn-ver-mais");
            btnVerMais.onclick = () => verMaisDaCategoria(secao.nome);
            btnVerMais.innerHTML = `
                <img src="./img/seta-direita.png" alt="Ver Mais">
                <span>Ver Mais</span>
            `;

            rowContainer.appendChild(btnVerMais);
            section.appendChild(rowContainer);
            container.appendChild(section);
        });

    } catch (error) {
        console.error("Erro interno no processamento do JS:", error);
        container.innerHTML = `
            <p style='padding-left: 40px; color: #cc0000; font-size: 20px;'>
                Erro ao processar dados do menu. Abra o Console do Desenvolvedor (F12) para diagnosticar.
            </p>
        `;
    }
}

function redirecionarDetalhes(id) {
    alert(`Abrindo detalhes do produto ID: ${id}`);
}

function verMaisDaCategoria(categoria) {
    alert(`Indo para a categoria: ${categoria}`);
}

document.addEventListener("DOMContentLoaded", carregarCardapio);