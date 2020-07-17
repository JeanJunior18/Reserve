require('dotenv/config');
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
  production: {
    client: 'pg',
    connection: process.env.DATABASE_CONNECT_URL,
    // {
    //   host: process.env.DATABASE_CONNECT_HOST,
    //   user: process.env.DATABASE_CONNECT_USER,
    //   password: process.env.DATABASE_CONNECT_PASS,
    //   // port: 3306,
    //   database: process.env.DATABASE_CONNECT_DATABASE,
    // },
    // acquireConnectionTimeout: 30000,
    migrations: {
      directory: resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: resolve(__dirname, 'src', 'database', 'seeds')
    },
  }
};
