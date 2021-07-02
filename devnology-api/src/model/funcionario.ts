import { Model } from "objection";
import Venda from "./venda";
import Venda_Funcionario from "./venda_funcionario";


export default class Funcionario extends Model {
	idFuncionario!: number
	nome!: string
	vendas!: Venda[]

	static tableName = 'funcionarios'

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static relationMappings = () => ({

		vendas: {
			relation: Model.ManyToManyRelation,
			modelClass: Venda,
			join: {
				from: 'funcionarios.id',
				// ManyToMany relation needs the `through` object to describe the join table.
				through: {
					from: 'vendas_funcionario.idFuncionario',
					to: 'vendas_funcionario.idVenda',
				},
				to: 'vendas.idVenda',
			},
		},
		vendas_funcionario: {
			modelClass: Venda_Funcionario,
			relation: Model.HasManyRelation,
			join: {
				from: 'funcionarios.id',
				to: 'funcionarios.id'
			}
		}








	});


}