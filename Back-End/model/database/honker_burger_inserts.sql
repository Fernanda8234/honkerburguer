use honker_burguer_db;

-- 1. Inserts para tbl_administrador (RF11, RF19)
-- As senhas simulam o padrão gerado pelo hash do bcrypt
insert into tbl_administrador (nome, email, senha, criacao_conta, data_nascimento, telefone) values
('Steve Rogers', 'capitao@honker.com', '$2b$10$K3b8X9pQz7mR2vW4xY6zOu1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6', '2026-06-10 10:00:00', '1980-07-04', '(11) 98888-8888'),
('Diana Prince', 'diana@honker.com', '$2b$10$L4c9Y0qRz8nS3wW5xY7zOu2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7', '2026-06-10 11:30:00', '1984-11-10', '(11) 97777-7777');

-- 2. Inserts para tbl_usuarios
insert into tbl_usuarios (nome, email, senha) values
('Bruce Wayne', 'bruce@gotham.com', '$2b$10$M5d0Z1sSz9oS4xX6xY8zOu3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8'),
('Peter Parker', 'peter@dailybugle.com', '$2b$10$N6e1A2tTz0pT5yY7xY9zOu4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9');

-- 3. Inserts para tbl_tipo_produto
insert into tbl_tipo_produto (tipo) values
('Hambúrguer'),
('Acompanhamento'),
('Bebida'),
('Sobremesa');

-- 4. Inserts para tbl_produto (Catálogo Geral de Itens Individuais)
insert into tbl_produto (nome, preco, url_imagem, descricao, disponibilidade, desconto, data_inicio_campanha, data_fim_campanha, classificacao_alimentar, id_tipo_produto) values
('Thunder Burguer', 34.90, 'https://images.honker.com/thunder.png', 'O martelo de sabor que sua fome temia! Blend bovino, cheddar derretido e barbecue artesanal.', 1, null, null, null, 'Tradicional', 1),
('Coringa Supremo', 36.50, 'https://images.honker.com/coringa.png', 'Sabor caótico e imprevisível. Blend bovino, bacon, cebola caramelizada e maionese verde.', 1, null, null, null, 'Tradicional', 1),
('Green Vigilante', 32.00, 'https://images.honker.com/green.png', 'Blend vegetal do futuro, alface romana, tomate fresco e molho especial vegano.', 1, null, null, null, 'Vegano', 1),
('Batata Estelar', 14.00, 'https://images.honker.com/batata.png', 'Batatas fritas rústicas salpicadas com páprica defumada do espaço.', 1, null, null, null, 'Vegano', 2),
('Anéis de Kryptonita', 16.00, 'https://images.honker.com/aneis.png', 'Anéis de cebola dourados e ultra crocantes.', 1, null, null, null, 'Vegetariano', 2),
('Soda Cyberpunk', 8.00, 'https://images.honker.com/soda.png', 'Refrigerante artesanal sabor blueberry com infusão de gás neon.', 1, null, null, null, 'Vegano', 3),
('Suco Mutante', 9.00, 'https://images.honker.com/suco.png', 'Suco natural de laranja, morango e ingrediente secreto.', 1, null, null, null, 'Vegano', 3);

-- 5. Inserts para tbl_tipos_sabor
insert into tbl_tipos_sabor (blend, nome) values
(180, 'Bovino Artesanal'),
(150, 'Frango Empanado'),
(160, 'Futuro Blend Vegetal');

-- 6. Inserts para tbl_categoria (Filtros Temáticos e Comerciais - RF04)
insert into tbl_categoria (nome, descricao) values
('Heróis', 'Produtos inspirados nos maiores defensores do universo.'),
('Vilões', 'Sabores intensos e caóticos do lado sombrio.'),
('Lançamentos', 'Novidades quentíssimas direto do laboratório Honker.');

-- 7. Inserts para tbl_ingredientes (RF02)
insert into tbl_ingredientes (nome, descricao, status_ingredientes, url_imagem) values
('Cheddar Cremoso', 'Queijo cheddar derretido maçaricado.', 1, 'https://images.honker.com/cheddar.png'),
('Bacon Defumado', 'Bacon crocante em lenha de macieira.', 1, 'https://images.honker.com/bacon.png'),
('Pão Roxo', 'Pão brioche artesanal com infusão de batata roxa.', 1, 'https://images.honker.com/pao_roxo.png'),
('Molho Especial Vegano', 'Maionese à base de leite de soja e ervas.', 1, 'https://images.honker.com/molho_vegano.png');

-- 8. Inserts para tbl_produto_ingredientes
insert into tbl_produto_ingredientes (id_produto, id_ingrediente) values
(1, 1), -- Thunder Burguer leva Cheddar Cremoso
(2, 2), -- Coringa Supremo leva Bacon Defumado
(2, 3), -- Coringa Supremo leva Pão Roxo
(3, 4); -- Green Vigilante leva Molho Especial Vegano

-- 9. Inserts para tbl_combo (Vitrine de Combos - RN03, RN04)
insert into tbl_combo (nome, descricao, status_combo, url_imagem) values
('Combo Individual Liga', 'Para um herói solitário: 1 Thunder Burguer, 1 Batata Estelar e 1 Soda Cyberpunk.', 1, 'https://images.honker.com/combo_liga.png'),
('Combo Duplo Dinâmico', 'Para a dupla dinâmica: 2 Coringa Supremo, 1 Batata Estelar e 2 Sodas Cyberpunk!', 1, 'https://images.honker.com/combo_duplo.png');

-- 10. Inserts para tbl_combo_produto (Definição exata das quantidades de cada item no combo)
insert into tbl_combo_produto (id_combo, id_produto, quantidade) values
-- Itens do Combo 1 (Individual): Usa o padrão de 1 unidade
(1, 1, 1), -- 1 Thunder Burguer
(1, 4, 1), -- 1 Batata Estelar
(1, 6, 1), -- 1 Soda Cyberpunk

-- Itens do Combo 2 (Duplo): Exatamente o cenário com múltiplos lanches e refris!
(2, 2, 2), -- 2 Hambúrgueres Coringa Supremo
(2, 4, 1), -- 1 Batata Estelar compartilhada
(2, 6, 2); -- 2 Refrigerantes Soda Cyberpunk

-- 11. Inserts para tbl_produto_categoria
insert into tbl_produto_categoria (id_produto, id_categoria) values
(1, 1), -- Thunder Burguer na categoria Heróis
(2, 2), -- Coringa Supremo na categoria Vilões
(3, 1), -- Green Vigilante na categoria Heróis
(1, 3); -- Thunder Burguer também listado em Lançamentos

-- 12. Inserts para tbl_produto_administrador (Log de Auditoria)
insert into tbl_produto_administrador (id_produto, id_administrador, data_atualizar) values
(1, 1, '2026-06-10 12:00:00'),
(2, 1, '2026-06-10 12:05:00'),
(3, 2, '2026-06-10 12:10:00');

-- 13. Inserts para tbl_tipos_sabor_produto
insert into tbl_tipos_sabor_produto (id_tipos_sabor, id_produto) values
(1, 1), -- Thunder Burguer tem sabor Bovino Artesanal
(1, 2), -- Coringa Supremo tem sabor Bovino Artesanal
(3, 3); -- Green Vigilante tem sabor Futuro Blend Vegetal

-- 14. Inserts para tbl_horario_funcionamento (Tabela isolada global - RF09, RF21)
insert into tbl_horario_funcionamento (dia_semana, horario_abertura, horario_fechamento) values
('Segunda', '18:00:00', '23:00:00'),
('Terça', '18:00:00', '23:00:00'),
('Quarta', '18:00:00', '23:00:00'),
('Quinta', '18:00:00', '23:30:00'),
('Sexta', '18:00:00', '01:00:00'),
('Sábado', '17:00:00', '02:00:00'),
('Domingo', '17:00:00', '23:30:00');