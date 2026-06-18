//A criação do app vai ser dividido em 3 etapas.
//Etapa 1 - Chamar a URL da API e definir o que cada botão vai fazer
//Etapa 2 - Fazer a função do GET 
//Etapa 3 - Fazer a função do PUT 

//Chamando a API localmente
const API_URL = 'http://localhost:8080/v1/senai/hamburgueria'

//Chamando o parametro 'id' que vai estar na URL de navegação
const ParametroURL = new URLSearchParams(window.location.search)
const idProduto = ParametroURL.get('id')

//Fazendo o tratamento para aguardar todo o HTML da página antes de rodas as funções
document.addEventListener("DOMContentLoaded", () => {
    //Caso não tenha o id válido vai barrar o acesso
    if(!idProduto || idProduto === "null" || idProduto === "undefined" || idProduto.trim() === "") {
        alert("Erro: Nenhum produto foi selecionado!")
        window.location.href = "../index.html"
        return
    }
    //Chamando a função que vai buscar qual o lanche que está dentro do banco de dados e vai preencher a tela
    buscarDadosProduto()

    //Quando o usuário alterar a URL no input, atualiza o preview na hora
    document.getElementById("url_imagem").addEventListener("input", (e) => {
        const url = e.target.value.trim()

        document.getElementById("preview").src = url ? `./img/${url}` : "./img/addproduto.png"
    })

    //Avisa o JavaScript para rodar as funções de atualizar e deletar ao clicar nos botões
    document.getElementById("form-produto").addEventListener("submit", executarAtualizacao)
    document.getElementById("deletar").addEventListener("click", executarExclusao)
    //Configurando o botão de voltar na parte superior direita do header
    document.getElementById("voltar").addEventListener("click", () => window.history.back())
})

//Função que busca as categorias da API e renderiza os checkboxes dinamicamente
async function carregarCategorias(idsCategoriasDoProduto) {
    try {
        const response = await fetch(`${API_URL}/categoria`)

        if(!response.ok) throw new Error("Erro ao buscar categorias")

        const objetoCompleto = await response.json()
        const categorias = objetoCompleto.response?.categoria || []

        const container = document.getElementById("section-categorias")

        //Renderiza um checkbox para cada categoria vinda do banco
        categorias.forEach(categoria => {
            const label = document.createElement("label")
            label.classList.add("checkbox-custom")

            const input = document.createElement("input")
            input.type  = "checkbox"
            input.name  = "categoria"
            input.value = categoria.id

            //Marca o checkbox se o produto já tiver essa categoria vinculada (comparação por ID)
            if(idsCategoriasDoProduto.includes(categoria.id)) {
                input.checked = true
            }

            const span = document.createElement("span")
            span.classList.add("checkmark")

            label.appendChild(input)
            label.appendChild(span)
            label.append(` ${categoria.nome}`)

            container.appendChild(label)
        })

    } catch (error) {
        console.error("Erro ao carregar categorias:", error)
    }
}

//Função que busca os combos da API e renderiza os checkboxes dinamicamente
async function carregarCombos(idsCombosDoProduto) {
    try {
        const response = await fetch(`${API_URL}/combo`)

        if(!response.ok) throw new Error("Erro ao buscar combos")

        const objetoCompleto = await response.json()
        const combos = objetoCompleto.response?.combo || []

        const container = document.getElementById("section-combos")

        //Renderiza um checkbox para cada combo vindo do banco
        combos.forEach(combo => {
            const label = document.createElement("label")
            label.classList.add("checkbox-custom")

            const input = document.createElement("input")
            input.type  = "checkbox"
            input.name  = "combo"
            input.value = combo.id

            //Marca o checkbox se o produto já tiver esse combo vinculado (comparação por ID)
            if(idsCombosDoProduto.includes(combo.id)) {
                input.checked = true
            }

            const span = document.createElement("span")
            span.classList.add("checkmark")

            label.appendChild(input)
            label.appendChild(span)
            label.append(` ${combo.nome}`)

            container.appendChild(label)
        })

    } catch (error) {
        console.error("Erro ao carregar combos:", error)
    }
}

//Função que busca as informações do produto e preenche os "inputs" do HTML
async function buscarDadosProduto() {
    try {
        //Fazendo a requisição do get para a rota da view
        const response = await fetch(`${API_URL}/vw/produtos`)

        //Mensagem de erro
        if(!response.ok) throw new Error("Erro ao consultar a API")

        //Transformando a mensagem que chega da API in JSON
        const objetoCompleto = await response.json()

        //Entrando na estrutura do JSON e pegando o array da view
        const dadosProdutos = objetoCompleto.response?.vw_produto || []
        console.log("Lista de produtos vinda da API:", dadosProdutos);

        //Procura o mesmo id do produto e que está na URL
        const produto = dadosProdutos.find(item => Number(item.id) === Number(idProduto))
        
        //Se for encontrado vai aparecer os dados na tela
        if(produto) {

            //Pegando o nome do produto vindo da View
            document.getElementById("nome").value = produto.nome_produto || ""

            // CORREÇÃO: usa produto.descricao (coluna própria de tbl_produto)
            // e não descriçao_categoria (que é a descrição da categoria vinculada)
            document.getElementById("descricao").value = produto.descricao || ""

            //Pegando o preço vindo da View
            document.getElementById("numero").value = produto.preco || ""

            //Atualizando a URL da imagem
            const urlImg = produto.imagem_produto || ""

            document.getElementById("url_imagem").value = urlImg
            
            if(urlImg) {
                document.getElementById("preview").src = `./img/${urlImg}`
            }

            // Tratando o desconto se ele vier nulo da view
            document.getElementById("desconto").value = (produto.desconto !== null && produto.desconto !== undefined) ? produto.desconto : ""
            
            //Pegando o blend
            document.getElementById("blend").value = produto.blend || ""
            
            //Pegando a classificação alimentar
            document.getElementById("classificacao_alimentar").value = produto.classificacao_alimentar || "Tradicional"

            // Tratando as datas nulas vindas da view
            if (produto.data_inicio_campanha) {
                document.getElementById("data_inicio").value = produto.data_inicio_campanha.substring(0, 16);
            } else {
                document.getElementById("data_inicio").value = "";
            }

            if (produto.data_fim_campanha) {
                document.getElementById("data_fim").value = produto.data_fim_campanha.substring(0, 16);
            } else {
                document.getElementById("data_fim").value = "";
            }

            //Extraindo os IDs das categorias e combos já vinculados ao produto via ids_categoria e ids_combo da view
            const idsCategoriasDoProduto = produto.ids_categoria
                ? produto.ids_categoria.split(',').map(id => parseInt(id))
                : []

            const idsCombosDoProduto = produto.ids_combo
                ? produto.ids_combo.split(',').map(id => parseInt(id))
                : []

            //Chamando as funções que vão buscar no banco e renderizar os checkboxes já marcados
            await carregarCategorias(idsCategoriasDoProduto)
            await carregarCombos(idsCombosDoProduto)

        } else {
            alert("Produto não encontrado no banco de dados")
        }   
    } catch (error) {
       console.error("Erro ao carregar lanche:", error);
    }
}

//Função que vai atualizar os dados salvos no banco
async function executarAtualizacao(event) {
    event.preventDefault()

    // Convertendo a lista de selecionados para a estrutura de objetos { id: ... } exigida pela controller
    const categoriasSelecionadas = Array.from(document.querySelectorAll('input[name="categoria"]:checked'))
                                         .map(cb => ({ id: parseInt(cb.value) }))

    const combosSelecionados = Array.from(document.querySelectorAll('input[name="combo"]:checked'))
                                    .map(cb => ({ id: parseInt(cb.value) }))

    const inputInicio = document.getElementById("data_inicio").value;
    const inputFim = document.getElementById("data_fim").value;

    // Montando o objeto estruturado perfeitamente para passar pela função validarDados() da controller
    const produtoEditado = {
        nome:                    document.getElementById("nome").value.trim(),
        preco:                   parseFloat(document.getElementById("numero").value),
        url_imagem:              document.getElementById("url_imagem").value.trim(),
        descricao:               document.getElementById("descricao").value.trim(),
        disponibilidade:         document.getElementById("disponibilidade").checked ? 1 : 0,
        classificacao_alimentar: document.getElementById("classificacao_alimentar").value,
        desconto:                document.getElementById("desconto").value ? parseFloat(document.getElementById("desconto").value) : null,
        data_inicio_campanha:    inputInicio ? inputInicio.replace("T", " ") + ":00" : null,
        data_fim_campanha:       inputFim    ? inputFim.replace("T", " ")    + ":00" : null,
        categoria:               categoriasSelecionadas, 
        combo:                   combosSelecionados
    }

    try {
        const response = await fetch(`${API_URL}/produto/${idProduto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(produtoEditado)
        })

        const data = await response.json();

        if (!response.ok) {
            console.error("Detalhes do erro retornados pela API:", data);
            alert(`Erro da API ao atualizar: ${data.field || data.message || "Erro desconhecido"}`);
            return;
        }

        alert("Produto atualizado com total sucesso!")
        window.location.href = "../index.html"

    } catch (error) {
        console.error("Erro na requisição PUT:", error)
    }
}

//Função para excluir o id do produto permanentemente
async function executarExclusao(event) {
    event.preventDefault()

    const confirmou = confirm("Tem certeza absoluta que deseja deletar este produto do cardápio?")
    if (!confirmou) return

    try {
        const response = await fetch(`${API_URL}/produto/${idProduto}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            alert("Produto removido com sucesso!")
            window.location.href = "../tela-menu/index.html"
        } else {
            alert("Erro ao tentar deletar o produto.")
        }
    } catch (error) {
        console.error("Erro na requisição DELETE:", error)
    }
}