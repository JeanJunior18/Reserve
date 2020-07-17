import Knex from 'knex';
const kneConf = require('../../knexfile');

let knex = Knex(kneConf.development);

if(process.env.NODE_ENV === 'production'){
  console.log('Database in production mode')
  knex = Knex(kneConf.production);
}else{
  console.log('Database in development mode')
}

export default knex;