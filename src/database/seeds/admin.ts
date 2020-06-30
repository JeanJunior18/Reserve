import * as Knex from "knex";
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("admin").del()
        .then(async () => {
            const hash = await bcrypt.hash('root', 5) 
            return knex("admin").insert([
                { id: 1, name: "admin", email: 'super@user.com', password: hash },
            ]);
        });
};
