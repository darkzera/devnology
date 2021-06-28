import { CarroInterface } from "@src/util/intefaces/geral";
describe('Carro functional testing #1. Perform rout: .../carro/create', () => {
	const newCar: CarroInterface = {
		placa: 'AFD2234',
		modelo: 'Fiat Toro',
		marca: 'FIAT',
		cor: 'Vermelho',
		chassi: '232918******',
		ano_fabric: '2018',
		data_compra: '10-20-2018',
		valorCompra: 55.392
	}

	it('Should sucessfull create a car - #1', async () => {
		const { status, body } =
			await global.testRequest.post('/carro/create').send(newCar);
		expect(status).toBe(200);
		expect(body).toEqual(
			'Carro adicionado'
		);
	});

	it.skip('Should fail cuz already exist this car', async () => {
		console.log('a');
	});

});