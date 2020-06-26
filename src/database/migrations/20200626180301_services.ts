import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('services', function(table){
    table.increments('id');
    table.string('service_name').notNullable().unique();
    table.integer('price');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('services');
}

