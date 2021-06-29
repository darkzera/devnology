import { CarroInterface } from "@src/util/intefaces/geral";
import Carro from "@src/model/carro";


describe('Carro functional tests CREATE method. Perform rout: .../carro/create', () => {
	beforeAll(async () => {
		await Carro.query().delete().where('placa', 'like', '7ES73PL4C4');
	});
	const newCar: CarroInterface = {
		placa: '7ES73PL4C4',
		modelo: 'Fiat Toro',
		marca: 'FIAT',
		cor: 'Prata',
		chassi: '232918******',
		ano_fabric: '2018'
	}

	it('Should sucessfull create a car - #1', async () => {
		const { status, body } =
			await global.testRequest.post('/carro/create').send(newCar);
		expect(status).toBe(200);
		expect(body).toEqual({
			result: 'Carro adicionado'
		});
	});

	it('Should fail cuz already exist this car - #2', async () => {
		const { status, body } =
			await global.testRequest.post('/carro/create').send(newCar);
			expect(status).toBe(409);
			expect(body).toEqual(
				'Registro nao autorizado.\nUm carro com a mesma placa está ativo no sistema'
			);
	});

	it.skip('Should throw an error caused by an wrong field input', async () => {
		// 
	});

}); // EOM CREATE


describe.skip('Carro functional tests DELETE method. Perform rout: .../carro/create', () => {
	// 
});// EOM DELETE