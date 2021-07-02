import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
	const db = knex.schema;
	await db.createTable('compra', (table: Knex.TableBuilder) => {
		// TODO
		table.increments('id').primary()
	});
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema
		.dropSchemaIfExists('compra')
}

