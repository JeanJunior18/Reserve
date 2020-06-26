import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("schedules").del()
        .then(() => {
            // Inserts seed entries
            return knex("schedules").insert([
                { id: 1, hour: "December 12, 2020 08:00:00" },
                { id: 2, hour: "December 12, 2020 09:00:00" },
                { id: 3, hour: "December 12, 2020 10:00:00" },
                { 
                    id: 4, 
                    hour: "December 12, 2020 11:00:00",
                    name: "Jean Junior",
                    whatsapp: "00000000"
                },
            ]);
        });
};
