import { Model } from "objection";
import Venda from "./venda";

export default class Carro extends Model {
	id!: number
	modelo!: string
	marca!: string
	ano_fabric!: string
	placa!: string
	cor!: string
	chassi!: string
	ativo!: boolean

	// venda!: Venda


	static tableName = 'carros';

	static relationMappings = () => ({
		// venda: {
		// 	modelClass: Venda,
		// 	relation: Model.HasOneRelation,
		// 	join: {
		// 		from: 'carros.id',
		// 		to: 'vendas.carroId'
		// 	}
		// }

	})



}