import Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('admin', function (table){
    table.increments('id');
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('whatsapp').notNullable();
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('admin');
}
