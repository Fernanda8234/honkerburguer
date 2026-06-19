import {getProdutos} from '../app.js'

const containerProduto = document.querySelector('.grade-produtos');
const campoBusca = document.getElementById('buscar');

let todosOsProdutos = []; 

const criarCardProduto = (produto) => {
    const cartao = document.createElement('div');
    cartao.classList.add('cartao-produto');
    cartao.dataset.id = produto.id; 

    // Imagem do Produto
    const foto = document.createElement('img');
    foto.classList.add('foto-produto');
    
    // Tenta carregar a imagem do produto, se não existir/for falsa, tenta o caminho padrão
    foto.src = produto.imagem_produto ? produto.imagem_produto : '../imagens/burguer.png';
    foto.alt = `Foto de ${produto.nome_produto}`;
    
    // CASO DE ERRO: Se o navegador tentar carregar e quebrar (ex: link inválido)
    foto.onerror = function() {
        this.src = '../imagens/burguer.png'; // Substitua pelo caminho correto relativo ao HTML
    };
    // Nome do Produto
    const nome = document.createElement('h3');
    nome.classList.add('nome-produto');
    nome.textContent = produto.nome_produto ? produto.nome_produto.toUpperCase() : 'PRODUTO';

    // Linha Divisória (borda ou elemento)
    const linha = document.createElement('hr');
    linha.classList.add('divisoria-card');

    // Descrição do Produto
    const descricao = document.createElement('p');
    descricao.classList.add('descricao-produto');
    descricao.textContent = produto.descricao || 'Sem descrição disponível.';

    // Container do Rodapé (Preço + Botão)
    const rodapeCard = document.createElement('div');
    rodapeCard.classList.add('rodape-card');

    // Preço
    const preco = document.createElement('span');
    preco.classList.add('preco-produto');
    preco.textContent = `R$ ${parseFloat(produto.preco).toFixed(2).replace('.', ',')}`;

    // Botão Ver Mais
    const botaoVerMais = document.createElement('button');
    botaoVerMais.classList.add('botao-ver-mais');
    botaoVerMais.textContent = 'ver mais';

    // Montando a estrutura interna
    rodapeCard.appendChild(preco);
    rodapeCard.appendChild(botaoVerMais);

    cartao.appendChild(foto);
    cartao.appendChild(nome);
    cartao.appendChild(linha);
    cartao.appendChild(descricao);
    cartao.appendChild(rodapeCard); // Adiciona o rodapé por último

    containerProduto.appendChild(cartao);
}

const carregarProdutos = async () => {
    containerProduto.replaceChildren();

    try {
        const respostaApi = await getProdutos();
        // Guardamos a lista na nossa variável global
        todosOsProdutos = respostaApi.response?.vw_produto || []; 
        
        if (Array.isArray(todosOsProdutos)) {
            todosOsProdutos.forEach(criarCardProduto);
        } else {
            console.error("A estrutura de produtos na resposta da API não foi encontrada.");
        }
    } catch (error) {
        console.error("Erro ao listar os produtos:", error)
    }
}

// Função que faz a busca em tempo real conforme digita
const filtrarProdutos = (evento) => {
    const textoDigitado = evento.target.value.toLowerCase();
    
    // Limpa a tela antes de exibir os filtrados
    containerProduto.replaceChildren();
    
    // Filtra comparando o nome ou a descrição com o que o usuário escreveu
    const produtosFiltrados = todosOsProdutos.filter(produto => {
        const nome = produto.nome_produto?.toLowerCase() || '';
        const descricao = produto.descricao?.toLowerCase() || '';
        return nome.includes(textoDigitado) || descricao.includes(textoDigitado);
    });
    
    // Se encontrar produtos filtrados, desenha os cards. Se não, mostra aviso.
    if (produtosFiltrados.length > 0) {
        produtosFiltrados.forEach(criarCardProduto);
    } else {
        const semResultado = document.createElement('p');
        semResultado.textContent = "Nenhum lanche encontrado com esse nome... 😢";
        semResultado.style.fontFamily = "'Boogaloo', sans-serif";
        semResultado.style.fontSize = "22px";
        semResultado.style.gridColumn = "1 / -1"; 
        semResultado.style.textAlign = "center";
        semResultado.style.marginTop = "40px";
        containerProduto.appendChild(semResultado);
    }
}

// Vincula o evento ao seu input de busca
if (campoBusca) {
    campoBusca.addEventListener('input', filtrarProdutos);
}

// Inicializa a listagem
carregarProdutos();

// Clique que recarrega a página
document.querySelector('.logo').addEventListener('click', () => {
    window.location.reload();
});

document.querySelector('#inicio').addEventListener('click', () => {
    window.location.href= "../tela-inicio/inicio.html"
});

document.querySelector('#categoria').addEventListener('click', () => {
    window.location.href = "../categoria/categoria.html"
})