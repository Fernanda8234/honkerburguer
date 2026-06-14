#Criando ma Trigger no MYSQL

#Trigger para a tabela produtos
DELIMITER $ 
	
create trigger tgrBeforeDeleteProdutosFilhos
	before delete on tbl_produto
		for each row 
			BEGIN
            
				delete from tbl_produto_categoria where id_produto = old.id;
				delete from tbl_produto_combo where id_produto = old.id;
				delete from tbl_tipo_sabor_produto where id_produto = old.id;
                
			END$
            
SHOW TRIGGERS LIKE 'batata';

#Trigger para a tabela de categoria

DELIMITER $

create trigger tgrBeforeDeleteCategoriaFilhos
	before delete on tbl_categoria
		for each row
			BEGIN
            
				delete from tbl_produto_categoria where id_categoria = old.id;
                
			END$
            
#Trigger para a tabela de combos

DELIMITER $

create trigger tgrBeforeDeleteComboFilhos
	before delete on tbl_combo
		for each row
			BEGIN

				delete from tbl_produto_combo where id_combo = old.id;
				
			END$
            
#Trigger para a tabela de tipos de sabor

DELIMITER $

create trigger tgrBeforeDeleteTipoSaborFilhos
	before delete on tbl_tipo_sabor
		for each row
			BEGIN

				delete from tbl_tipo_sabor_produto where id_tipo_sabor = old.id;
				
			END$
            
#Permite remover uma trigger
drop trigger tgrBeforeDeleteProdutosFilhos;
drop trigger tgrBeforeDeleteCategoriaFilhos;
drop trigger tgrBeforeDeleteComboFilhos;
drop trigger tgrBeforeDeleteTipoSaborFilhos;

#Testando exclusão de produtos, categoria, combos e tipos de sabor
select * from tbl_produto;
select * from tbl_categoria;
select * from tbl_combo;
select * from tbl_tipo_sabor;

delete from tbl_produto
	where id = 1;
delete from tbl_categoria
	where id = 5;
delete from tbl_combo
	where id = 5;
delete from tbl_tipo_sabor
	where id = 2;
    
#Permite visualizar todas as triggers existente no banco de dados
show triggers;