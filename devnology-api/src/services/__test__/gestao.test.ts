import { GestaoService } from "../gestao"
import Dinero from "dinero.js";

describe('Functional testing for gestao mod', () => { 
	it('money dealing', async () => {
		const value = GestaoService.calcValorVenda(
			Dinero({amount: 100000})
		).getAmount();

		expect(value).toBe(110000)
		


	})

});