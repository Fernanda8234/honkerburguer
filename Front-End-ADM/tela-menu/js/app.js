//Chamando a API localmente
const API_URL = 'http://localhost:8080/v1/senai/hamburgueria/vw/produtos'

//Função que busca os produtos e monta o cardápio
async function carregarCardapio() {

    //Pegando a div principal onde os produtos serão adicionados
    const container = document.getElementById("menu-container")
    //Mensagem exibida enquanto os dados carregam
    container.innerHTML = "<p style='padding-left: 40px; font-size: 22px;'>Carregando menu...</p>"

    try {
        //Fazendo a requisição para buscar os produtos
        const response = await fetch(API_URL)
        //Mensagem de erro caso a API apresente falha
        if (!response.ok) throw new Error(`Falha de rede: ${response.status}`)
        //Transformando a resposta recebida em JSON
        const objetoCompleto = await response.json()

        // Extrai a lista de produtos de dentro do padrão do seu JSON
        const dadosProdutos = objetoCompleto.response?.vw_produto || []

        console.log("Produtos extraídos com sucesso:", dadosProdutos)

        // Agrupando os produtos pelas categorias do seu banco
        const menuAgrupado = dadosProdutos.reduce((acumulador, item) => {
            //Pegando o nome da categoria
            const nomeCategoria = item.nome_categoria || "Geral"

            //Verificando se a categoria já existe
            let categoriaExistente = acumulador.find(c => c.nome === nomeCategoria)
            //Caso não exista cria uma nova categoria
            if (!categoriaExistente) {
                categoriaExistente = { nome: nomeCategoria, produtos: [] }
                acumulador.push(categoriaExistente)
            }
            
            // Mapeia exatamente as chaves do seu JSON real
            categoriaExistente.produtos.push({
                id: item.id, 
                nome: item.nome_produto || "Sem nome",
                preco: item.preco || 0,
                url_imagem: item.imagem_produto || "" 
            })
            
            return acumulador
        }, [])

        //Limpando a mensagem de carregamento
        container.innerHTML = ""
        //Caso não exista nenhum produto
        if (menuAgrupado.length === 0) {
            container.innerHTML = "<p style='padding-left: 40px; font-size: 22px;'>Nenhum produto retornado pela View.</p>"
            return
        }
        
        //Percorrendo todas as categorias encontradas
        menuAgrupado.forEach(secao => {

            //Criando a seção da categoria
            const section = document.createElement("section")
            section.classList.add("category-section")

            //Criando o título da categoria
            const titulo = document.createElement("p")
            titulo.classList.add("category-title")
            titulo.textContent = secao.nome
            section.appendChild(titulo)
    
            //Criando a linha dos cards
            const rowContainer = document.createElement("div")
            rowContainer.classList.add("row-container")

            //Criando a grid dos cards
            const cardsGrid = document.createElement("div")
            cardsGrid.classList.add("cards-grid")

            //Percorrendo cada produto da categoria
            secao.produtos.forEach(produto => {
            const card = document.createElement("div")
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

            //Montando a estrutura visual do card
            card.innerHTML = `
                <div class="card-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px; height: 100%;">
                    <p style="font-size: 20px; color: #1E2E4F; margin-bottom: 15px; text-transform: uppercase; text-align: center;">${produto.nome}</p>
                    
                    <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center; max-height: 120px; width: 100%;">    <img src="${caminhoFinalImagem}" alt="${produto.nome}" onerror="this.src='./img/placeholder.png';" style="max-width: 100%; max-height: 100%; object-fit: contain;"> </div>
                </div>
                <div class="footer-card" onclick="redirecionarDetalhes(${produto.id})"> <p>Ver detalhes</p> </div>`
            //Adicionando o card na grid
            cardsGrid.appendChild(card)
        })
            //Adicionando a grid na linha
            rowContainer.appendChild(cardsGrid)

            //Criando o botão de ver mais
            const btnVerMais = document.createElement("button")
            btnVerMais.classList.add("btn-ver-mais")
            btnVerMais.onclick = () => verMaisDaCategoria(secao.nome)
            btnVerMais.innerHTML = `
                <img src="./img/seta-direita.png" alt="Ver Mais">
                <span>Ver Mais</span>
            `
            //Adicionando botão na linha
            rowContainer.appendChild(btnVerMais)
            //Adicionando tudo na seção
            section.appendChild(rowContainer)
            //Adicionando a seção na tela
            container.appendChild(section)
        })

    } catch (error) {
        console.error("Erro interno no processamento do JS:", error)
        container.innerHTML = `
            <p style='padding-left: 40px; color: #cc0000; font-size: 20px;'>
                Erro ao processar dados do menu. Abra o Console do Desenvolvedor (F12) para diagnosticar.
            </p>
        `
    }
}

//Função que redireciona para tela de detalhes
function redirecionarDetalhes(id) {
    window.location.href = `../tela-editar-apagar-produto/index.html?id=${id}`
}

//Função que redireciona para tela da categoria
function verMaisDaCategoria(nomeCategoria) {
   const rotas = {
        "HERÓIS"        : "../tela-heroi/index.html",
        "VILÕES"        : "../tela-viloes/index.html",
        "LANÇAMENTOS"    : "../tela-lancamento/index.html",
        "VEGANO"        : "../tela-vegano/index.html",
        "BEBIDAS"       : "../tela-bebidas/index.html",
        "COMBOS"        : "../tela-combos/index.html"
    }
    const destino = rotas[nomeCategoria.toUpperCase()]
    
    if (destino) {
        window.location.href = destino
    } else {
        console.log("Rota não encontrada para:", nomeCategoria)
    }
}

//Aguardando carregar todo HTML para executar a função
document.addEventListener("DOMContentLoaded", carregarCardapio)