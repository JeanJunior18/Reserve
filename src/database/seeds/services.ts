import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("services").del()
        .then(() => {
            // Inserts seed entries
            return knex("services").insert([
                { id: 1, service_name: "Corte Cabelo", price: 10 },
                { id: 2, service_name: "Barba", price: 5 },
                { id: 4, service_name: "Sobrancelha", price: 2 },
            ]);
        });
};
