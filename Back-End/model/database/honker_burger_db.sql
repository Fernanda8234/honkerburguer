create database if not exists honker_burguer_db;
use honker_burguer_db;

show tables;

create table tbl_administrador(
	id         		int not null primary key auto_increment,
    nome 			varchar(255) not null,
    email			varchar(255) not null,
    senha			varchar(255) not null,
    criacao_conta	date not null,
    data_nascimento date not null,
    telefone		varchar(20) not null,
    codigo_acesso 	char(6) not null,

    unique (email)
);

	#alteração feita para tornar a data da criação da conta, um atributo 
	#que é preenchido automativamente pelo banco de dados
	#alteração feita por: aryely
alter table tbl_administrador
modify column criacao_conta DATE NOT NULL DEFAULT (CURRENT_DATE);

select * from tbl_administrador;
DESCRIBE tbl_administrador; #verifica se o atributo cricao_conta realmente se tornou um current date

create table tbl_produto(
	id         				int not null primary key auto_increment,
	nome                    varchar(255) not null,
	preco                   decimal(10,2) not null,
	url_imagem              varchar(255) not null,
	descricao               text not null,
	disponibilidade         tinyint(1) not null default 1,
    desconto				decimal(5,2) default null,
    data_inicio_campanha	datetime default null,
    data_fim_campanha		datetime default null,
	classificacao_alimentar varchar(50) not null
);

create table tbl_categoria(
	id			int not null primary key auto_increment,
    nome		varchar(255) not null,
    descricao	text default null
);

create table tbl_combo(
	id					int not null primary key auto_increment,
	nome        		varchar(255) not null
);

create table tbl_tipo_sabor(
	id		int not null primary key auto_increment,
    blend	int default null,
    nome	varchar(255) not null
);

create table tbl_ingrediente(
    id                      int not null primary key auto_increment,
    nome                    varchar(255) not null,
    descricao               text not null,
    status_ingrediente      tinyint(1) not null default 1,
    url_imagem              varchar(255) not null,
    data_criacao            datetime not null default current_timestamp,
    data_atualizacao        datetime default current_timestamp
    on update current_timestamp
);

create table tbl_produto_categoria(
    id              int not null primary key auto_increment,
    id_produto      int not null,
    id_categoria    int not null,

    unique (id_produto, id_categoria),

    constraint FK_PRODUTO_PRODUTOCATEGORIA
	foreign key (id_produto)
	references tbl_produto(id)
	on delete cascade,

	constraint FK_CATEGORIA_PRODUTOCATEGORIA
	foreign key (id_categoria)
	references tbl_categoria(id)
	on delete cascade
);

create table tbl_produto_combo(
	id			int not null primary key auto_increment,
    id_produto	int not null,
    id_combo    int not null,

    unique (id_produto, id_combo),

    constraint FK_PRODUTO_PRODUTOCOMBO
	foreign key (id_produto)
	references tbl_produto(id)
	on delete cascade,

	constraint FK_COMBO_PRODUTOCOMBO
	foreign key (id_combo)
	references tbl_combo(id)
	on delete cascade
);

create table tbl_tipo_sabor_produto(
    id                  int not null primary key auto_increment,
    id_tipo_sabor       int not null,
    id_produto          int not null,

    unique (id_tipo_sabor, id_produto),

    constraint FK_TIPOSABOR_TIPOSABORPRODUTO
	foreign key (id_tipo_sabor)
	references tbl_tipo_sabor(id)
	on delete cascade,

	constraint FK_PRODUTO_TIPOSABORPRODUTO
	foreign key (id_produto)
	references tbl_produto(id)
	on delete cascade
);

create table tbl_produto_ingrediente(
    id                  int not null primary key auto_increment,
    id_produto          int not null,
    id_ingrediente      int not null,
    
    unique (id_produto, id_ingrediente),

    constraint FK_PRODUTO_PRODUTOINGREDIENTE
    foreign key (id_produto)
    references tbl_produto(id)
    on delete cascade,

    constraint FK_INGREDIENTE_PRODUTOINGREDIENTE
    foreign key (id_ingrediente)
    references tbl_ingrediente(id)
    on delete cascade
);