import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("vendas_funcionario").del();
    await knex("vendas").del();
    await knex("carros").del();
    await knex("funcionarios").del();
    // Inserts seed entries
    await knex("carros").insert([
        {
            placa: 'DAG-9549',
            marca: 'Daewoo',
            modelo: 'Lanos SX 1.6 16V',
            cor: 'Prata',
            ano_fabric: '1997',
            chassi: '73113******',
            ativo: false
        },
        {
            placa: 'LWF-2832',
            marca: 'RELY',
            modelo: 'PICK-UP Q22E CD 1.0 4p',
            cor: 'Preto',
            ano_fabric: '2014',
            chassi: '43784******'
        },
        {
            placa: 'MNZ-7211',
            marca: 'MG',
            modelo: '550 1.8 16V Turbo 170cv Aut.',
            cor: 'Laranja',
            ano_fabric: '2010',
            chassi: '18923******'
        },
        {
            placa: 'NEX-9531',
            marca: 'Mitsubishi',
            modelo: 'Lancer 2.0 16V 160cv Aut.',
            cor: 'Verde',
            ano_fabric: '2011',
            chassi: '25458******'
        },
        {
            placa: 'IAO-0563',
            marca: 'LAMBORGHINI',
            modelo: 'Gallardo Spyder Performante LP570-4',
            cor: 'Preto',
            ano_fabric: '2012',
            chassi: '39103******'
        }
    ]);

    const first = await knex.queryBuilder()
        .select("id")
        .from("carros").where("placa", "like", "DAG-9549");

    await knex("vendas").insert([
        {
            valor: 35450,
            comissao: 100,
            data_venda: '2019-10-3',
            idCarro: first[0].id
        }
    ]);

    await knex("funcionarios").insert([
        {
            nome: 'Carlos Alberto'
        },
        {
            nome: 'Rafael Vianna'
        }
    ]);

    const firstFuncId = 1
    const firstVendaId = await knex.queryBuilder()
        .select('idVenda').from("vendas")

    await knex("vendas_funcionario").insert([
        {
            idVenda: firstVendaId[0].idVenda,
            idFuncionario: firstFuncId
        }
    ]);


    await knex("compras").insert([
        {
		valor_compra: 45639,
		idCarro: 1,
        },

        {
		valor_compra: 89300,
		idCarro: 2,
        },

        {
		valor_compra: 15239,
		idCarro: 3,
        },

        {
		valor_compra: 100699,
		idCarro: 4,
        },

        {
		valor_compra: 5199,
		idCarro: 5,
        }
    ]);


}
