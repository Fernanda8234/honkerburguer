#Permite criar uma view no Banco de Dados
create view vwProduto as
    select
        tbl_produto.id,
        tbl_produto.nome                                    as nome_produto,
        tbl_produto.preco,
        tbl_produto.url_imagem                              as imagem_produto,
        tbl_produto.disponibilidade,
        tbl_produto.descricao,
        tbl_produto.desconto,
        tbl_produto.data_inicio_campanha,
        tbl_produto.data_fim_campanha,
        tbl_produto.classificacao_alimentar,
        group_concat(distinct tbl_combo.nome
            order by tbl_combo.nome separator ', ')         as nome_combo,
        group_concat(distinct tbl_combo.id
            order by tbl_combo.id separator ',')            as ids_combo,
        tbl_tipo_sabor.blend,
        tbl_tipo_sabor.nome                                 as nome_sabor,
        group_concat(distinct tbl_categoria.nome
            order by tbl_categoria.nome separator ', ')     as nome_categoria,
        group_concat(distinct tbl_categoria.id
            order by tbl_categoria.id separator ',')        as ids_categoria
    from tbl_produto
        left join tbl_produto_combo
            on tbl_produto.id           = tbl_produto_combo.id_produto
        left join tbl_combo
            on tbl_combo.id             = tbl_produto_combo.id_combo
        left join tbl_tipo_sabor_produto
            on tbl_produto.id           = tbl_tipo_sabor_produto.id_produto
        left join tbl_tipo_sabor
            on tbl_tipo_sabor.id        = tbl_tipo_sabor_produto.id_tipo_sabor
        left join tbl_produto_categoria
            on tbl_produto.id           = tbl_produto_categoria.id_produto
        left join tbl_categoria
            on tbl_categoria.id         = tbl_produto_categoria.id_categoria
    group by
        tbl_produto.id,
        tbl_produto.nome,
        tbl_produto.preco,
        tbl_produto.url_imagem,
        tbl_produto.disponibilidade,
        tbl_produto.descricao,
        tbl_produto.desconto,
        tbl_produto.data_inicio_campanha,
        tbl_produto.data_fim_campanha,
        tbl_produto.classificacao_alimentar,
        tbl_tipo_sabor.blend,
        tbl_tipo_sabor.nome
    order by tbl_produto.nome;
#Para visualizar as tabelas e views existente no Banco de Dados
show tables;
select * from tbl_produto_categoria where id_produto = 1;
select * from tbl_produto_combo where id_produto = 1;

drop view vwProduto;

select * from vwProduto;