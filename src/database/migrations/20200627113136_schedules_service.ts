import * as Knex from "knex";
import ScheduleController from "../../controllers/ScheduleController";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('schedules_service', function(table){
    table.integer('schedule_id')
      .notNullable()
      .references('id')
      .inTable('schedules')
    table.integer('service_id')
      .notNullable()
      .references('id')
      .inTable('services')
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('schedules_service')
}

