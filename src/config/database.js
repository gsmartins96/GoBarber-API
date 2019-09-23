module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  // password: 'docker',
  database: 'gobarber',
  define: {
    // criar o created-at
    timestamps: true,
    // padrão de tabelas e colunas atraves do underscored
    // por exemplo: Ao inves de UserGroup, cria a tabela user_groups
    underscored: true,
    underscoredAll: true,
  },
};
