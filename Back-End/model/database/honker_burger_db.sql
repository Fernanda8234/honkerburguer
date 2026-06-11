create database if not exists honker_burguer_db;
use honker_burguer_db;

## você cria uma tabela sem engine=innodb → mysql usa innodb automaticamente
## você cria uma tabela com engine=innodb → mysql usa innodb explicitamente

create table tbl_administrador(
	id         		int not null primary key auto_increment,
    nome 			varchar(255) not null,
    email			varchar(255) not null,
    senha			varchar(255) not null,
    criacao_conta	date not null,
    data_nascimento date not null,
    telefone		varchar(20) not null,
    codigo_acesso 	int(6) not null
);

create table tbl_produto(
	id         				int not null primary key auto_increment,
	nome                    varchar(255) not null,
	preco                   decimal(10, 2) not null,
	url_imagem              varchar(255) not null,
	descricao               text not null,
	disponibilidade         tinyint(1) not null default 1,
    desconto				decimal(5, 2) default null,
    data_inicio_campanha	datetime default null,
    data_fim_campanha		datetime default null,
	classificacao_alimentar varchar(50) not null
);

create table tbl_tipo_sabor(
	id		int not null primary key auto_increment,
    blend	int default null,
    nome	varchar(255) not null
);

create table tbl_categoria(
	id			int not null primary key auto_increment,
    nome		varchar(255) not null,
    descricao	text default null
);

create table tbl_ingredientes(
	id					int not null primary key auto_increment,
	nome        		varchar(255) not null,
	descricao   		text not null,
	status_ingredientes	tinyint(1) not null default 1,
	url_imagem  		varchar(255) not null,
    id_produto			int not null,
    
	constraint FK_PRODUTO_INGREDIENTES
    foreign key (id_produto)
    references tbl_produto(id)
);

create table tbl_combo(
	id					int not null primary key auto_increment,
	nome        		varchar(255) not null
);

create table tbl_produto_combo(
	id			int not null primary key auto_increment,
    id_produto	int not null,
    id_combo    int not null,

    constraint FK_PRODUTO_PRODUTOCOMBO
    foreign key (id_produto)
    references tbl_produto(id),

    constraint FK_COMBO_PRODUTOCOMBO
    foreign key (id_combo)
    references tbl_combo(id)
);

create table tbl_produto_categoria(
    id              int not null primary key auto_increment,
    id_produto      int not null,
    id_categoria    int not null,

    constraint FK_PRODUTO_PRODUTOCATEGORIA
	foreign key (id_produto)
    references tbl_produto(id),

    constraint FK_CATEGORIA_PRODUTOCATEGORIA
    foreign key (id_categoria)
    references tbl_categoria(id)
);

create table tbl_tipo_sabor_produto(
    id                  int not null primary key auto_increment,
    id_tipo_sabor       int not null,
    id_produto          int not null,

    constraint FK_TIPOSABOR_TIPOSABORPRODUTO
	foreign key (id_tipo_sabor)
    references tbl_tipo_sabor(id),

    constraint FK_PRODUTO_TIPOSABORPRODUTO
    foreign key (id_produto)
    references tbl_produto(id)
);