import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
	const db = knex.schema;
	await db.createTable('vendas', (table: Knex.TableBuilder) => {
		table.increments('idVenda').primary()
		table.float('valor')
		table.float('comissao')
		table.dateTime('data_venda')
		table.integer('carroId')
			.references('id')
			.inTable('carro')
	});
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema
		.dropTableIfExists('vendas');
}

