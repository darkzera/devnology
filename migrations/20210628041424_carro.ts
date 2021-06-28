import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
	const db = knex.schema;
	await db.createTable('carro', (table: Knex.TableBuilder) => {
		table.string('placa').primary()
		table.string('modelo')
		table.string('marca')
		table.string('cor')
		table.string('chassi')
		table.string('ano_fabric')
		table.dateTime('data_compra')
		table.float('valorCompra')
	});

}


export async function down(knex: Knex): Promise<void> {
	await knex.schema
		.dropTableIfExists('carro');
}

