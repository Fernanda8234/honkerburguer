module.exports = {
    development: {
      // ALTERAÇÃO: Define o cliente como 'mysql2'
      client: 'mysql2',
      connection: {
        host:     process.env.DB_HOST, // aonde está instalado o mysql
        user:     process.env.DB_USER, // Substitua pelo seu usuário
        password: process.env.DB_PASSWORD, // Substitua pela sua senha
        database: process.env.DB_NAME, // Substitua pelo nome do seu banco de dados
        port:     process.env.DB_PORT || 3306, // Porta padrão do MySQL
       
        // Opcional: Define charset (recomendado para UTF8)
        charset: 'utf8mb4'
      },
     
      // Configurações de Migração
      migrations: {
        tableName: 'knex_migrations', // Nome da tabela de migrações
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/seeds'
      }
    },
   
    // Você pode adicionar configurações para produção, testes, etc.
  };
