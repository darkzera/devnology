import { Model } from "objection";
import Carro from "./carro";
import Funcionario from "./funcionario";
import Venda_Funcionario from "./venda_funcionario";

export default class Venda extends Model {
	[x: string]: any;
	idVenda!: number
	valor!: number
	comissao!: number
	data_venda!: Date
	idCarro!: Carro
	funcionario!: Funcionario

	vendedor!: Funcionario

	static tableName = 'vendas'

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static relationMappings = () => ({
		carroId: {
			modelClass: Carro,
			relation: Model.HasOneRelation,
			join: {
				from: 'venda.idCarro',
				to: 'carros.id'
			}
		},
		vendedor: {
			relation: Model.ManyToManyRelation,
			modelClass: Funcionario,
			join: {
				from: 'vendas.idVenda',
				// ManyToMany relation needs the `through` object to describe the join table.
				through: {
					from: 'vendas_funcionario.idVenda',
					to: 'vendas_funcionario.idFuncionario',
				},
				to: 'funcionarios.id',
			},
		},

		vendas_funcionario: {
			relation: Model.BelongsToOneRelation,
			modelClass: Venda_Funcionario,
			join: {
				from: 'vendas.idVenda',
				to: 'vendas_funcionario.id'
			},
		}
	
	});
}
