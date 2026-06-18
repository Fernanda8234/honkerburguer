#Permite criar uma view no Banco de Dados
create view vwProduto as
	select tbl_produto.id, tbl_produto.nome as nome_produto, tbl_produto.preco, tbl_produto.url_imagem as imagem_produto, tbl_produto.disponibilidade, 
			tbl_produto.desconto, tbl_produto.data_inicio_campanha, tbl_produto.data_fim_campanha, tbl_produto.classificacao_alimentar,
			tbl_combo.nome as nome_combo,
            tbl_tipo_sabor.blend , tbl_tipo_sabor.nome as nome_saobr,
            tbl_categoria.nome as nome_categoria, tbl_categoria.descricao as descricao_categoria
	from tbl_produto
		left join 	tbl_produto_combo
			on tbl_produto.id		= tbl_produto_combo.id_produto
		left join  tbl_combo
			on tbl_combo.id			= tbl_produto_combo.id_combo
            
		left join tbl_tipo_sabor_produto
			on tbl_produto.id 		= tbl_tipo_sabor_produto.id_produto
		left join tbl_tipo_sabor
			on tbl_tipo_sabor.id	= tbl_tipo_sabor_produto.id_tipo_sabor
            
		left join tbl_produto_categoria
			on tbl_produto.id		= tbl_produto_categoria.id_produto
		left join tbl_categoria
			on tbl_categoria.id		= tbl_produto_categoria.id_categoria
	order by tbl_produto.nome;
#Para visualizar as tabelas e views existente no Banco de Dados
show tables;

drop view vwProduto;

select * from vwProduto;