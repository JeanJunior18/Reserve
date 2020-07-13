import Knex from 'knex';
const kneConf = require('../../knexfile');

let knex = Knex(kneConf.development);

if(process.env.NODE_ENV === 'production'){
  console.log('Production Mode')
  knex = Knex(kneConf.production);
}

export default knex;