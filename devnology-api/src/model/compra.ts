import { Model } from "objection";
import Carro from "./carro";

export default class Compra extends Model {
	id!: number
	valor_compra!: number
	idCarro!: number


	static tableName = 'compras';


	$getValor(){
		return this.valor_compra;
	}

	static relationMappings = () => ({

		carros: {
			relation: Model.HasManyRelation,
			modelClass: Carro,
			join: {
				from: 'compras.idCarro',
				to: 'carros.id'
			}
		}

	});


}
