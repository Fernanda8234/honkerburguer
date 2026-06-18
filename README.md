![LOGO](./Back-End/links/Logo%20Hamburgueria%20Honker%20Burguer.png)

 # 🍔 Honker Burger

## 📌 Sobre o Projeto

O Honker Burger é uma aplicação web desenvolvida como projeto integrador do curso técnico, simulando uma hamburgueria temática inspirada no universo dos heróis das histórias em quadrinhos.

O projeto funciona como um catálogo digital de produtos, onde clientes podem visualizar os hambúrgueres disponíveis e administradores possuem uma área exclusiva para gerenciar os produtos cadastrados.

A aplicação não possui sistema de pagamento, tendo como foco a apresentação dos produtos e o gerenciamento do catálogo.

---

## 🎯 Objetivo do Projeto

Desenvolver uma API com operações CRUD (Create, Read, Update e Delete) para realizar o gerenciamento dos produtos da hamburgueria.

O projeto tem como objetivo aplicar conhecimentos de desenvolvimento web, banco de dados e criação de APIs.

---

## 🦸 Temática

A Honker Burger possui uma identidade visual inspirada em histórias em quadrinhos e heróis.

A proposta do projeto utiliza elementos como

 Nomes de hambúrgueres inspirados em heróis;
 Design inspirado em HQs;
 Cores e elementos visuais temáticos;
 Interface interativa.

---

## 💡 Funcionalidades

### 👤 Área do Cliente

 Visualização dos produtos cadastrados;
 Consulta de informações dos hambúrgueres;
 Navegação pelo catálogo temático.

### 🔒 Área Administrativa

 Cadastro de produtos;
 Visualização dos produtos cadastrados;
 Atualização de produtos;
 Exclusão de produtos.

---

## 👥 Equipe

| Nome | Função |
|------|--------|
| Aryely Hevylyn | Banco de dados |
| Gustavo | Projetos |
| Matheus | Back-end |
| Fernanda | Full-stack |
| Gabriel | Front-end |

---

## 🛠 Tecnologias Utilizadas

Front-end

 HTML
 CSS
 JavaScript

Back-end

 Node.js  Java Spring (confirmar)

Banco de Dados

 MySQL

Ferramentas

 Postman

---

## 📁 Estrutura do Projeto

```bash
HonkerBurger

├── backend
├── frontend
├── database
└── README.md
```

(Atualizar conforme a estrutura real do projeto)

---

## 🔗 Rotas da API

### Cliente

Listar produtos

```bash
GET produtos
```

---

### Administrador

Cadastrar produto

```bash
POST adminprodutos
```

Atualizar produto

```bash
PUT adminprodutosid
```

Excluir produto

```bash
DELETE adminprodutosid
```

(Adicionar outros endpoints)

---


## 📋 Banco de Dados

O banco de dados foi estruturado para armazenar as informações dos produtos, administradores, categorias, sabores, ingredientes e relacionamentos necessários para o funcionamento da aplicação.

### 🛒 Produto (`tbl_produto`)

Tabela principal responsável por armazenar as informações dos produtos disponíveis no sistema.

**Campos principais:**
- id
- nome
- descrição
- preço
- imagem
- disponibilidade
- desconto
- datas de campanha
- classificação alimentar
- tipo de produto


### 👤 Administrador (`tbl_administrador`)

Tabela responsável por armazenar os dados dos usuários administradores que possuem acesso ao painel administrativo.

**Campos principais:**
- id
- nome
- email
- senha
- data de nascimento
- telefone
- código de acesso


### 🏷️ Categoria (`tbl_categoria`)

Tabela responsável por identificar a categoria dos produtos, como hambúrgueres, bebidas, acompanhamentos e combos.

**Campos principais:**
- id
- nome
- descrição


### 🔗 Produto Categoria (`tbl_produto_categoria`)

Tabela intermediária responsável pelo relacionamento entre produtos e categorias, permitindo que um produto possua uma ou mais classificações.


### 🥤 Tipo de Produto (`tbl_tipo_produto`)

Tabela utilizada para definir o tipo do produto cadastrado, como bebida, lanche, combo, entre outros.

**Campos principais:**
- id
- tipo


### 🍔 Sabor (`tbl_sabor`)

Tabela responsável pelo armazenamento dos sabores relacionados aos produtos.

**Campos principais:**
- id
- descrição
- tipo de sabor
- produto relacionado


### 🔗 Tipo de Sabor (`tbl_tipo_sabor`)

Tabela utilizada para identificar o tipo do sabor, como carne, frango, entre outros.

**Campos principais:**
- id
- nome


### 🧾 Ingredientes (`tbl_ingredientes`)

Tabela responsável por armazenar os ingredientes que podem ser exibidos na descrição dos produtos.

**Campos principais:**
- id
- nome
- descrição
- status
- imagem


### 📦 Combo Produto (`tbl_combo_produto`)

Tabela intermediária responsável por relacionar os produtos que fazem parte de um combo, evitando repetição de dados.

**Campos principais:**
- id
- quantidade do produto
- produto relacionado


### ⚙️ Produto Administrador (`tbl_produto_admin`)

Tabela responsável por registrar o gerenciamento dos produtos realizado pelos administradores.

**Campos principais:**
- id
- produto
- administrador responsável
- data de atualização
- data de remoção

## 🔐 Autenticação ADM

A área administrativa possui acesso restrito através de

 Login;
 Senha;
 JWTToken (confirmar).

---

## 🚀 Como Executar o Projeto

1. Clonar o repositório

```bash
git clone link-do-repositorio
```

2. Instalar dependências

```bash
npm install
```

3. Configurar o banco de dados;

4. Executar a aplicação.

---

## 📸 Demonstração

<img width="800" height="512" alt="Gravando2026-06-17112208-ezgif com-optimize" src="https://github.com/user-attachments/assets/d4e6c021-83a9-4ace-82f5-081a40648598" />

Adicionar imagens ou GIFs mostrando

 Página inicial;
 Catálogo de produtos;
 Área administrativa;
 Cadastro de produtos.

---

## 📚 Documentação

### Problema identificado

Descrever o problema que o projeto busca solucionar.

### Justificativa

Explicar a importância da criação da aplicação.

### Metodologia

Exemplo

 Levantamento de requisitos;
 Desenvolvimento da API;
 Criação do banco de dados;
 Testes da aplicação.

### Requisitos Funcionais

Exemplo

 Cadastrar produtos;
 Atualizar produtos;
 Excluir produtos;
 Visualizar catálogo.

### Requisitos Não Funcionais

Exemplo

 Interface responsiva;
 Organização do código;
 Segurança dos dados.

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos como parte do Projeto Integrador do curso técnico.

