import { CarroInterface } from "@src/util/intefaces/geral";
import Compra from "@src/model/compra";
import Carro from "@src/model/carro";

describe('Vehicle acquisition test func. scope -- CR', () => {
	beforeAll(async () => {
		// TODO implement --> on cascade migrations:?
		// 1) delete vendas_func relation
		// Venda_Funcionario.query().delete().where('idFuncionario', '=', '????')

		// 2) delete sales [ vendas ] table 
		await Compra.query().delete().where('valor_compra', '=', 120345);

		await Carro.query().delete().where('placa', 'like', '7ES73PL4C4')

		// 3) swap state of boolean inside CARROS (ativo) to true -> 
		// We removed entire trail of this SALE. So we must set this car to available again
	});

	it('should sucessfull insert an purchase -- #1', async () => {
		const compra = 12034500; // -> FIX ME

		const newCar: CarroInterface = {
			placa: '7ES73PL4C4',
			modelo: 'Fiat Toro',
			marca: 'FIAT',
			cor: 'Prata',
			chassi: '232918******',
			ano_fabric: '2018'
		}
		const { status, body } =
			await global.testRequest.post('/compra/').send([compra.toLocaleString(), newCar]);
		console.log(body);
		expect(status).toBe(200);
	});

	it.skip('should fail insert cuz already exist this car -- #2', async () => {
		const compra = 120345;
		const newCar: CarroInterface = {
			placa: '7ES73PL4C4',
			modelo: 'Fiat Toro',
			marca: 'FIAT',
			cor: 'Prata',
			chassi: '232918******',
			ano_fabric: '2018'
		}
		const { status, body } =
			await global.testRequest.post('/compra/').send([compra.toLocaleString(), newCar]);
		expect(status).toBe(409);
		expect(body).toEqual({
			error: 'Ja tem um carro com essa placa marcado como ativo.'
		});
	});



});