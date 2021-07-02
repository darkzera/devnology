import { Model } from "objection";
import Venda from "./venda";
import Funcionario from "./funcionario";


export default class Venda_Funcionario extends Model {
	id!: number
	idFuncionario!: number
	idVenda!: number

	static tableName = 'vendas_funcionario'

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static relationMappings = () => ({
		vendas: {
			modelClass: Venda,
			relation: Model.HasOneRelation,
			join: {
				from: 'vendas_funcionario.idVenda',
				to: 'vendas.idVenda'
			}
		},

		funcionarios: {
			modelClass: Funcionario,
			relation: Model.HasOneRelation,
			join: {
				from: 'vendas_funcionario.idFuncionario',
				to: 'funcionarios.id'
			}
		}

	})



}