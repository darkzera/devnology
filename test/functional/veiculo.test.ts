import { CarroInterface } from "@src/util/intefaces/geral";
import Carro from "@src/model/carro";
// TODO change all CARROS TO veiculo

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

	it('Should throw an error caused by an wrong field input', async () => {
		const a = 1;
	});

}); // EOM CREATE


describe('Vehicle functional tests (GET) method. Perform rout: /carro/...', () => {

	it('should return a list AVAILABLE vehicles 	(ativo = true | 1) - #3 ', async () => {
		const { status, body } =
		await global.testRequest.get('/carro/veiculosDisponiveis')
		expect(status).toBe(200);
		
	});

	it('should return a list NOT AVAILABLE vehicles (ativo = false | 0) - #4 ', async () => {
		const { status, body } =
		await global.testRequest.get('/carro/veiculosIndisponiveis')
		expect(status).toBe(200);
		
	});

});// EOM LISTING 