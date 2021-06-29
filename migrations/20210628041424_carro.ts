import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
	const db = knex.schema;
	await db.createTable('carros', (table: Knex.TableBuilder) => {
		table.increments('id').primary()
		table.string('placa')
		table.string('marca')
		table.string('modelo')
		table.string('cor')
		table.string('chassi')
		table.string('ano_fabric')
		table.boolean('ativo').defaultTo(true)
	});

	await knex.schema.createTable('vendas', (table: Knex.TableBuilder) => {
		table.increments('idVenda').primary()
		table.float('valor')
		table.float('comissao')
		table.dateTime('data_venda')
		table.integer('idCarro')
        .unsigned()
        .references('id')
        .inTable('carros')
	});
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema
		.dropTableIfExists('vendas')
	await knex.schema
		.dropTableIfExists('carro');
}

