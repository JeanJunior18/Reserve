import Knex from 'knex';
const kneConf = require('../../knexfile');

const knex = Knex(kneConf.development);

export default knex;