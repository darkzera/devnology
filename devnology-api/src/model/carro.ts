import { Model } from "objection";
import Venda from "./venda";
import Compra from "./compra";

export default class Carro extends Model {
	id!: number
	modelo!: string
	marca!: string
	ano_fabric!: string
	placa!: string
	cor!: string
	chassi!: string
	ativo!: boolean

	v!: Compra



	static tableName = 'carros';

	static relationMappings = () => ({
		venda: {
			modelClass: Venda,
			relation: Model.HasOneRelation,
			join: {
				from: 'carros.id',
				to: 'vendas.carroId'
			}
		}


	})



}