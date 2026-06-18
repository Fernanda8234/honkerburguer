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

    buscarDadosProduto()

    //Quando o usuário alterar a URL no input, atualiza o preview na hora
    document.getElementById("url_imagem").addEventListener("input", (e) => {
        const url = e.target.value.trim()

        document.getElementById("preview").src = url ? `./img/${url}` : "./img/addproduto.png"
    })

    //Avisa o JavaScript para rodar a função de salvar ao clicar no botão
    document.getElementById("form-produto").addEventListener("submit", executarSalvar)
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

async function buscarDadosProduto() {
    try {
        await carregarCategorias([])
        await carregarCombos([])
    } catch (error) {
        console.error("Erro ao carregar dados:", error)
    }
}

//Função que vai salvar os dados no banco
async function executarSalvar(event) {
    event.preventDefault()

    // Convertendo a lista de selecionados para a estrutura de objetos { id: ... } exigida pela controller
    const categoriasSelecionadas = Array.from(document.querySelectorAll('input[name="categoria"]:checked'))
                                         .map(cb => ({ id: parseInt(cb.value) }))

    const combosSelecionados = Array.from(document.querySelectorAll('input[name="combo"]:checked'))
                                    .map(cb => ({ id: parseInt(cb.value) }))

    const inputInicio = document.getElementById("data_inicio").value;
    const inputFim = document.getElementById("data_fim").value;

    // Montando o objeto estruturado perfeitamente para passar pela função validarDados() da controller
    const produtoInserido = {
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
        const response = await fetch(`${API_URL}/produto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(produtoInserido)
        })

        const data = await response.json();

        if (!response.ok) {
            console.error("Detalhes do erro retornados pela API:", data);
            alert(`Erro da API ao inserir: ${data.field || data.message || "Erro desconhecido"}`);
            return;
        }

        alert("Produto inserido com total sucesso!")
        window.location.href = "../index.html"

    } catch (error) {
        console.error("Erro na requisição POST:", error)
    }
}