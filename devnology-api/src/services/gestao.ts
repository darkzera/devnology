// This is a way to managment our system when dealing with business logic
import { CarroInterface } from "@src/util/intefaces/geral";
import Carro from "@src/model/carro";
import { Model, val } from "objection";
import Dinero from "dinero.js";

export class GestaoService {

	public static calcValorVenda(valorCompra: Dinero.Dinero): Dinero.Dinero{
		// Ok it possible looks weirdo but here some tips do understand this sh.
		// method calls are executed sequentially, mathematical operator precedence doesn't apply. 
		// so we are doing something like this: valorCompra += (valorCompra * 0.10)
		return valorCompra.multiply(0.10).add(
			Dinero({amount: valorCompra.getAmount()})
		)
	}
	public static calcValorComissao(valorVenda: Dinero.Dinero): Dinero.Dinero{
		return valorVenda.percentage(4);
	}

}
