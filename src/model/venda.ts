import { Model } from "objection";
import Carro from "./carro";

export default class Venda extends Model {
	idVenda!: number
	valor!: number
	comissao!: number
	data_venda!: Date
	carroId!: Carro

	static tableName = 'vendas'

	static relationMappings = () => ({
		carroId: {
			modelClass: Carro,
			relation: Model.HasOneRelation,
			join: {
				from: 'venda.carroId',
				to: 'carro.id'
			}
		}
	});

}