// Update with your config settings.
const db_config = require('./data/db_config.json');
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      charset : 'utf8',
      host : db_config.host,
      user : db_config.user,
      password : db_config.password,
      database : db_config.database,
      port : db_config.port
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host : db_config.host,
      user : db_config.user,
      password : db_config.password,
      database : db_config.database,
      port : db_config.port
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
