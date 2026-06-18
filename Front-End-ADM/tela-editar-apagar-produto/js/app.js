// Chamando a API localmente
const API_URL = 'http://localhost:8080/v1/senai/hamburgueria';

// Chamando o parametro 'id' que vai estar na URL de navegação
const ParametroURL = new URLSearchParams(window.location.search);
const idProduto = ParametroURL.get('id');

// Fazendo o tratamento para aguardar todo o HTML da página antes de rodar as funções
document.addEventListener("DOMContentLoaded", () => {
    if (!idProduto || idProduto === "null" || idProduto === "undefined" || idProduto.trim() === "") {
        alert("Erro: Nenhum produto foi selecionado!");
        window.location.href = "../index.html";
        return;
    }
    
    // Carrega os dados do banco na tela
    buscarDadosProduto();

    // Quando o usuário colar uma URL no input, atualiza o preview na hora
    document.getElementById("url_imagem").addEventListener("input", (e) => {
        const url = e.target.value.trim();
        document.getElementById("preview").src = url ? url : "../img/add produto.png";
    });

    // Escuta o envio do formulário para atualizar
    document.getElementById("form-produto").addEventListener("submit", executarAtualizacao);
    
    // Botão Deletar
    document.getElementById("deletar").addEventListener("click", executarExclusao);
    
    // Configurando o botão de voltar
    document.getElementById("voltar").addEventListener("click", () => window.history.back());
});

// ==========================================
// ETAPA 2: FAZER A FUNÇÃO DO GET
// ==========================================
async function buscarDadosProduto() {
    try {
        const response = await fetch(`${API_URL}/vw/produtos`);
        if (!response.ok) throw new Error("Erro ao consultar a API");

        const objetoCompleto = await response.json();
        const dadosProdutos = objetoCompleto.response?.vw_produto || [];

        // Filtro preciso convertendo para número
        const produto = dadosProdutos.find(item => Number(item.id) === Number(idProduto));

        if (produto) {
            // Preenchendo os dados básicos
            document.getElementById("nome").value = produto.nome_produto || "";
            document.getElementById("descricao").value = produto.descricao_produto || produto.descricao || "";
            document.getElementById("numero").value = produto.preco || "";
            
            // Nova lógica de Imagem por URL
            if (produto.imagem_produto) {
                document.getElementById("url_imagem").value = produto.imagem_produto;
                document.getElementById("preview").src = produto.imagem_produto;
            }

            // Preenchendo dados opcionais / campanhas
            if (produto.desconto) document.getElementById("desconto").value = produto.desconto;
            if (produto.blend) document.getElementById("blend").value = produto.blend;
            if (produto.classificacao_alimentar) {
                document.getElementById("classificacao_alimentar").value = produto.classificacao_alimentar;
            }

            // Controlando o checkbox de disponibilidade (0 ou 1)
            document.getElementById("disponibilidade").checked = produto.disponibilidade == 1;

            // Preenchimento de categorias vindo da API
            if (produto.nome_categoria) {
                const checkboxes = document.querySelectorAll(`input[name="categoria"]`);
                checkboxes.forEach(cb => {
                    if (cb.parentElement.textContent.trim().toLowerCase() === produto.nome_categoria.toLowerCase()) {
                        cb.checked = true;
                    }
                });
            }

        } else {
            alert("Produto não encontrado no banco de dados");
        }   
    } catch (error) {
       console.error("Erro ao carregar lanche:", error);
    }
}

// ==========================================
// ETAPA 3: FAZER A FUNÇÃO DO PUT (ATUALIZAR)
// ==========================================
async function executarAtualizacao(event) {
    event.preventDefault(); 

    // Capturando quais categorias foram marcadas (retorna array de números, ex: [1, 3])
    const categoriasSelecionadas = Array.from(document.querySelectorAll('input[name="categoria"]:checked'))
                                         .map(cb => parseInt(cb.value));

    // Capturando quais combos foram marcados
    const combosSelecionados = Array.from(document.querySelectorAll('input[name="combo"]:checked'))
                                    .map(cb => parseInt(cb.value));

    // Montando o objeto alinhado com as tabelas do MySQL
    const produtoEditado = {
        nome: document.getElementById("nome").value,
        nome_produto: document.getElementById("nome").value, 
        preco: parseFloat(document.getElementById("numero").value),
        url_imagem: document.getElementById("url_imagem").value,
        imagem_produto: document.getElementById("url_imagem").value,
        descricao: document.getElementById("descricao").value,
        descricao_produto: document.getElementById("descricao").value,
        disponibilidade: document.getElementById("disponibilidade").checked ? 1 : 0,
        
        // Campos de campanha com tratamento para nulo
        desconto: document.getElementById("desconto").value ? parseFloat(document.getElementById("desconto").value) : null,
        data_inicio_campanha: document.getElementById("data_inicio").value || null,
        data_fim_campanha: document.getElementById("data_fim").value || null,
        
        // Características
        blend: document.getElementById("blend").value ? parseInt(document.getElementById("blend").value) : null,
        classificacao_alimentar: document.getElementById("classificacao_alimentar").value,

        // Arrays de IDs para atualizar as tabelas de relacionamento (NxM)
        categorias: categoriasSelecionadas,
        combos: combosSelecionados
    };

    try {
        const response = await fetch(`${API_URL}/produto/${idProduto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produtoEditado)
        });

        if (!response.ok) {
            const textoErro = await response.text();
            console.error("Detalhes do erro retornados pela API:", textoErro);
            alert(`Erro ao atualizar: ${textoErro}`);
            return;
        }

        alert("Produto atualizado com total sucesso!");
        window.location.href = "../index.html";

    } catch (error) {
        console.error("Erro na requisição PUT:", error);
    }
}

// ==========================================
// FUNÇÃO DO DELETE (EXCLUSÃO)
// ==========================================
async function executarExclusao(event) {
    event.preventDefault();

    const confirmou = confirm("Tem certeza absoluta que deseja deletar este produto do cardápio?");
    if (!confirmou) return;

    try {
        const response = await fetch(`${API_URL}/produto/${idProduto}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Produto removido com sucesso!");
            window.location.href = "../index.html"; 
        } else {
            alert("Erro ao tentar deletar o produto.");
        }
    } catch (error) {
        console.error("Erro na requisição DELETE:", error);
    }
}