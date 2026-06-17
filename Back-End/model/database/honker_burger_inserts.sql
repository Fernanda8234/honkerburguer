-- 1. Inserts para tbl_administrador
insert into tbl_administrador (nome,
                               email,
                               senha,
                               criacao_conta,
                               data_nascimento,
                               telefone,
                               codigo_acesso
                               )values
                               ('Steve Rogers',
                                'capitao@honker.com',
                                '$2b$10$K3b8X9pQz7mR2vW4xY6zOu1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6',
                                '2026-06-10 10:00:00',
                                '1980-07-04',
                                '(11) 98888-8888',
                                111111),
                               ('Diana Prince',
                                'diana@honker.com',
                                '$2b$10$L4c9Y0qRz8nS3wW5xY7zOu2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7',
                                '2026-06-10 11:30:00',
                                '1984-11-10',
                                '(11) 97777-7777',
                                222222),
                               ('Bruce Wayne',
                                'bruce@honker.com',
                                '$2b$10$M5d0Z1sSz9oS4xX6xY8zOu3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8',
                                '2026-06-10 12:00:00',
                                '1975-02-19',
                                '(11) 96666-6666',
                                333333),
                               ('Clark Kent',
                                'clark@honker.com',
                                '$2b$10$N6e1A2tTz0pT5yY7xY9zOu4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9',
                                '2026-06-10 13:00:00',
                                '1985-06-21',
                                '(11) 95555-5555',
                                444444),
                               ('Barry Allen',
                                'flash@honker.com',
                                '$2b$10$O7f2B3uUz1qU6zZ8xZ0aPv5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0',
                                '2026-06-10 14:00:00',
                                '1992-09-30',
                                '(11) 94444-4444',
                                555555);

-- 2. Inserts para tbl_produto
insert into tbl_produto (nome,
                         preco,
                         url_imagem,
                         descricao,
                         disponibilidade,
                         classificacao_alimentar
                         )values
                         ('Thunder Burguer',
                          34.90,
                          'img1.png',
                          'Blend bovino e cheddar.',
                          1,
                          'Tradicional'),
                         ('Coringa Supremo',
                          36.50,
                          'img2.png',
                          'Bacon e cebola.',
                          1,
                          'Tradicional'),
                         ('Green Vigilante',
                          32.00,
                          'img3.png',
                          'Veggie burger.',
                          1,
                          'Vegano'),
                         ('Batata Estelar',
                          14.00,
                          'img4.png',
                          'Batata frita.',
                          1,
                          'Vegano'),
                         ('Soda Cyberpunk',
                          8.00,
                          'img5.png',
                          'Soda artesanal.',
                          1,
                          'Vegano');

-- 3. Inserts para tbl_tipo_sabor
insert into tbl_tipo_sabor (blend,
                            nome
                            )values
                            (180,
                             'Bovino Artesanal'),
                            (150,
                             'Frango Empanado'),
                            (160,
                             'Futuro Blend'),
                            (200,
                             'Bovino Angus'),
                            (170,
                             'Suíno Defumado');

-- 4. Inserts para tbl_categoria
insert into tbl_categoria (nome,
                           descricao
                           )values
                           ('Heróis',
                            'Lanches épicos.'),
                           ('Vilões',
                            'Sabores intensos.'),
                           ('Lançamentos',
                            'Novidades.'),
                           ('Vegano',
                            'Sem origem animal.'),
                           ('Sobremesas',
                            'Doces.');

-- 5. Inserts para tbl_combo
insert into tbl_combo (nome
                       )values
                       ('Combo Liga'),
                       ('Combo Dinâmico'),
                       ('Combo Vegano'),
                       ('Combo Sobremesa'),
                       ('Combo Família');

-- 7. Inserts para tbl_produto_combo
insert into tbl_produto_combo (id_produto,
                               id_combo
                               )values
                               (8,
                                1),
                               (7,
                                2),
                               (6,
                                3),
                               (4,
                                4),
                               (5,
                                5);

-- 8. Inserts para tbl_produto_categoria
insert into tbl_produto_categoria (id_produto,
                                   id_categoria
                                   )values
                                   (8,
                                    1),
                                   (7,
                                    2),
                                   (6,
                                    4),
                                   (4,
                                    1),
                                   (5,
                                    5);

-- 9. Inserts para tbl_tipo_sabor_produto
insert into tbl_tipo_sabor_produto (id_tipo_sabor,
                                    id_produto
                                    )values
                                    (1,
                                     8),
                                    (1,
                                     7),
                                    (3,
                                     6),
                                    (2,
                                     4),
                                    (4,
                                     5);
