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

 - HTML
 - CSS
 - JavaScript

Back-end

 - Node.js
 - Java Spring 

Banco de Dados

 - MySQL

Ferramentas

 - Postman

---

## 📁 Estrutura do Projeto

```bash
HONKERBURGUER
│
├── Back-End
│ ├── controller
│ ├── doc
│ ├── links
│ ├── model
│ ├── node_modules
│ ├── routes
│ ├── app.js
│ ├── package.json
│ └── package-lock.json
│
├── Front-End
│
├── Front-End-ADM
│
└── README.md
```

(Atualizar conforme a estrutura real do projeto)

---

## 🔗 Rotas da API

A API possui endpoints separados de acordo com a função de cada área da aplicação. A área do cliente possui acesso apenas à visualização dos produtos, enquanto a área administrativa possui acesso ao gerenciamento dos dados através das operações de CRUD.

### Cliente

Endpoint responsável pela exibição dos produtos no catálogo da aplicação:

GET /v1/senai/hamburgueria/produto

Endpoint de visualização dos produtos utilizando a view:

GET /v1/senai/hamburgueria/vw/produtos


### Administrador

Os administradores possuem acesso às rotas responsáveis pelo gerenciamento das informações do sistema.

Produtos:

GET, POST, PUT, DELETE  
/v1/senai/hamburgueria/produto


Categorias:

GET, POST, PUT, DELETE  
/v1/senai/hamburgueria/categoria


Combos:

GET, POST, PUT, DELETE  
/v1/senai/hamburgueria/combo


Administradores:

GET, POST, PUT, DELETE  
/v1/senai/hamburgueria/administrador


Tipos de sabor:

GET, POST, PUT, DELETE  
/v1/senai/hamburgueria/tipo_sabor

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

md
## 🚀 Como Executar o Projeto

Para executar o projeto localmente, siga os passos abaixo:

1. Clonar o repositório

```bash
git clone link-do-repositorio
````

2. Acessar a pasta do projeto

```bash
cd nome-do-projeto
```

3. Instalar as dependências

```bash
npm install
```

4. Configurar o banco de dados

* Criar o banco de dados no MySQL;
* Executar o script SQL disponível no projeto para criação das tabelas e inserção dos dados iniciais;
* Verificar e configurar as informações de conexão com o banco de dados.

5. Executar a aplicação

```bash
npm start
```

Após seguir esses passos, a aplicação estará disponível localmente para testes.

---

## 📸 Demonstração

<img width="800" height="512" alt="Gravando2026-06-17112208-ezgif com-optimize" src="https://github.com/user-attachments/assets/d4e6c021-83a9-4ace-82f5-081a40648598" />


---

## 📚 Documentação

## Problema que o projeto busca solucionar

Muitas hamburguerias possuem dificuldades em apresentar seus produtos de forma organizada e atrativa, além de não possuírem uma forma prática de gerenciar as informações do catálogo.

### Justificativa

Pensando nisso, o projeto busca desenvolver uma aplicação que facilite a visualização dos produtos pelos clientes através de uma landing page temática e permita que administradores gerenciem o catálogo de forma simples e organizada, mantendo as informações dos produtos atualizadas.

### Metodologia

O desenvolvimento do projeto foi realizado utilizando a metodologia ágil, permitindo uma organização das tarefas, divisão das responsabilidades entre a equipe e acompanhamento contínuo da evolução da aplicação.

**As principais etapas do desenvolvimento foram:**

- Levantamento e análise de requisitos;
- Criação do protótipo e definição da interface da aplicação;
- Modelagem e desenvolvimento do banco de dados;
- Desenvolvimento da API e integração com o sistema;
- Desenvolvimento do front-end da área do cliente e administrador;
- Realização de testes e ajustes da aplicação.

---

## 📌 Requisitos do Sistema

### Requisitos Funcionais

- O sistema deve disponibilizar um catálogo dinâmico de produtos na Landing Page, permitindo que clientes visualizem informações como nome, descrição, preço, imagem, categoria e ingredientes.

- O cliente deve conseguir pesquisar e filtrar produtos por nome ou categoria, facilitando a navegação pelo catálogo.

- Os produtos devem ser organizados por categorias temáticas, como hambúrgueres, combos e bebidas.

- O sistema deve possuir uma área administrativa onde o administrador poderá realizar o gerenciamento dos produtos.

- O administrador deve conseguir cadastrar, editar, atualizar e remover produtos do catálogo.

- O administrador deve conseguir gerenciar categorias e informações dos produtos, mantendo o catálogo atualizado.

- O sistema deve permitir autenticação de administradores para acesso ao painel administrativo.

- O sistema deve apresentar mensagens de validação, sucesso e erro durante as operações realizadas.


### Requisitos Não Funcionais

- O sistema deve possuir duas interfaces independentes: uma área pública para clientes e uma área restrita para administradores.

- A aplicação deve utilizar uma API centralizada compartilhando os dados entre o catálogo do cliente e o painel administrativo.

- O sistema deve utilizar autenticação segura para proteger as operações administrativas.

- As interfaces devem ser responsivas, garantindo uma boa experiência em diferentes dispositivos.

- O banco de dados deve possuir uma estrutura organizada, utilizando relacionamentos para manter a integridade das informações.

- A aplicação deve manter a identidade visual temática de HQs/anos 80, proporcionando uma experiência diferenciada para o público.

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos como parte do Projeto Integrador do curso técnico.

