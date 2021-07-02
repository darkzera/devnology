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
		table.decimal('valor', 15,2)
		table.decimal('comissao', 15,2)
		table.dateTime('data_venda').defaultTo(knex.fn.now());

		table.integer('idCarro')
			.unsigned()
			.references('id')
			.inTable('carros')
			.index()
	});

	await knex.schema.createTable('funcionarios', (table: Knex.TableBuilder) => {
		table.increments('id').primary()
		table.string('nome')
	});

	await knex.schema.createTable('vendas_funcionario', (table: Knex.TableBuilder) => {
		table.increments('id').primary()

		table.integer('idVenda')
			.unsigned()
			.references('idVenda')
			.inTable('vendas')
			.index()
			.onDelete('CASCADE')

		table.integer('idFuncionario')
			.unsigned()
			.references('id')
			.inTable('funcionarios')
			.index()
			.onDelete('CASCADE')
	});

	await knex.schema.createTable('compras', (table: Knex.TableBuilder) => {
		table.increments('idCompra').primary()
		table.decimal('valor_compra', 15,2)

		table.integer('idCarro')
			.unsigned()
			.references('id')
			.inTable('carros')
			.index()
			.onDelete('CASCADE')

		table.date('data_compra').defaultTo(knex.fn.now());
	});


}

export async function down(knex: Knex): Promise<void> {
	await knex.schema
		.dropTableIfExists('compras');
	await knex.schema
		.dropTableIfExists('vendas_funcionario');
	await knex.schema
		.dropTableIfExists('vendas')
	await knex.schema
		.dropTableIfExists('carros');
	await knex.schema
		.dropTableIfExists('funcionarios');
}

