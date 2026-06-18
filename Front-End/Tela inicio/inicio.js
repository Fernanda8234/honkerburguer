'use strict'

import { getProdutos } from "../app.js"

const criarCardProduto = (produto) => {
    const cartao = document.createElement('div');
    cartao.classList.add('cartao-produto');
    cartao.dataset.id = produto.id; 

    // Imagem do Produto
    const foto = document.createElement('img');
    foto.classList.add('foto-produto');
    foto.src = produto.imagem_produto ? produto.imagem_produto : '../imagens/burguer.png';
    foto.alt = `Foto de ${produto.nome_produto}`;

    // Nome do Produto
    const nome = document.createElement('h3');
    nome.classList.add('nome-produto');
    nome.textContent = produto.nome_produto.toUpperCase(); // Força ficar em maiúsculo

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
        const listaProdutos = respostaApi.response?.vw_produto; 
        
        if (Array.isArray(listaProdutos)) {
            
            listaProdutos.forEach(criarCardProduto);
            
        } else {
            console.error("A estrutura de produtos na resposta da API não foi encontrada.");
        }
    } catch (error) {
        console.error("Erro ao listar os produtos:", error)
    }
}
// Inicializa a listagem
carregarProdutos();

// Evento do Logo para recarregar
document.querySelector('.logo').addEventListener('click', () => {
    window.location.reload();
})