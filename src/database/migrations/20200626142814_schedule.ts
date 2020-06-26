import Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('schedules', function (table){
    table.increments('id');
    table.date('hour').notNullable();
    table.string('name');
    table.string('whatsapp');
    table.boolean('busy');
    table.timestamps(true, true);
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('schedules')
}

