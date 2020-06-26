import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("admin").del()
        .then(() => {
            // Inserts seed entries
            return knex("admin").insert([
                { id: 1, name: "admin", email: 'super@user.com', password: 'root' },
            ]);
        });
};
