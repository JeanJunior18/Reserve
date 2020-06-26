import Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('admin', function (table){
    table.increments('id');
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true)
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('admin');
}