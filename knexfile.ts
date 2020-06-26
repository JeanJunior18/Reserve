import { resolve } from 'path'

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory: resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
  },
};
